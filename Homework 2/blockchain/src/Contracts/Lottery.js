import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { lotteryAddress, lotteryAbi } from './contracts';

const lotteryInterface = new utils.Interface(lotteryAbi)
const lotteryContract = new Contract(lotteryAddress, lotteryInterface)

const lotteryFunctions = {
    buyTicket: "buyTicket",
    collectTicketPrize : "collectTicketPrize",
    collectTicketRefund : "collectTicketRefund",
    depositTl : "depositTL",
    revealRndNumber : "revealRndNumber",
    withdrawTl : "withdrawTL",
    balances : "balances",
    checkIfTicketWon : "checkIfTicketWon",
    getHash : "getHash",
    getIthOwnedTicketNo : "getIthOwnedTicketNo",
    getIthWinningTicket : "getIthWinningTicket",
    getLastOwnedTicketNo : "getLastOwnedTicketNo",
    getLotteryNo : "getLotteryNo",
    getTotalLotteryMoneyCollected : "getTotalLotteryMoneyCollected"
}




export {lotteryContract, lotteryFunctions};