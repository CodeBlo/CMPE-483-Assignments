import { Stack, Typography } from '@mui/material';
import Status from '../Status';

export default function OwnedTicketView(props){
    return(<Stack direction='column'>
            <Typography>{"Ticket No: " + props.ticketNo.toString()}</Typography>
            <Typography>{"Status: " + Status[props.status]}</Typography>
        </Stack>
    );
}

