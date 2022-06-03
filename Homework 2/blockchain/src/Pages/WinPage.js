import {CollectTicketPrize } from '../Collect';
import CheckTicketWon from '../OwnedTicket/CheckTicketWon';
import GetWinningTicket from '../OwnedTicket/GetWinningTicket';
import Header from "./Header"


function WinPage() {
  
   
  
    return (
      <div>
        <Header  title="Win"/>
        <hr />
        <CheckTicketWon/>
        <CollectTicketPrize/>
        <GetWinningTicket/>   
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default WinPage;