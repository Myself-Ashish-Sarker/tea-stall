import React from 'react';
import Navbar from '../../components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DashboardPage