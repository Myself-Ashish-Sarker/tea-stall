import React, { useContext, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import useAdmin from '../../hooks/useAdmin';


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const {isAdmin, loading, error} = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    console.log(pathname);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const links = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "About",
            path: "/about"
        }
    ]

    if (user) {
        links.push({
            title: "Dashboard",
            path: isAdmin ? "/dashboard/all-users" : "/dashboard/user-order"
            
        });
    }

    useEffect(() => {
        if (pathname === "/dashboard") {
            navigate("/", { replace: true})
        }
    }, [pathname, navigate])

    const dashboards = isAdmin
        ? [
            
            {
                title: "All Users",
                path: "all-users"
            },
            {
                title: "Home",
                path: "/"
            }
        ]
        :
        [
            {
                title: "User Order",
                path: "user-order"
            },
            {
                title: "User Cart",
                path: "user-cart"
            },
            {
                title: "Home",
                path: "/"
            }
        ]

        if (pathname.includes("dashboard")) {
            return (
                <div>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                                Open drawer
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className={`menu ${isAdmin ? "bg-blue-600" : "bg-yellow-500"} text-white min-h-full w-80 p-4`}>
                                {
                                    dashboards?.map(dashboard => <li key={dashboard.title}><Link to={dashboard.path}>{dashboard.title}</Link></li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }

    return (
        <div className='fixed w-full z-30'>
            <div className="navbar bg-[#900C3F]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                links.map(link => <li key={link.title}><Link to={link.path}>{link.title}</Link></li>)
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-white">tea-stall</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links.map(link => <li key={link.title}><Link className='text-white' to={link.path} >{link.title}</Link></li>)
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <figure tabIndex={0} role="button" className=""><BsPersonCircle className='text-white text-3xl' /></figure>
                        <ul tabIndex={0} className="dropdown-content menu bg-green-100 rounded-box z-[1] w-52 mt-6 p-2 shadow">
                            {
                                user ?
                                    <button onClick={handleLogOut}><li><Link className='hover:bg-yellow-500 hover:text-white' >Log Out</Link></li></button>
                                    :
                                    <li><Link className='hover:bg-yellow-500 hover:text-white' to="/login">Log In</Link></li>
                            }
                            <li><Link className='hover:bg-yellow-500 hover:text-white'>Dark Mode</Link></li>
                            {
                                user ?
                                    <button><li><Link className='hover:bg-yellow-500 hover:text-white' to="/user-info">User Info</Link></li></button>
                                    :
                                    <>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Navbar;