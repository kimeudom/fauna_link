import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Ramani from './components/Ramani';
import RegisterAnimals from './components/RegisterAnimals';
import Help from './components/Help';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/ramani" element={<Ramani />} /> 
                        <Route path="/registerAnimals" element={<RegisterAnimals />} />
                        <Route path="/help" element={<Help />} />
                        <Route path='*'element={<Navigate to="/"/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
