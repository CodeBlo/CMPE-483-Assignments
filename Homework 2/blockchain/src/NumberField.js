import { TextField } from '@mui/material';

export default function NumberField(props){
    return (<TextField label={props.label} value={props.value} onChange={(e) => props.setter(parseInt(e.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />);
}
