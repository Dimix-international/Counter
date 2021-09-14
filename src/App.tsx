import React from 'react';
import './App.css';
import {Counter} from "./Counter/Counter";
import {HashRouter} from "react-router-dom";



function App() {
    return (
        <HashRouter>
            <div className="App">
                <Counter/>
            </div>
        </HashRouter>
    );
}

export default App;
