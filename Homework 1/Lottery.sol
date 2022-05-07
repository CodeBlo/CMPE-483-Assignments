pragma solidity ^0.8.0;

import "./TLToken.sol";
import "./TicketNFT.sol";
import "./ILottery.sol";

contract Lottery is ILottery {

    struct Ticket {
        address owner;
        uint ticket_no;
        uint status;
    }

    uint price = 10;
    mapping(address => uint256) balances;
    mapping(uint => uint) totalMoneyInLotteries;
    mapping(uint => mapping(address => uint[])) ownedTickets; //LotteryNo => Owner => Ticket No[]
    mapping(uint => uint[]) lotteryTickets;

    uint _initialTimeInWeeks;
    TLToken _tokenContract;
    TicketNFT _ticketContract;

    constructor(address tokenAddress, address nftAddress) {
        _tokenContract = TLToken(tokenAddress);
        _ticketContract = TicketNFT(nftAddress);
        _initialTimeInWeeks = convertSecondsToWeek(block.timestamp);
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
        balances[msg.sender] -= price;
        _tokenContract.decreaseAllowance(msg.sender, price);
        uint lottery_no = getLotteryNo(block.timestamp);
        _ticketContract.mint(msg.sender, uint256(hash_rnd_number));
        ownedTickets[lottery_no][msg.sender].push(uint(hash_rnd_number));
        lotteryTickets[lottery_no].push(uint(hash_rnd_number));
    }

    function collectTicketRefund(uint ticket_no) public {

    }

    function revealRndNumber(uint ticketno, uint rnd_number) public {
        require(ticketno == uint(sha3(abi.encode(rnd_number, msg.sender))), "Reveal");
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public view returns(uint,uint8 status) {
        uint len = ownedTickets[lottery_no][msg.sender].length;
        return (ownedTickets[lottery_no][msg.sender][len-1], 0);
    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public view returns(uint,uint8 status) {
        return (ownedTickets[lottery_no][msg.sender][i], 0);
    }

    function checkIfTicketWon(uint ticket_no) public view returns (uint amount) {
        uint lottery_no = getLotteryNo(block.timestamp);
        for(uint i = 0; i < winningTickets[lottery_no].length; i++){
            if(winningTickets[lottery_no][i].ticket_no == ticket_no){
                return winningTickets[lottery_no][i].amount;
            }
        }
        return 0;
    }

    function collectTicketPrize(uint ticket_no) public {
        uint amount = checkIfTicketWon(ticket_no);
        _tokenContract.transferFrom(address(this), msg.sender, amount);
    }

    function getIthWinningTicket(uint i, uint lottery_no) public view returns (uint ticket_no,uint amount) {
        require(i<numberOfTotalWinner(lottery_no));
        uint xored = xorAll(lottery_no);
        bytes32 hashed = sha3(abi.encodePacked(xored));
        amount = findIthPrizeOfLottery(lottery_no, i);
        for(uint index = 1; index < i; i++){
            hashed = sha3(abi.encodePacked(hashed));
        }
        uint winningNo = uint256(hashed) % lotteryTickets[lottery_no].length;
        return (winningNo, amount);
    }

    function getLotteryNo(uint unixtimeinweek) public view returns (uint lottery_no) {
        return (_initialTimeInWeeks - unixtimeinweek)/7;
    }

    function getTotalLotteryMoneyCollected(uint lottery_no) public view returns (uint amount) {
        return totalMoneyInLotteries[lottery_no];
    }

    function convertSecondsToWeek(uint unixtimeinseconds) private view returns (uint unixtimeinweeks) {
        return unixtimeinseconds/60/60/24/7;
    }

    function xorAll(uint lottery_no) private view returns (uint xored){
        xored = 0;
        for(uint i = 0; i<lotteryTickets[lottery_no].length; i++) {
            xored ^= lotteryTickets[lottery_no][i];
        }
        return xored;
    }

    function findIthPrizeOfLottery(uint lottery_no, uint i) private view returns (uint){ 
        uint totalMoney = totalMoneyInLotteries[lottery_no];
        return ((totalMoney / 2**i) + (totalMoney / 2**(i-1))%2);
    }

    function numberOfTotalWinner(uint lottery_no) private view returns (uint) { 
        uint totalMoney = totalMoneyInLotteries[lottery_no];
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
}