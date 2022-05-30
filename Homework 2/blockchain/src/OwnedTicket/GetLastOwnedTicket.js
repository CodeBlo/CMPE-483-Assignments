import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import OwnedTicketView from './OwnedTicketView';

export default function GetLastOwnedTicket(props) {
    const [lotteryNo, setLotteryNo] = useState(0);
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.getLastOwnedTicketNo)

    const getLastOwnedTicketNo = () => {
        send(lotteryNo);
    }
    
    return (<Stack direction='column'>
                <TextField value={lotteryNo} onChange={(e) => setLotteryNo(parseInt(e.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <Button onClick={getLastOwnedTicketNo}> Get Last Owned Ticket</Button>
                {state.transaction && <OwnedTicketView ticketNo={state.transaction[0]} status={state.transaction[1]}/>}
            </Stack>);
}