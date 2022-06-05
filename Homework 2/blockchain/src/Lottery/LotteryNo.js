import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import NumberField from '../NumberField';
import ProgressBar from '../Progressbar';

export default function LotteryNo(props){
    const [unixTime, setUnixTime] = useState(0);
    const {send, state} = useContractFunction(lotteryContract, lotteryFunctions.getLotteryNo)

    const getLotteryNo = () => {
        send(unixTime)
        // new Date().getTime()
    }
    
    return(
        <Stack direction={"column"}>
            <Stack variant={"rename"} direction={"row"}>
                <NumberField label="Unix Time" value={unixTime} setter={setUnixTime}/>
                <Button onClick={getLotteryNo}>Get Lottery No</Button>
            </Stack>
            <ProgressBar state={state}/>
            {state.transaction && <Typography variant={"centerText"}> {"Lottery No: " + state.transaction.toString()}</Typography>}

        </Stack>

    )
 }