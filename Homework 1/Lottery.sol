pragma solidity ^0.8.0;

import "./TLToken.sol";
import "./TicketNFT.sol";
import "./ILottery.sol";

contract Lottery is ILottery {
    enum Status {
        BOUGHT, 
        REVEALED, 
        WON, 
        REFUNDED
    }

    struct Ticket {
        uint lottery_no;
        address owner;
        bytes32 random_hash;
        Status status;// 0 BOUGHT, 1 revelead, 2 won, 3 refunded
    }

    uint price = 10;

    mapping(address => uint256) balances;
    mapping(uint => uint) totalMoneyInLotteries;
    mapping(uint => mapping(address => uint[])) ownedTickets; //LotteryNo => Owner => Ticket No[]
    mapping(uint => uint[]) lotteryTickets;
    mapping(uint => uint[]) revealedTickets; //Is this necessary after holding every ticket in lottery tickets
    mapping(uint => uint[]) winningTickets; //Is this necessary after holding every ticket in lottery tickets
    mapping(uint => uint) xorOfLotteries; // LotteryNo => (Xor result of that lottery)
    mapping(uint => Ticket) ticketNoTickets; //Ticket no => ticket struct

    uint _initialTime;
    TLToken _tokenContract;
    TicketNFT _ticketContract;

    constructor(address tokenAddress, address nftAddress) {
        _tokenContract = TLToken(tokenAddress);
        _ticketContract = TicketNFT(nftAddress);
        _initialTime = block.timestamp;
    }
    
    function depositTL(uint amnt) public {
        bool is_transferred = _tokenContract.transferFrom(msg.sender, address(this), amnt);
        require(is_transferred, "Could not deposit from sender to this contract");
        _tokenContract.increaseAllowance(msg.sender, amnt);
        balances[msg.sender] += amnt;
    }
    
    function withdrawTL(uint amnt) public {
        bool is_allowed = _tokenContract.decreaseAllowance(msg.sender, amnt);
        require(is_allowed, "Not allowed");
        _tokenContract.transfer(msg.sender, amnt);
        balances[msg.sender] -= amnt;
    }

    function buyTicket(bytes32 hash_rnd_number) public {
        require(balances[msg.sender] >= price, "Insufficient funds");
        require(isInPurchase(), "Not in purchase");
        balances[msg.sender] -= price;
        _tokenContract.decreaseAllowance(msg.sender, price);
        uint lottery_no = getLotteryNo(block.timestamp);

        //TODO Is mint no correct? Use the current ticket no or smthng else + 
        uint256 ticket_no = _ticketContract.mint(msg.sender);
        ownedTickets[lottery_no][msg.sender].push(ticket_no);
        lotteryTickets[lottery_no].push(ticket_no);
        ticketNoTickets[ticket_no] = Ticket({owner: msg.sender, lottery_no: lottery_no, random_hash: hash_rnd_number, status: Status.BOUGHT});
        totalMoneyInLotteries[lottery_no] += price;
    }

    function collectTicketRefund(uint ticket_no) public {
        uint lottery_no = getLotteryNo(block.timestamp);
        require(ticketNoTickets[ticket_no].status == Status.BOUGHT, "Can not refund ticket");
        totalMoneyInLotteries[lottery_no] -= price/2;
    }

    function revealRndNumber(uint ticketno, uint rnd_number) public {
        require(ticketno == uint(sha256(abi.encode(rnd_number, msg.sender))), "Reveal");
        uint lottery_no = getLotteryNo(block.timestamp);
        Ticket memory ticket = ticketNoTickets[ticketno];
        ticket.status = Status.REVEALED;
        revealedTickets[lottery_no].push(ticketno);
        xorOfLotteries[lottery_no] ^= rnd_number;
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public view returns(uint,uint8 status) {
        uint len = ownedTickets[lottery_no][msg.sender].length;
        uint ticket_no = ownedTickets[lottery_no][msg.sender][len-1];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public view returns(uint,uint8 status) {
        require(i < ownedTickets[lottery_no][msg.sender].length, "Out of bounds");
        uint ticket_no = ownedTickets[lottery_no][msg.sender][i];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function checkIfTicketWon(uint ticket_no) public view returns (uint amount) {
        
        uint lottery_no = getLotteryNo(block.timestamp);
        require(ticketNoTickets[ticket_no].lottery_no < lottery_no, "Lottery is not finished");
        require(numberOfTotalWinner(lottery_no)>0);
        
        uint xored = xorOfLotteries[lottery_no];
        bytes32 hashed = sha256(abi.encodePacked(xored));

        for(uint i = 1;  i < numberOfTotalWinner(lottery_no); i++){
            hashed = sha256(abi.encodePacked(hashed));
            if(uint(hashed) == ticket_no){
                return findIthPrizeOfLottery(lottery_no, i+1);
            }
        }
        return 0;
    }

    function collectTicketPrize(uint ticket_no) public {
        require(!isInPurchase(), "In purchase");
        uint amount = checkIfTicketWon(ticket_no);
        require(amount > 0, "Did not win");
        _tokenContract.transferFrom(address(this), msg.sender, amount);
    }

    function getIthWinningTicket(uint i, uint lottery_no) public view returns (uint ticket_no,uint amount) {
        require(i<numberOfTotalWinner(lottery_no));
        uint xored = xorOfLotteries[lottery_no];
        bytes32 hashed = sha256(abi.encodePacked(xored));
        amount = findIthPrizeOfLottery(lottery_no, i);
        for(uint index = 1; index < i; i++){
            hashed = sha256(abi.encodePacked(hashed));
        }
        uint winningNo = uint256(hashed) % lotteryTickets[lottery_no].length;
        return (winningNo, amount);
    }

    function getLotteryNo(uint unixtimeinweek) public view returns (uint lottery_no) {
        return (unixtimeinweek - _initialTime)/(7 days);
    }

    function getTotalLotteryMoneyCollected(uint lottery_no) public view returns (uint amount) {
        return totalMoneyInLotteries[lottery_no];
    }

    function convertSecondsToWeek(uint unixtimeinseconds) private view returns (uint unixtimeinweeks) {
        return unixtimeinseconds/60/60/24/7;
    }

    /*
    function xorAll(uint lottery_no) private view returns (uint xored){
        xored = 0;
        for(uint i = 0; i<lotteryTickets[lottery_no].length; i++) {
            uint ticketNo = lotteryTickets[lottery_no][i];
            // xored ^= ;
        }
        return xored;
    }
    */
    

    function findIthPrizeOfLottery(uint lottery_no, uint i) private view returns (uint){ 
        uint totalMoney = getTotalLotteryMoneyCollected(lottery_no);
        return ((totalMoney / 2**i) + (totalMoney / 2**(i-1))%2);
    }

    function numberOfTotalWinner(uint lottery_no) private view returns (uint) { 
        uint totalMoney = getTotalLotteryMoneyCollected(lottery_no);
        return (logUpperBound(totalMoney)+1);
    }

    function logUpperBound(uint number) private pure returns (uint) {
        uint i = 0;
        uint result = 1;
        while (result < number) {
            result *= 2;
            i+=1;
        }
        return(i);
    }

    function isInPurchase() private view returns (bool) {
        return block.timestamp - (getLotteryNo(block.timestamp) * 7 days) <= 4 days;
    }

    function fillWinningTickets(uint lottery_no) private {
        
        require(numberOfTotalWinner(lottery_no)>0);
        if(winningTickets[lottery_no].length == 0){

            uint xored = xorOfLotteries[lottery_no];    
            bytes32 hashed = sha256(abi.encodePacked(xored));
            winningTickets[lottery_no].push(uint(hashed));
            for(uint i = 1;  i < numberOfTotalWinner(lottery_no); i++){
                hashed = sha256(abi.encodePacked(hashed));
                winningTickets[lottery_no].push(uint(hashed));
            }
        }
        
    }
}