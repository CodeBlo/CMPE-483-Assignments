import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { tlTokenAbi, TLTokenContractAddress} from './contracts'

const tlTokenInterface = new utils.Interface(tlTokenAbi)
const tlTokenContract = new Contract(TLTokenContractAddress, tlTokenInterface)

export default tlTokenContract;