import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useAdmin = () => {

    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                try {
                    const res = await axiosPublic.get("/users");
                    const loggedUser = res.data.find(u => u.email === user.email);
                    if (loggedUser && loggedUser.status === "admin") {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [user, axiosPublic])


    return { isAdmin, loading, error };
};

export default useAdmin;