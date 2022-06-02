import './App.css';
import { useEthers,    } from '@usedapp/core'
import { useState } from 'react';

import { Stack } from '@mui/material';
import { slide as Menu } from 'react-burger-menu'
import Sidebar from './Sidebar';

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const [show, setShow] = useState(false)

  const dummy = () => {
    setShow(true);
  }

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p> Account: {account}</p>}
      <button onClick={dummy}> Bos sgsdg</button>
      {//<Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      }
      <div id="outer-container">

      <Sidebar outerContainerId={'outer-container'} />
      
      </div>
        
      
      {show && <p> "asfasdgasg" </p>}



      
      
      
      {/*<button onClick={() => send({account: })}> Get TL balance </button>*/}
      
    </div>
  )
}


export default App;
