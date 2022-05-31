import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ProgressBar from '../Progressbar';

export default function BuyTicket(props){
    const [rndHash, setRndHash] = useState("");
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.buyTicket)

    const buy = () => {
        send(rndHash)
    }

    return(
        <Stack>
            <TextField label="Random Hash" value={rndHash} onChange={(e) => setRndHash(e.target.value)}/>
            <Button onClick={buy}>Buy Ticket</Button>
            <ProgressBar state={state}/>
        </Stack>
    )
 }