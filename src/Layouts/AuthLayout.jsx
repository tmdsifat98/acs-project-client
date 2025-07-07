import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <nav>
                <Navbar/>
            </nav>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;