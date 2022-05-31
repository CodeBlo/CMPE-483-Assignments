import { Typography } from '@mui/material';

export default function ErrorMessage(props){

    return (<Typography color="red">{"Error occured: " + props.state.errorMessage}</Typography>);
}
