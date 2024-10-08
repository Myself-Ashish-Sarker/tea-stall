import * as ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/HomePage/Home";
import About from "../pages/AboutPage/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserInfo from "../components/UserInfo/UserInfo";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import UserOrders from "../pages/DashboardPage/UserPages/UserOrders";
import AllUsers from "../pages/DashboardPage/AdminPages/AllUsers";
import CoffeeDetails from "../pages/HomePage/CoffeeDetails";
import UserCart from "../pages/DashboardPage/UserPages/UserCart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/coffee/:id",
                element: <CoffeeDetails />
            },
            {
                path: "/user-info",
                element: <UserInfo />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
            {
                path: "user-order",
                element: <UserOrders />
            },
            {
                path: "user-cart",
                element: <UserCart />
            },
            {
                path: "all-users",
                element: <AllUsers />
            }
        ]
    }
]);

export default router;