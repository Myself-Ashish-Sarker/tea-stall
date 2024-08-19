import React from 'react';
import Navbar from '../../components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <>
            <div className='flex'>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardPage