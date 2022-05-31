import { useContractFunction } from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';

import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';



export default function Withdraw(props) {
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.withdrawTl)

    const withdraw = () => {
        send(withdrawAmount);
    }


    return (<Stack direction='column'>
                <NumberField label="Withdraw Amount" value={withdrawAmount} setter={setWithdrawAmount}/>
                <Button onClick={withdraw}>Withdraw</Button>
                <ProgressBar state={state}></ProgressBar>
            </Stack>);
}

