pragma solidity ^0.8.0;

interface ILottery {
    function depositTL(uint amnt) external;
    function withdrawTL(uint amnt) external;
    function buyTicket(bytes32 hash_rnd_number) external;
    function collectTicketRefund(uint ticket_no) external;
    function revealRndNumber(uint ticketno, uint rnd_number) external;
    function getLastOwnedTicketNo(uint lottery_no) external view returns(uint,uint8 status);
    function getIthOwnedTicketNo(uint i,uint lottery_no) external view returns(uint,uint8 status);
    function checkIfTicketWon(uint ticket_no) external view returns (uint amount);
    function collectTicketPrize(uint ticket_no) external;
    function getIthWinningTicket(uint i, uint lottery_no) external view returns (uint ticket_no,uint amount);
    function getLotteryNo(uint unixtimeinweek) external view returns (uint lottery_no);
    function getTotalLotteryMoneyCollected(uint lottery_no) external view returns (uint amount);
}