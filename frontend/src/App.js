import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';  // Add your CSS file here

import Navbar from './pages/Navbar/Navbar';
import Home from './pages/Home/Home';
import IdentifyPlant from './pages/IdentifyPlant/IdentifyPlant';
import CheckDisease from './pages/CheckDisease/CheckDisease';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <section id="home">
                    <Home />
                </section>
                <section id="identify-plant">
                    <IdentifyPlant />
                </section>
                <section id="check-disease">
                    <CheckDisease />
                </section>
            </div>
        </Router>
    );
};

export default App;