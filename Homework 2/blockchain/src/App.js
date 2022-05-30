import './App.css';
import { useEthers,    } from '@usedapp/core'
import Balance from './Balance/Balance';
import Deposit from './Balance/Deposit';
import {GetLastOwnedTicket} from './OwnedTicket';



function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p> Account: {account}</p>}
      {<Balance/>}
      {<Deposit/>}
      <GetLastOwnedTicket/>
      {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
      
    </div>
  )
}

export default App;
