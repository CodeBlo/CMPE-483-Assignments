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
        <Typography variant="h1" component="div" gutterBottom align={"center"}>
            Welcome
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align={"center"}>
            My name is Muhamemt Çavuş. I am being forced to develop web3-react. Name of the perpetrator is Kadir Elmacı.
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
