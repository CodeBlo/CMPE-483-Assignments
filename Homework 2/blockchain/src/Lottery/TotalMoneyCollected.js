import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';

export default function TotalMoneyCollected(props){
    const [lotteryNo, setLotteryNo] = useState(0);
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.getTotalLotteryMoneyCollected)

    const getCollectedMoney = () => {
        send(lotteryNo)
    }

    return(
        <Stack>
            <NumberField label="Lottery No" value={lotteryNo} setter={setLotteryNo}/>
            <Button onClick={getCollectedMoney}>Get Collected Money</Button>
            <ProgressBar state={state}/>
            {state.transaction && <Typography>Total Money Collected: {state.transaction[0]}</Typography>}
        </Stack>
    )
 }