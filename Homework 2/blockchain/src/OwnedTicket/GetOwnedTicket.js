import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import OwnedTicketView from './OwnedTicketView';
import NumberField from '../NumberField';

export default function GetOwnedTicket(props) {
    const [lotteryNo, setLotteryNo] = useState(0);
    const [index, setIndex] = useState(0)
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.getIthOwnedTicketNo)

    const getIthOwnedTicket = () => {
        send(index, lotteryNo);
    }
    
    return (<Stack direction='row'>
                <NumberField label="Lottery No" value={lotteryNo} setter={setLotteryNo}/>
                <NumberField label="Index" value={index} setter={setIndex}/>
                <Button onClick={getIthOwnedTicket}>Get Ith Owned Ticket</Button>
                {state.transaction && <OwnedTicketView ticketNo={state.transaction[0]} status={state.transaction[1]}/>}
            </Stack>);
}