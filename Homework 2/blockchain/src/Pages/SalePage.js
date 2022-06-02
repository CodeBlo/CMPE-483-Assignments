import BuyTicket from '../Buy';
import { CollectRefund } from '../Collect';


function SalePage() {
  
   
  
    return (
      <div>

        <BuyTicket/>
        <CollectRefund/> 
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default SalePage;