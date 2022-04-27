pragma solidity ^0.8.0;

import "./TLToken.sol";
import "./TicketNFT.sol";
import "./ILottery.sol";

contract Lottery is ILottery {
    mapping(address => uint256) balances;
    mapping(uint => uint256) totalMoneyInLotteries;
    uint _initialTimeInWeeks;
    TLToken _tokenContract;
    TicketNFT _ticketContract;

    constructor(address tokenAddress, address nftAddress) {
        _tokenContract = TLToken(tokenAddress);
        _ticketContract = TicketNFT(nftAddress);
        _initialTimeInWeeks = now;
    }
    
    function depositTL(uint amnt) public {
        _tokenContract.decreaseAllowance(msg.sender, amnt);
        balances[msg.sender] += amnt;
    }
    
    function withdrawTL(uint amnt) public {
        _tokenContract.decreaseAllowance(msg.sender, amnt);
    }

    function buyTicket(bytes32 hash_rnd_number) public {

    }

    function collectTicketRefund(uint ticket_no) public {

    }

    function revealRndNumber(uint ticketno, uint rnd_number) public {
        
    }
    
    function getLastOwnedTicketNo(uint lottery_no) public view returns(uint,uint8 status) {

    }

    function getIthOwnedTicketNo(uint i,uint lottery_no) public view returns(uint,uint8 status) {

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