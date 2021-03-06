import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';

export default function CheckTicketWon(props){
    const [ticketNo, setTicketNo] = useState(0);
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.checkIfTicketWon)

    const checkTicketWon = () => {
        send(ticketNo)
    }

    return(
        <Stack direction={"column"}>
            <Stack variant={"rename"} direction={"row"}>
                <NumberField label="Ticket No" value={ticketNo} setter={setTicketNo}/>
                <Button onClick={checkTicketWon}>Check If Ticket Won</Button>
            </Stack>
            <ProgressBar state={state}/>
            {state.transaction && <Typography variant={"centerText"}>Prize: {state.transaction[0]}</Typography>}
        </Stack>
        
    )
 }