import RevealRndNumber from '../Reveal';
import {GetLastOwnedTicket} from '../OwnedTicket';
import GetOwnedTicket from '../OwnedTicket/GetOwnedTicket';
import Header from "./Header"

function TicketOperations() {
  
   
  
    return (
      <div>
        <Header  title="Ticket"/>
        <hr />
        <RevealRndNumber/>
        <GetLastOwnedTicket/>
        <GetOwnedTicket/>
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default TicketOperations;