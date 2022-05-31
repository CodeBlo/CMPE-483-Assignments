import { useContractFunction } from '@usedapp/core'
import { lotteryContract, lotteryFunctions, tlTokenContract, tlFunctions } from '../Contracts';

import { lotteryAddress } from '../Contracts/contracts';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';


export default function Deposit(props) {
    const [allowance, setAllowance] = useState(0)
    const [depositAmount, setDepositAmount] = useState(0)
    const {state: alwState, send: alwSend} = useContractFunction(tlTokenContract, tlFunctions.increaseAllowance)
    const {state: dpstState, send: dpstSend} = useContractFunction(lotteryContract, lotteryFunctions.depositTl)

    const deposit = () => {
        dpstSend(depositAmount)
        
    }

    const increaseAllowance = () => {
        alwSend(lotteryAddress, allowance)
    }

    return (<Stack direction='column'>

                <NumberField label="Allowance Amount" value={allowance} setter={setAllowance}/>
                <Button onClick={increaseAllowance}> Give allowance to lottery</Button>
                <ProgressBar state={alwState}></ProgressBar>
                
                
                <NumberField label="Deposit Amount" value={depositAmount} setter={setDepositAmount}/>
                <Button onClick={deposit}>Deposit TL to lottery</Button>
                <ProgressBar state={dpstState}></ProgressBar>

            </Stack>);
}

