import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import LotteryPage from "./Pages/LotteryPage"
import SalePage from "./Pages/SalePage"
import TicketOperationPage from "./Pages/TicketOperationPage"
import WinPage from "./Pages/WinPage"

import {DAppProvider, AvalancheTestnet} from '@usedapp/core'
import { green, blue } from '@mui/material/colors';
import { createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

const config = {
    readOnlyChainId: AvalancheTestnet.chainId,
    readOnlyUrls: {
        [AvalancheTestnet.chainId]: 'https://api.avax-test.network/ext/bc/C/rpc',
    },
}

const myTheme = createTheme({
    palette: {
        primary: {
            main: blue[200],
        },
        secondary: {
            main: green[500],
        },
    },

    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant:"h2"},
                    style: {
                        backgroundColor: blue[100],
                    },

                },
                {
                    props: { variant:"centerText"},
                    style: {
                        alignSelf: "center",
                    },

                },
            ],

        },

        MuiStack: {
            variants: [
                {
                    props: { variant:"rename"},
                    style: {
                        alignSelf: "center",

                    },

                },
            ],
        },

        MuiTextField: {

            variants: [
                {
                    props: { },
                    style: {
                        border: `2px ${blue[100]}`,
                        color: blue[500],
                        maxWidth: "400px",
                        minWidth: "200px",
                        alignSelf: "center",
                        margin: "15px",
                    },

                },

            ],

        },


        MuiButton: {

            variants: [
                {
                    props: { },
                    style: {
                        border: `1.5px solid ${blue[200]}`,
                        backgroundColor: '#fff',
                        color: '#3c52b2',
                        '&:hover': {
                            border: `0px solid`,
                            backgroundColor: '#3c52b2',
                            color: '#fff',
                        },
                        maxWidth: "400px",
                        minWidth: "200px",
                        alignSelf: "center",
                    },

                },
            ],
        },
    },

});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <DAppProvider config={config}>
        <ThemeProvider theme={myTheme}>
                {/*<div style={{*/}
                {/*    backgroundImage:*/}
                {/*    backgroundRepeat: 'no-repeat',*/}
                {/*    backgroundSize: '%100 %100',*/}
                {/*    height: '%100'*/}
                {/*}}>*/}
                    <BrowserRouter basename='/CMPE-483-Assignments'>
                      <Routes>
                          <Route index element={<App/>} />
                          <Route path="/lottery" element={<LotteryPage />} />
                          <Route path="/sale" element={<SalePage />} />
                          <Route path="/ticket" element={<TicketOperationPage />} />
                          <Route path="/win" element={<WinPage />} />
                          <Route path="*" element={<App/>} />
                      </Routes>
                    </BrowserRouter>

                {/*</div>*/}
            </ThemeProvider>

    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
