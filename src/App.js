import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './pages/Navbar/Navbar';
import Home from './pages/Home/Home';
import IdentifyPlant from './pages/IdentifyPlant/IdentifyPlant';
import CheckDisease from './pages/CheckDisease/CheckDisease';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/identify" element={<IdentifyPlant />} />
                <Route path="/disease" element={<CheckDisease />} />
            </Routes>
        </Router>
    );
};

export default App;