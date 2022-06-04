import BuyTicket from '../Buy';
import { CollectRefund } from '../Collect';
import Header from "./Header"
import {Stack} from "@mui/material";


function SalePage() {
  
   
  
    return (
      <div>
        <Header  title="Sale"/>
        <Stack direction={"column"}>
            <BuyTicket/>
            <CollectRefund/>
        </Stack>

        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default SalePage;