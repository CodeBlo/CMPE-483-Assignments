import {LinearProgress, Stack} from '@mui/material';
import ErrorMessage from './ErrorMessage';




function ProgressBar(props) {
    if(props.state.status === "PendingSignature")
        return <LinearProgress variant="determinate" value={33} color={"secondary"}/>
    else if(props.state.status === "Exception")
        return <LinearProgress variant="determinate" value={50} color={"error"}/>
    else if(props.state.status === "Mining")
        return <LinearProgress variant="determinate" value={66} color={"info"}/>
    else if(props.state.status === "Success")
        return <LinearProgress variant="Success" value={100} color={"success"}/>
    return null
}

export default function Progress(props) {
    return(
        <Stack direction='column'>
            <ProgressBar state={props.state}/>
            {props.state.status === "Exception" && <ErrorMessage state={props.state}/>}
        </Stack>
    )
}