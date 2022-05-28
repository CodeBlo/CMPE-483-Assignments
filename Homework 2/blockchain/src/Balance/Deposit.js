import { useEthers, useContractFunction } from '@usedapp/core'
import { lotteryContract, tlTokenContract } from '../Contracts';

import { lotteryAddress } from '../Contracts/contracts';
import { Button, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';



const increaseAllowance = (allowance, send) => {

    send(lotteryAddress, allowance)
}

const deposit = (depositAmount, send) => {
    send(depositAmount)
    console.log(depositAmount)
    
}

export const ProgressBar = (props) => {
    if(props.mostRecentState.status === "PendingSignature")
        return <LinearProgress variant="determinate" value={33} color={"secondary"}/>
    else if(props.mostRecentState.status === "Exception")
        return <LinearProgress variant="determinate" value={50} color={"error"}/>
    else if(props.mostRecentState.status === "Mining")
        return <LinearProgress variant="determinate" value={66} color={"info"}/>
    else if(props.mostRecentState.status === "Success")
        return <LinearProgress variant="Success" value={100} color={"success"}/>
    return null
}

export default function Deposit(props) {
    const [allowance, setAllowance] = useState(0)
    const [depositAmount, setDepositAmount] = useState(0)
    const {state: alwState, send: alwSend} = useContractFunction(tlTokenContract, 'increaseAllowance')
    const {state: dpstState, send: dpstSend} = useContractFunction(lotteryContract, 'deposit')
    console.log(alwState)
    return (<Stack direction='column'>
                {alwState && <Typography>{alwState.status}</Typography>}
                {alwState && <ProgressBar mostRecentState={alwState}></ProgressBar>}
                <TextField value={allowance} onChange={(e) => setAllowance(parseInt(e.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <Button onClick={() => increaseAllowance(allowance, alwSend)}> Give allowance to lottery</Button>
                <TextField value={depositAmount} onChange={(e) => setDepositAmount(parseInt(e.target.value) || 0)}/>
                <Button onClick={() => deposit(depositAmount)}>Deposit TL to lottery</Button>
            </Stack>);
}

