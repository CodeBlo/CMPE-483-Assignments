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
        uint lottery_no; // lottery no of ticket is bought
        address owner; // address of the owner
        bytes32 random_hash; // hash number provided by the owner
        Status status;// 0 BOUGHT, 1 revelead, 2 won, 3 refunded
    }

    uint price = 10; // ticket price

    mapping(address => uint256) public balances;
    mapping(uint => mapping(address => uint[])) public  ownedTickets; //LotteryNo => Owner => Ticket No[]
    mapping(uint => uint[]) public lotteryTickets; // This holds tickets for all the lotteries
    mapping(uint => uint[]) public  revealedTickets; //Is this necessary after holding every ticket in lottery tickets
    mapping(uint => uint) public  xorOfLotteries; // LotteryNo => (Xor result of that lottery)
    mapping(uint => Ticket) public  ticketNoTickets; //Ticket no => ticket struct

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
        require(is_allowed, "Could not decrease allowance");
        _tokenContract.transfer(msg.sender, amnt);
        balances[msg.sender] -= amnt;
    }

    function buyTicket(bytes32 hash_rnd_number) public override {
        require(balances[msg.sender] >= price, "Insufficient funds");
        require(isInPurchase(), "Current lottery is not in purchase state");
        balances[msg.sender] -= price;
        _tokenContract.decreaseAllowance(msg.sender, price);
        uint lottery_no = getLotteryNo(block.timestamp);

        uint256 ticket_no = _ticketContract.mint(msg.sender);
        ownedTickets[lottery_no][msg.sender].push(ticket_no);
        lotteryTickets[lottery_no].push(ticket_no);
        ticketNoTickets[ticket_no] = Ticket({owner: msg.sender, lottery_no: lottery_no, random_hash: hash_rnd_number, status: Status.BOUGHT});
    }

    function collectTicketRefund(uint ticket_no) public override {
        require(msg.sender == ticketNoTickets[ticket_no].owner, "Not the owner");
        uint lottery_no = getLotteryNo(block.timestamp);
        require(ticketNoTickets[ticket_no].lottery_no < lottery_no, "Lottery is not finished");
        require(ticketNoTickets[ticket_no].status == Status.BOUGHT, "Can not refund ticket if status is other than bought");
        address to = ticketNoTickets[ticket_no].owner;
        _tokenContract.transfer(to, price/2);
        ticketNoTickets[ticket_no].status == Status.REFUNDED;
    }

    function revealRndNumber(uint ticketno, uint rnd_number) public override {
        require(msg.sender == ticketNoTickets[ticketno].owner, "Not the owner");
        uint lottery_no = getLotteryNo(block.timestamp);
        require(ticketNoTickets[ticketno].lottery_no == lottery_no, "Not in current lottery");
        require(!isInPurchase(), "Not in reveal state");
        require(ticketNoTickets[ticketno].status == Status.BOUGHT, "Only reveal bought status");
        require(ticketNoTickets[ticketno].random_hash == sha256(abi.encodePacked(rnd_number, msg.sender)), "Random number and hash does not match");
        ticketNoTickets[ticketno].status = Status.REVEALED;
        revealedTickets[lottery_no].push(ticketno);
        xorOfLotteries[lottery_no] ^= rnd_number;
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public override view returns(uint,uint8 status) {
        require(lottery_no <= getLotteryNo(block.timestamp), "Lottery not started");
        uint len = ownedTickets[lottery_no][msg.sender].length;
        uint ticket_no = ownedTickets[lottery_no][msg.sender][len-1];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public override view returns(uint,uint8 status) {
        require(lottery_no <= getLotteryNo(block.timestamp), "Lottery not started");
        require(i < ownedTickets[lottery_no][msg.sender].length, "Out of bounds");
        uint ticket_no = ownedTickets[lottery_no][msg.sender][i];
        return (ticket_no, uint8(ticketNoTickets[ticket_no].status));
    }

    function checkIfTicketWon(uint ticket_no) public override view returns (uint amount) {
        require(msg.sender == ticketNoTickets[ticket_no].owner, "Not the owner");
        uint lottery_no = getLotteryNo(block.timestamp);
        uint tickets_lottery_no = ticketNoTickets[ticket_no].lottery_no;
        require(tickets_lottery_no < lottery_no, "Lottery is not finished");
        require(ticketNoTickets[ticket_no].status == Status.REVEALED, "Ticket is not in revealed status");
        require(numberOfTotalWinner(tickets_lottery_no) > 0, "There is no winner in lottery");

        uint totalRevealedTickets = revealedTickets[tickets_lottery_no].length;
        uint xoredHash = xorOfLotteries[tickets_lottery_no];    
        for(uint i = 0;  i < numberOfTotalWinner(tickets_lottery_no); i++){ 
            uint winning_ticket_index = xoredHash % totalRevealedTickets;
            uint winning_ticket_no = revealedTickets[tickets_lottery_no][winning_ticket_index];
            if(ticket_no == winning_ticket_no){
                amount += findIthPrizeOfLottery(tickets_lottery_no, i+1);
            }
            xoredHash = uint(sha256(abi.encodePacked(xoredHash)));
        }

        return amount;
    }

    function collectTicketPrize(uint ticket_no) public override {
        uint amount = checkIfTicketWon(ticket_no);
        require(amount > 0, "Did not win");
        _tokenContract.transfer(msg.sender, amount);
        ticketNoTickets[ticket_no].status = Status.WON;
    }

    function getIthWinningTicket(uint i, uint lottery_no) public override view returns (uint ticket_no,uint amount) {
        require(lottery_no < getLotteryNo(block.timestamp), "Lottery is not finished");
        require(i <= numberOfTotalWinner(lottery_no), "Should be less than the number of total winners");
        require(i > 0, "i must e greater than 0");
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
        return (unixtimeinweek - _initialTime)/(7 days);
    }

    function getTotalLotteryMoneyCollected(uint lottery_no) public override view returns (uint amount) {
        require(lottery_no < getLotteryNo(block.timestamp), "Lottery not finished yet");
        uint revealedTicketCount = revealedTickets[lottery_no].length;
        uint totalTicketCount = lotteryTickets[lottery_no].length;
        return (revealedTicketCount * price + (totalTicketCount - revealedTicketCount) * price/2);
    }

    function getHash(uint randn) public view returns (bytes32) {
        return sha256(abi.encodePacked(randn, msg.sender));
    }


    
    function findIthPrizeOfLottery(uint lottery_no, uint i) private view returns (uint){ 
        uint totalMoney = getTotalLotteryMoneyCollected(lottery_no);
        return ((totalMoney / 2**i) + (totalMoney / 2**(i-1))%2);
    }


    // return number of total winner for a lottery
    function numberOfTotalWinner(uint lottery_no) private view returns (uint) { 
        uint totalMoney = getTotalLotteryMoneyCollected(lottery_no);
        require(totalMoney > 0, "There is no total money collected");
        return (logUpperBound(totalMoney)+1);
    }

    // helper method to calculate log
    function logUpperBound(uint number) private pure returns (uint) {
        uint i = 0;
        uint result = 1;
        while (result < number) {
            result *= 2;
            i+=1;
        }
        return(i);
    }

    // checks if we are in purchase period
    function isInPurchase() private view returns (bool) {
        return block.timestamp - (_initialTime + (getLotteryNo(block.timestamp) * (7 days))) <= 4 days;
    }
}