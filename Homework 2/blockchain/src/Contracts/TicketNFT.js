import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { ticketNftAbi, ticketNftAddress} from './contracts'

const ticketNftInterface = new utils.Interface(ticketNftAbi)
const ticketNftContract = new Contract(ticketNftAddress, ticketNftInterface)

export default ticketNftContract;