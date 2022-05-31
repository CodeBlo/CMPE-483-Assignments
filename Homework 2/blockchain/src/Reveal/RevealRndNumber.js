import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';




export default function RevealRndNumber(props) {
    const [ticketNo, setTicketNo] = useState(0)
    const [rndNum, setRndNum] = useState(0)
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.revealRndNumber)

    const reveal = () => send(ticketNo, rndNum)

    return(
            <Stack>
                <NumberField label="Ticket No" value={ticketNo} setter={setTicketNo}/>
                <NumberField label="Random Number" value={rndNum} setter={setRndNum}/>
                <Button onClick={reveal}>Reveal</Button>
                <ProgressBar state={state}></ProgressBar>
            </Stack>
    );
}