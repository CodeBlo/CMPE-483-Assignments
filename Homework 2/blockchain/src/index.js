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
const config = {
    readOnlyChainId: TestBNB.chainId,
    readOnlyUrls: {
        [TestBNB.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <DAppProvider config={config}>


    <BrowserRouter>
      <Routes>
          <Route index element={<App/>} />
          <Route path="/lottery" element={<LotteryPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/ticket" element={<TicketOperationPage />} />
          <Route path="/win" element={<WinPage />} />
      </Routes>
    </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
