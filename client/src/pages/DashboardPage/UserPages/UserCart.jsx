import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";


const UserCart = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user) {
            axiosPublic.get(`/carts/${user.email}`)
                .then(res => {
                    setCartItems(res.data);
                })
                .catch(err => {
                    console.error(err.message);
                });
        }
    }, [user]);

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>{item.coffeeName} - {item.coffeePrice} Taka</li>
                ))}
            </ul>
        </div>
    );
};

export default UserCart;