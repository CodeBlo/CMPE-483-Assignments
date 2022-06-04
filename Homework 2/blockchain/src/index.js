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

import {DAppProvider, TestBNB} from '@usedapp/core'
import { purple, green, blue, red } from '@mui/material/colors';
import { createTheme, experimental_sx as sx } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

const config = {
    readOnlyChainId: TestBNB.chainId,
    readOnlyUrls: {
        [TestBNB.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
}

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
        MuiStack: {
            variants: [
                {
                    props: { },
                    style: {
                        alignSelf: "center",

                    },

                },
            ],
        },

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

        MuiTextField: {

            variants: [
                {
                    props: { },
                    style: {
                        border: `2px ${purple[500]}`,
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
                        border: `1.5px solid ${purple[500]}`,
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

            <BrowserRouter>
              <Routes>
                  <Route index element={<App/>} />
                  <Route path="/lottery" element={<LotteryPage />} />
                  <Route path="/sale" element={<SalePage />} />
                  <Route path="/ticket" element={<TicketOperationPage />} />
                  <Route path="/win" element={<WinPage />} />
              </Routes>
            </BrowserRouter>
        </ThemeProvider>

    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
