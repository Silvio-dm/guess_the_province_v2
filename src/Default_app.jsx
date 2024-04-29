import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//import axios from 'axios';
import SelectProv from './select.jsx';
import Record from './Record.jsx';




function Game() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      
      <form action="/login" method="POST" id="form" className="form benvenuto">
          <SelectProv />
          <button type="submit" className="form-submit button-go">Go</button>
        
      </form>
      <form action="/logout" method="GET" className="form_game">
          <button  type="submit" className="form-submit button-go">Logout</button>
      </form>
      



      <Record />
        
      

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
  </div>
  )
}

export default Game;
