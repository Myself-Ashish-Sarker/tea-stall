import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AllUsers = () => {

    const [users, setUsers] = useState([]);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/users")
            .then(res => {
                setUsers(res.data)
                console.log(res.data);
            })
    }, [axiosPublic])

    return (
        <div>
            <h1>This is all users page</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => (
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <th>
                                        <button className="btn bg-red-600 text-white hover:bg-red-500">Delete</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllUsers