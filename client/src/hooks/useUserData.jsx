import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useUserData = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user) {
                    const res = await axiosPublic.get("users");
                    const loggedInUser = res.data.find(u => u.email === user.email);
                    setUserData(loggedInUser);
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            };
        }
        fetchUser();
    }, [user, axiosPublic])

    return { userData, loading, error };
};

export default useUserData;