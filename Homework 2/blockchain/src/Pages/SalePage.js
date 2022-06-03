import BuyTicket from '../Buy';
import { CollectRefund } from '../Collect';
import Header from "./Header"


function SalePage() {
  
   
  
    return (
      <div>
        <Header  title="Sale"/>
        <hr />
        <BuyTicket/>
        <CollectRefund/> 
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default SalePage;