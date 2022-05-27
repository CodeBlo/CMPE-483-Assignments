import logo from './logo.svg';
import './App.css';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useEtherBalance, useCall } from '@usedapp/core'
import { TLTokenContractAddress, tlTokenAbi } from './Contracts/contracts';

const tlTokenInterface = new utils.Interface(tlTokenAbi)
const tlTokenContract = new Contract(TLTokenContractAddress, tlTokenInterface)

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userBalance = useEtherBalance(account)
  
  const { value, error }= useCall({
      contract: tlTokenContract,
      method: "totalSupply", 
      args: [],
  }) ?? {}
  // console.log(value)
  // if(error){
  //   console.error(error)
  // }
  console.log(value)
  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>Account: {account}</p>}
      {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
      {!error && value && <p>TL Balance {formatTL(value?.[0])}</p>}
      {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
      
    </div>
  )
}

function formatTL(userBalance) {
  return (userBalance/10**18);
}

function formatEther(userBalance) {
  return (userBalance/10**18).toFixed(3);
}

export default App;
