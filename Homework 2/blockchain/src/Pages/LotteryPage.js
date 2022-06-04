import {LotteryNo, TotalMoneyCollected} from '../Lottery';
import Deposit from '../Balance/Deposit';
import Withdraw from '../Balance/Withdraw';
import Header from "./Header"

import { Stack } from '@mui/material';

function LotteryPage() {
  
   
  
    return (
      <div >
        <Header  title="Lottery"/>
        <Stack direction={"column"}>
            <Deposit/>
            <Withdraw/>
            <LotteryNo/>
            <TotalMoneyCollected/>
        </Stack>

      
        
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default LotteryPage;