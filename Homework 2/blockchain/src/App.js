import logo from './logo.svg';
import './App.css';
import { useEthers } from '@usedapp/core'
function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>Account: {account}</p>}
      
    </div>
  )
}

export default App;
