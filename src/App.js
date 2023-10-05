import React from "react";
import { Button } from 'reactstrap';
import './App.css';


function App(){
  return(
    <div className="App">    
      <header className="App-header" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 >To Do List</h1>

      <span>
      <a href="/register">
        <Button
          style={{ backgroundColor: '#62b0f2', marginRight: '1rem' }}
        >
          Register
        </Button>
        </a>
        <a href="/login">
          <Button
            style={{ backgroundColor: '#62b0f2' }}
          >
            Login
          </Button>
          </a>
        </span>    
        </header>
        </div>
  )
}

export default App