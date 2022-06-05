import { Stack, Typography } from '@mui/material';
import Status from '../Status';

export default function OwnedTicketView(props){
    return(
        <Stack variant={"rename"} direction='row'>
            <Typography variant={"centerText"}>{"Ticket No: " + props.ticketNo.toString()}</Typography>
            <Typography variant={"centerText"}>{"Status: " + Status[props.status]}</Typography>
        </Stack>
    );
}

