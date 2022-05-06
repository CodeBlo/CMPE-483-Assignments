pragma solidity ^0.8.0;

import "./TLToken.sol";
import "./TicketNFT.sol";
import "./ILottery.sol";

contract Lottery is ILottery {

    struct Ticket {
        address owner;
        uint ticket_no;
        uint amount;
    }

    uint price = 10;
    mapping(address => uint256) balances;
    mapping(uint => uint) totalMoneyInLotteries;
    //mapping(uint => mapping(address => uint)) lastOwnedTicketIndices; //LotteryNo => Owner => Ticket Index
    mapping(uint => mapping(address => uint[])) ownedTickets; //LotteryNo => Owner => Ticket No[]
    mapping(uint => Ticket[]) winningTickets; //LotteryNo =>  Ticket Nos

    uint _initialTimeInWeeks;
    TLToken _tokenContract;
    TicketNFT _ticketContract;

    constructor(address tokenAddress, address nftAddress) {
        _tokenContract = TLToken(tokenAddress);
        _ticketContract = TicketNFT(nftAddress);
        _initialTimeInWeeks = convertSecondsToWeek(block.timestamp);
    }
    
    function depositTL(uint amnt) public {
        _tokenContract.transferFrom(msg.sender, address(this), amnt);
        balances[msg.sender] += amnt;
    }
    
    function withdrawTL(uint amnt) public {
        _tokenContract.increaseAllowance(msg.sender, amnt);
        balances[msg.sender] -= amnt;
    }

    function buyTicket(bytes32 hash_rnd_number) public {
        require(balances[msg.sender] >= price, "Insufficient funds");
        balances[msg.sender] -= price;
        uint lottery_no = getLotteryNo(block.timestamp);
        _ticketContract.mint(msg.sender, uint256(hash_rnd_number));
        ownedTickets[lottery_no][msg.sender].push(uint(hash_rnd_number));
    }

    function collectTicketRefund(uint ticket_no) public {

    }

    function revealRndNumber(uint ticketno, uint rnd_number) public {
        
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
        return (winningTickets[lottery_no][i].ticket_no, winningTickets[lottery_no][i].amount);
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
}