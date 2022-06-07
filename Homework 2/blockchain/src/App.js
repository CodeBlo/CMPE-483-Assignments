import './App.css';
import { useEthers,    } from '@usedapp/core'
import React from 'react';
import Sidebar from './Sidebar';
import { Button, Typography } from '@mui/material';


function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()




  return (
    <div>
      <Sidebar outerContainerId={'outer-container'} />
      <div id="outer-container">
          <Typography variant="h2" color={"midnightblue"}  component="div" gutterBottom align={"center"}>
              Welcome
          </Typography>
        <Typography variant="h5" component="div" gutterBottom align={"center"}>
            We are Abdulkadir Elmacı and Muhammet Çavuş.
        </Typography>
          <Typography variant="h5" component="div" gutterBottom align={"center"}>
              This is our CmpE483 Project for Lottery Contract.
          </Typography>
          <Typography variant="h5" component="div" gutterBottom align={"center"}>
              To start lottery, first deploy your lottery contract and connect.
          </Typography>

        <center>

            {!account &&
                <Button variant="dashed" size="large" sx={{ m: 2 }} onClick={activateBrowserWallet}> Connect </Button>
            }
            
            {account && 

                <Button onClick={deactivate}> Disconnect  </Button>
            }
            {account && <p> Account: {account}</p>}
        </center>   
      
      </div>
      
    </div>
  )
}


export default App;
