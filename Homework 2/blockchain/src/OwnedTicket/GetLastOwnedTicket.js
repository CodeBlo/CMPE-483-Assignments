import { useContractFunction} from '@usedapp/core'
import { lotteryContract, lotteryFunctions } from '../Contracts';
import { Button, Stack} from '@mui/material';
import React, { useState } from 'react';
import OwnedTicketView from './OwnedTicketView';
import NumberField from '../NumberField';

export default function GetLastOwnedTicket(props) {
    const [lotteryNo, setLotteryNo] = useState(0);
    const {state, send} = useContractFunction(lotteryContract, lotteryFunctions.getLastOwnedTicketNo)

    const getLastOwnedTicketNo = () => {
        send(lotteryNo);
    }
    
    return (
            <Stack direction={"column"}>
                <Stack variant={"rename"} direction='row'>
                    <NumberField label="Lottery No" value={lotteryNo} setter={setLotteryNo}/>
                    <Button onClick={getLastOwnedTicketNo}>Get Last Owned Ticket</Button>
                </Stack>
                {state.transaction && <OwnedTicketView ticketNo={state.transaction[0]} status={state.transaction[1]}/>}
            </Stack>
);
}