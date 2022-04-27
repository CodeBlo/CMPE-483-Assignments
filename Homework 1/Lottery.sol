pragma solidity ^0.8.0;

import "./TLToken.sol";
import "./TicketNFT.sol";
import "./ILottery.sol";

contract Lottery is ILottery {
    uint price = 10;
    mapping(address => uint256) balances;
    mapping(uint => uint) totalMoneyInLotteries;
    mapping(uint => mapping(address => uint)) lastOwnedTicketIndices; //LotteryNo => Owner => Ticket Index
    mapping(uint => mapping(address => mapping(uint => uint))) ownedTickets; //LotteryNo => Owner => Ith Ticket => Ticket No
    mapping(uint => mapping(uint => uint)) winningTickets; //LotteryNo => Ith Ticket => Ticket No
    uint _initialTimeInWeeks;
    TLToken _tokenContract;
    TicketNFT _ticketContract;

    constructor(address tokenAddress, address nftAddress) {
        _tokenContract = TLToken(tokenAddress);
        _ticketContract = TicketNFT(nftAddress);
        _initialTimeInWeeks = block.timestamp;
    }
    
    function depositTL(uint amnt) public {
        _tokenContract.decreaseAllowance(msg.sender, amnt);
        balances[msg.sender] += amnt;
    }
    
    function withdrawTL(uint amnt) public {
        _tokenContract.increaseAllowance(msg.sender, amnt);
        balances[msg.sender] -= amnt;
    }

    function buyTicket(bytes32 hash_rnd_number) public {
        require(balances[msg.sender] >= price, "Insufficient funds");
        balances[msg.sender] -= price;
        uint newIndex = lastOwnedTicketIndices[lottery_no][msg.sender] + 1;
        lastOwnedTicketIndices[lottery_no][msg.sender] = newIndex;
        ownedTickets[lottery_no][msg.sender][newIndex] = uint(hash_rnd_number);
    }

    function collectTicketRefund(uint ticket_no) public {

    }

    function revealRndNumber(uint ticketno, uint rnd_number) public {
        
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public view returns(uint,uint8 status) {
        uint index = lastOwnedTicketIndices[lottery_no][msg.sender];
        return ownedTickets[lottery_no][msg.sender][index];
    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public view returns(uint,uint8 status) {
        return winningTickets[i];
    }

    function checkIfTicketWon(uint ticket_no) public view returns (uint amount) {

    }

    function collectTicketPrize(uint ticket_no) public {

    }

    function getIthWinningTicket(uint i, uint lottery_no) public view returns (uint ticket_no,uint amount) {
        
    }

    function getLotteryNo(uint unixtimeinweek) public view returns (uint lottery_no) {
        
    }

    function getTotalLotteryMoneyCollected(uint lottery_no) public view returns (uint amount) {
        return totalMoneyInLotteries[lottery_no];
    }
}