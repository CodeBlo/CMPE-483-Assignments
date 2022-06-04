import {CollectTicketPrize } from '../Collect';
import CheckTicketWon from '../OwnedTicket/CheckTicketWon';
import GetWinningTicket from '../OwnedTicket/GetWinningTicket';
import Header from "./Header"
import {Stack} from "@mui/material";


function WinPage() {
  
   
  
    return (
      <div >
        <Header  title="Win"/>
        <Stack direction={"column"}>
            <CheckTicketWon/>
            <CollectTicketPrize/>
            <GetWinningTicket/>
        </Stack>

        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default WinPage;