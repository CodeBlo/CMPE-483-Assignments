import {LotteryNo, TotalMoneyCollected} from '../Lottery';
import Deposit from '../Balance/Deposit';
import Withdraw from '../Balance/Withdraw';
import Header from "./Header"

function LotteryPage() {
  
   
  
    return (
      <div>
        <Header  title="Lottery"/>
        <hr />
        <Deposit/>
        <Withdraw/>
        <LotteryNo/>
        <TotalMoneyCollected/>
      
        
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default LotteryPage;