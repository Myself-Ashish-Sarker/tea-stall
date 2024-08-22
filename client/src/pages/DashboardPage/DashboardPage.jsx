import React, { useContext } from 'react';
import Navbar from '../../components/shared/Navbar';
import { Outlet } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';

const DashboardPage = () => {

    const {userData, loading, error} = useUserData();

    return (
        <>
            <div className='flex'>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Outlet />

                    {
                        loading ? <div>Loading...</div> :
                            error ? <div>Error: {error.message}</div> :
                                userData && <>
                                    <div>
                                        <div className=''>
                                            <h1>Welcome to the dashboard  <span className='text-xl'>{userData.name}</span></h1>
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </>
    );
};

export default DashboardPage