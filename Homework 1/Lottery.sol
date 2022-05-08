// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
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

    uint price = 10 ** 19;

    mapping(address => uint256) balances;
    mapping(uint => mapping(address => uint[])) ownedTickets; //LotteryNo => Owner => Ticket No[]
    mapping(uint => uint[]) lotteryTickets;
    mapping(uint => uint[]) revealedTickets; //Is this necessary after holding every ticket in lottery tickets
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
    
    function depositTL(uint amnt) public override{
        bool is_transferred = _tokenContract.transferFrom(msg.sender, address(this), amnt);
        require(is_transferred, "Could not deposit from sender to this contract");
        _tokenContract.increaseAllowance(msg.sender, amnt);
        balances[msg.sender] += amnt;
    }
    
    function withdrawTL(uint amnt) public override {
        bool is_allowed = _tokenContract.decreaseAllowance(msg.sender, amnt);
        require(is_allowed, "Not allowed");
        _tokenContract.transfer(msg.sender, amnt);
        balances[msg.sender] -= amnt;
    }

    function buyTicket(bytes32 hash_rnd_number) public override {
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
    }

    function collectTicketRefund(uint ticket_no) public override {
        uint lottery_no = getLotteryNo(block.timestamp);
        require(ticketNoTickets[ticket_no].lottery_no < lottery_no, "Lottery is not finished");
        require(ticketNoTickets[ticket_no].status == Status.BOUGHT, "Can not refund ticket");
        require(msg.sender == ticketNoTickets[ticket_no].owner, "Can not refund ticket");
        address to = ticketNoTickets[ticket_no].owner;
        _tokenContract.transferFrom(address(this), to, price/2);
    }

    function revealRndNumber(uint ticketno, uint rnd_number) public override {
        require(ticketno == uint(sha256(abi.encode(rnd_number, msg.sender))), "Reveal");
        uint lottery_no = getLotteryNo(block.timestamp);
        Ticket memory ticket = ticketNoTickets[ticketno];
        ticket.status = Status.REVEALED;
        revealedTickets[lottery_no].push(ticketno);
        xorOfLotteries[lottery_no] ^= rnd_number;
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public override view returns(uint,uint8 status) {
        uint len = ownedTickets[lottery_no][msg.sender].length;
        uint ticket_no = ownedTickets[lottery_no][msg.sender][len-1];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public override view returns(uint,uint8 status) {
        require(i < ownedTickets[lottery_no][msg.sender].length, "Out of bounds");
        uint ticket_no = ownedTickets[lottery_no][msg.sender][i];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function checkIfTicketWon(uint ticket_no) public override view returns (uint amount) {
        
        uint lottery_no = getLotteryNo(block.timestamp);
        uint tickets_lottery_no = ticketNoTickets[ticket_no].lottery_no;
        require(tickets_lottery_no < lottery_no, "Lottery is not finished");
        require(numberOfTotalWinner(tickets_lottery_no)>0);

        uint totalRevealedTickets = revealedTickets[lottery_no].length;
        uint xoredHash = xorOfLotteries[lottery_no];    
        for(uint i = 0;  i < numberOfTotalWinner(lottery_no); i++){ 
            uint winning_ticket_index = xoredHash % totalRevealedTickets;
            uint winning_ticket_no = revealedTickets[lottery_no][winning_ticket_index];
            if(ticket_no == winning_ticket_no){
                amount += findIthPrizeOfLottery(lottery_no, i+1);
            }
            xoredHash = uint(sha256(abi.encodePacked(xoredHash)));
        }

        return amount;
    }

    function collectTicketPrize(uint ticket_no) public override {
        uint amount = checkIfTicketWon(ticket_no);
        require(amount > 0, "Did not win");
        _tokenContract.transferFrom(address(this), msg.sender, amount);
    }

    function getIthWinningTicket(uint i, uint lottery_no) public override view returns (uint ticket_no,uint amount) {
        require(lottery_no < getLotteryNo(block.timestamp), "");
        require(i<numberOfTotalWinner(lottery_no), "");
        require(i>0, "");
        uint totalRevealedTickets = revealedTickets[lottery_no].length;
        uint xoredHash = xorOfLotteries[lottery_no];    
        uint winning_ticket_no = 0;
        for(uint j = 0;  j < i; j++){ 
            uint winning_ticket_index = xoredHash % totalRevealedTickets;
            winning_ticket_no = revealedTickets[lottery_no][winning_ticket_index];
            xoredHash = uint(sha256(abi.encodePacked(xoredHash)));
        }
        amount = checkIfTicketWon(winning_ticket_no);
        return (winning_ticket_no, amount);
    }

    function getLotteryNo(uint unixtimeinweek) public override view returns (uint lottery_no) {
        return (unixtimeinweek - _initialTime)/(7 minutes);
    }

    function getTotalLotteryMoneyCollected(uint lottery_no) public override view returns (uint amount) {
        require(lottery_no < getLotteryNo(block.timestamp), "cum");
        uint revealedTicketCount = revealedTickets[lottery_no].length;
        uint totalTicketCount = lotteryTickets[lottery_no].length;
        return revealedTicketCount * price + (totalTicketCount - revealedTicketCount) * price/2;
    }

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
        return block.timestamp - (_initialTime + (getLotteryNo(block.timestamp) * (7 minutes))) <= 4 minutes;
    }

    // function get(uint lottery_no) private {      
    //     require(numberOfTotalWinner(lottery_no)>0);
    //     if(winningTickets[lottery_no].length == 0){
    //         uint totalRevealedTickets = revealedTickets[lottery_no].length;
    //         uint xoredHash = xorOfLotteries[lottery_no];    
    //         for(uint i = 0;  i < numberOfTotalWinner(lottery_no); i++){ 
    //             uint winning_ticket_index = xoredHash % totalRevealedTickets;
    //             uint winning_ticket_no = revealedTickets[lottery_no][winning_ticket_index];                 
    //             winningTickets[lottery_no].push(winning_ticket_no);
    //             Ticket memory winTicket = ticketNoTickets[winning_ticket_no];
    //             winTicket.status = Status.WON;
    //             winTicket.total_prize += findIthPrizeOfLottery(lottery_no, i+1);
    //             xoredHash = uint(sha256(abi.encodePacked(xoredHash)));
    //         }
    //     }
    // }
}