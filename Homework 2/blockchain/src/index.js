import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
                <App />
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
