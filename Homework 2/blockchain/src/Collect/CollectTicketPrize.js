import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';

export default function CollectTicketPrize(props){
    const [ticketNo, setTicketNo] = useState(0);
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.collectTicketPrize)

    const refund = () => {
        send(ticketNo)
    }

    return(
        <Stack direction="row">
            <NumberField label="Ticket No" value={ticketNo} setter={setTicketNo}/>
            <Button onClick={refund}>Collect Prize</Button>
            <ProgressBar state={state}/>
        </Stack>
    )
 }