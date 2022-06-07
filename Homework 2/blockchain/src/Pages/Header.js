import React from "react";
import Typography from "@mui/material/Typography"; 
import Sidebar from "../Sidebar";

function Header(props) {
  return (
    <div>
        <Sidebar outerContainerId={'outer-container'} />
        <div id="outer-container"></div>
        <Typography variant="h2" color={"midnightblue"}  component="div" gutterBottom align={"center"}>
            {props.title} Operations
        </Typography>

    </div>
  );
}
export default Header;
