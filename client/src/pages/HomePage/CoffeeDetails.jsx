import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const CoffeeDetails = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [coffee, setCoffee] = useState(null);

    useEffect(() => {
        console.log(`Fetching coffee with ID: ${id}`);
        console.log(`/coffee/${id}`);

        axiosPublic.get(`/coffee/${id}`)
            .then(res => {
                console.log(res.data);
                setCoffee(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [id]);

    return (
        <div>
            <h1>Coffee Details Page</h1>
            {
                coffee && (
                    <div>
                        <h1>{coffee.coffee_name}</h1>
                        <p>{coffee.coffee_details}</p>
                    </div>
                )
            }
        </div>
    );
};

export default CoffeeDetails