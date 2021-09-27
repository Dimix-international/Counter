import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {CounterContainer} from "./Counter/CounterContainer";



function App() {
    return (
        <HashRouter>
            <div className="App">
                <CounterContainer />
            </div>
        </HashRouter>
    );
}

export default App;
