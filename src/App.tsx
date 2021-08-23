import React from 'react';
import './App.css';
import {Counter} from "./Counter/Counter";
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Counter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
