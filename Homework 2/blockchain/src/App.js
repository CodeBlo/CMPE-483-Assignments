import './App.css';
import { useEthers,    } from '@usedapp/core'
import { useState } from 'react';
import React from 'react';

import { Stack } from '@mui/material';
import { slide as Menu } from 'react-burger-menu'
import Sidebar from './Sidebar';
import Typography from "@mui/material/Typography"; 

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const [show, setShow] = useState(false)

  return (
    <div>
      <React.Fragment>

        <Typography variant="h1" component="div" gutterBottom align={"center"}>
            Welcome
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align={"center"}>
            My name is Muhamemt Çavuş. I am being forced to develop web3-react. Name of the perpetrator is Kadir Elmacı.
        </Typography>

        <center>

            {!account && <button style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 0.5
                }} onClick={activateBrowserWallet}> Connect </button>}
            {account && <button onClick={deactivate}> Disconnect  </button>}
            {account && <p> Account: {account}</p>}
        </center>

      </React.Fragment>
      
      <div id="outer-container">

      <Sidebar outerContainerId={'outer-container'} />
      
      </div>
      
    </div>
  )
}


export default App;
