import './App.css';
import { useEthers,    } from '@usedapp/core'
import { useState } from 'react';
import React from 'react';
import Sidebar from './Sidebar';
import { Button, Stack, Typography, ThemeProvider } from '@mui/material';
import { purple, green, blue, red } from '@mui/material/colors';
import { createTheme, experimental_sx as sx } from '@mui/material/styles';

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const [show, setShow] = useState(false)
  const myTheme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
   
    components: {
      MuiChip: {
        styleOverrides: {
          root: sx({
            // https://mui.com/system/the-sx-prop/#spacing
            px: 1,
            py: 0.25,
            // https://mui.com/system/borders/#border-radius
            borderRadius: 1, // 4px as default.
          }),
          label: {
            padding: 'initial',
          },
          icon: sx({
            mr: 0.5,
            ml: '-2px',
          }),
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed' },
            style: {
              textTransform: 'none',
              border: `2px dashed ${blue[500]}`,
            },
          },
          {
            props: { variant: 'dashed', color: 'secondary' },
            style: {
              border: `4px dashed ${red[500]}`,
            },
          },
        ],
      },
    },

  });



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
            <ThemeProvider theme={myTheme}>
                <Button variant="dashed" size="large" sx={{ m: 2 }} onClick={activateBrowserWallet}> Connect </Button>
            </ThemeProvider>
            }
            
            {account && 
            <ThemeProvider theme={myTheme}>
                <Button onClick={deactivate}> Disconnect  </Button>
            </ThemeProvider>
            }
            {account && <p> Account: {account}</p>}
        </center>   
      
      </div>
      
    </div>
  )
}


export default App;
