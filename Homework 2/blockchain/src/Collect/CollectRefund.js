import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';

export default function CollectRefund(props){
    const [ticketNo, setTicketNo] = useState(0);
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.collectTicketRefund)

    const refund = () => {
        send(ticketNo)
    }

    return(
        <Stack direction={"column"}>
            <Stack variant={"rename"} direction="row">
                <NumberField label="Ticket No" value={ticketNo} setter={setTicketNo}/>
                <Button onClick={refund}>Refund</Button>
            </Stack>
            <ProgressBar state={state}/>
        </Stack>
    )
 }