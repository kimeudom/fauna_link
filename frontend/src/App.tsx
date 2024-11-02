import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Ramani from './components/Ramani';
import Sidebar from './components/Sidebar';
import RegisterAnimals from './components/RegisterAnimals';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/ramani" element={<Ramani />} /> 
                        <Route path="/register-animals" element={<RegisterAnimals />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
