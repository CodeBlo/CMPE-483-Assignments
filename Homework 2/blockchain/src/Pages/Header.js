import React from "react";
import Typography from "@mui/material/Typography"; 
import Sidebar from "../Sidebar";

function Header(props) {
  return (
    <div>
        <Sidebar outerContainerId={'outer-container'} />
        <div id="outer-container"></div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
            This is {props.title} Operations Page!
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align={"center"}>
            My name is Muhamemt Çavuş. I am being forced to develop web3-react. Name of the perpetrator is Kadir Elmacı.
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align={"center"}>
            If anyone sees this message, please help me.
        </Typography>


       
    </div>
  );
}
export default Header;
