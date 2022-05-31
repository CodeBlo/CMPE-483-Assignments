import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import OwnedTicketView from './OwnedTicketView';
import ProgressBar from '../Progressbar';
import NumberField from '../NumberField';

export default function GetWinningTicket(props) {
    const [lotteryNo, setLotteryNo] = useState(0);
    const [index, setIndex] = useState(0)
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.getIthWinningTicket)

    const getIthWinningTicket = () => {
        send(index, lotteryNo);
    }
    
    return (<Stack direction='column'>
                <NumberField label="Lottery No" value={lotteryNo} setter={setLotteryNo}/>
                <NumberField label="Index" value={index} setter={setIndex}/>
                <Button onClick={getIthWinningTicket}> Get Ith Winning Ticket</Button>
                <ProgressBar state={state}/>
                {state.transaction && <OwnedTicketView ticketNo={state.transaction[0]} status={state.transaction[1]}/>}
            </Stack>);
}