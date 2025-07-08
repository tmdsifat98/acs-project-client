import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <div className='dark:bg-gray-900'>
            <nav>
                <Navbar/>
            </nav>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;