import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import OwnedTicketView from './OwnedTicketView';

export default function GetOwnedTicket(props) {
    const [lotteryNo, setLotteryNo] = useState(0);
    const [index, setIndex] = useState(0)
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.getIthOwnedTicketNo)

    const getIthOwnedTicket = () => {
        send(lotteryNo, index);
    }
    
    return (<Stack direction='column'>
                <TextField value={lotteryNo} onChange={(e) => setLotteryNo(parseInt(e.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <TextField value={index} onChange={(e) => setIndex(parseInt(e.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <Button onClick={getIthOwnedTicket}> Get Ith Owned Ticket</Button>
                {state.transaction && <OwnedTicketView ticketNo={state.transaction[0]} status={state.transaction[1]}/>}
            </Stack>);
}