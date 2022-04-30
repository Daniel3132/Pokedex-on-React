import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Detail from '../components/Detail';
import Home from '../components/Home';
import NavBar from '../components/NavBar';


const DashboardRoute = () => {
    return (
        <div>
            <>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:nombre" element={<Detail />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </>
        </div>
    );
};

export default DashboardRoute;