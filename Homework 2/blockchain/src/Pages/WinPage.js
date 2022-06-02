import {CollectTicketPrize } from '../Collect';
import CheckTicketWon from '../OwnedTicket/CheckTicketWon';
import GetWinningTicket from '../OwnedTicket/GetWinningTicket';



function LotteryPage() {
  
   
  
    return (
      <div>

        <CheckTicketWon/>
        <CollectTicketPrize/>
        <GetWinningTicket/>   
        
        {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
        
      </div>
    )
  }
  
  
  export default LotteryPage;