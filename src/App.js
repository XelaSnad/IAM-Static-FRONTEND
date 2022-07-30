// import logo from './logo.svg';
import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

export default function App() {

    return (

        <div className="App">
            <Router>
                <Routes>
                    <Route path= "/" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
}
