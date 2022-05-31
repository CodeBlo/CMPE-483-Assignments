import './App.css';
import { useEthers,    } from '@usedapp/core'
import Deposit from './Balance/Deposit';
import {GetLastOwnedTicket} from './OwnedTicket';
import GetOwnedTicket from './OwnedTicket/GetOwnedTicket';
import RevealRndNumber from './Reveal';
import BuyTicket from './Buy';
import { CollectRefund, CollectTicketPrize } from './Collect';
import Withdraw from './Balance/Withdraw';
import CheckTicketWon from './OwnedTicket/CheckTicketWon';
import GetWinningTicket from './OwnedTicket/GetWinningTicket';
import {LotteryNo, TotalMoneyCollected} from './Lottery';



function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p> Account: {account}</p>}
      <Deposit/>
      <Withdraw/>
      <BuyTicket/>
      <CollectRefund/>
      <RevealRndNumber/>
      <GetLastOwnedTicket/>
      <GetOwnedTicket/>
      <CheckTicketWon/>
      <CollectTicketPrize/>
      <GetWinningTicket/>
      <LotteryNo/>
      <TotalMoneyCollected/>
      
      
      
      
      
      
      
      
      {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
      
    </div>
  )
}

export default App;
