import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BgChoose from '../components/BgChoose';
import Catch from '../components/Catch';
import Detail from '../components/Detail';
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';



const DashboardRoute = () => {
    const location = useLocation()
    return (
        <div>
            <>
                <NavBar />
                <AnimatePresence>
                    <Routes location={location} key={location.key}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/detail/:nombre" element={<Detail />} />
                        <Route path="/catch/:nombre" element={<Catch />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </AnimatePresence>
                <BgChoose/>
            </>
        </div>
    );
};

export default DashboardRoute;