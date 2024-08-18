import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

const Root = () => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div>
            {
                !pathname.includes("/login" ) && <Navbar />
            }
            {/* <Navbar /> */}
            <Outlet />
        </div>
    );
};

export default Root