import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Catch from '../components/Catch';
import Detail from '../components/Detail';
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';


const DashboardRoute = () => {
    return (
        <div>
            <>
                <NavBar />  
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/detail/:nombre" element={<Detail />} />
                    <Route path="/catch/:nombre" element={<Catch />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </>
        </div>
    );
};

export default DashboardRoute;