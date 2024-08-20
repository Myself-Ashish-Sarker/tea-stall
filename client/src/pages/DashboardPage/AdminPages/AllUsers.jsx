import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../providers/AuthProvider';

const AllUsers = () => {

    // const {user, delUser} = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/users")
            .then(res => {
                setUsers(res.data)
                console.log(res.data);
            })
    }, [axiosPublic])

    const handleDelete = async (id, uid) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.delete(`users/${id}`);
                    console.log(res.data);

                    if (res.status === 200) {
                        const firebaseRes = await axiosPublic.delete(`/users/firebase/${uid}`);
                        console.log(firebaseRes.data);
                    }

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    // Optionally, update the UI after deletion
                    setUsers(users.filter(user => user._id !== id));
                } catch (err) {
                    console.log(err.message);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the user.",
                        icon: "error"
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }

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
                                <tr key={user._id}>
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
                                        <button onClick={() => handleDelete(user._id, user.uid)} className="btn bg-red-600 text-white hover:bg-red-500">Delete</button>
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