import RevealRndNumber from '../Reveal';
import {GetLastOwnedTicket} from '../OwnedTicket';
import GetOwnedTicket from '../OwnedTicket/GetOwnedTicket';
import Header from "./Header"
import {Stack} from "@mui/material";

function TicketOperations() {
  
   
  
    return (
      <div>
        <Header  title="Ticket"/>
        <Stack direction={"column"}>
            <RevealRndNumber/>
            <GetLastOwnedTicket/>
            <GetOwnedTicket/>
        </Stack>

        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default TicketOperations;