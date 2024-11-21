import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Custom CSS

import Navbar from './pages/Navbar/Navbar';
import Home from './pages/Home/Home';
import IdentifyPlant from './pages/IdentifyPlant/IdentifyPlant';
import CheckDisease from './pages/CheckDisease/CheckDisease';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/identify-plant" element={<IdentifyPlant />} />
                    <Route path="/check-disease" element={<CheckDisease />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
