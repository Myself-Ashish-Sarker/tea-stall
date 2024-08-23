import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useUserData from "../../hooks/useUserData";

const UserInfo = () => {

    const {user} = useContext(AuthContext);

    const {userData, loading, error} = useUserData();

    return (
        <div className="pt-24">
            {
                user ?
                    <>
                    {
                            loading ? <div>Loading...</div> :
                                error ? <div>Error: {error.message}</div> :
                                    userData && <>
                                        <div>
                                            <div className=''>
                                                <h1>User Name: {userData.name}</h1>
                                                <h1>Password: {userData.password}</h1>
                                                <h1>User Stats: {userData.status}</h1>
                                                <h1>User Image: {userData.img}</h1>
                                                <img className="w-44 rounded-full" src={userData.img} alt="" />
                                            </div>
                                        </div>
                                    </>
                        }
                    </>
                    :
                    <></>
            }
        </div>
    );
};

export default UserInfo