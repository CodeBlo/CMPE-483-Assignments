import {LotteryNo, TotalMoneyCollected} from '../Lottery';
import Deposit from '../Balance/Deposit';
import Withdraw from '../Balance/Withdraw';

function LotteryPage() {
  
   
  
    return (
      <div>

        <Deposit/>
        <Withdraw/>
        <LotteryNo/>
        <TotalMoneyCollected/>
      
        
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default LotteryPage;