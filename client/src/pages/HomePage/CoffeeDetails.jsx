import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const CoffeeDetails = () => {

    const { id } = useParams();  // Use the correct parameter name
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        console.log(`Fetching coffee with ID: ${id}`);
        console.log(`/coffee/${id}`);

        axiosPublic.get(`/coffee/${id}`)  // Use the correct ID in the request
            .then(res => {
                console.log(res.data);
                setCoffee(res.data);  // Save the data to state
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [id]);

    return (
        <div>
            <h1>Coffee Details Page</h1>
        </div>
    );
};

export default CoffeeDetails