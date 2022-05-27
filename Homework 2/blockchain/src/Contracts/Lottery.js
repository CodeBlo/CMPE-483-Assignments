import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { lotteryAddress, lotteryAbi } from './contracts';

const lotteryInterface = new utils.Interface(lotteryAbi)
const lotteryContract = new Contract(lotteryAddress, lotteryInterface)

export default lotteryContract;