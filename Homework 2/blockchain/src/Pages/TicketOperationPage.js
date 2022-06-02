import RevealRndNumber from '../Reveal';
import {GetLastOwnedTicket} from '../OwnedTicket';
import GetOwnedTicket from '../OwnedTicket/GetOwnedTicket';

function TicketOperations() {
  
   
  
    return (
      <div>

        <RevealRndNumber/>
        <GetLastOwnedTicket/>
        <GetOwnedTicket/>
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default TicketOperations;