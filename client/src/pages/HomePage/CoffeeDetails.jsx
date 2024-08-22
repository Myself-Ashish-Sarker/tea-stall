import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const CoffeeDetails = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [coffee, setCoffee] = useState(null);
    const { isAdmin, loading, error } = useAdmin();

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
        <div className="bg-[#f9f6f1] min-h-screen p-8">
            <div className="bg-white p-8 rounded-md">
                {
                    coffee && (
                        <div className="flex gap-6">
                            <div>
                                <img className="w-[80rem] rounded-lg" src={coffee.coffee_img} alt={coffee.coffee_name} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{coffee.coffee_name}</h1>
                                <p className="pt-4">{coffee.coffee_details}</p>
                                <div className="pt-8">
                                    <button
                                        disabled={isAdmin}
                                        className=" btn bg-[#604731] hover:bg-black text-white">
                                            Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CoffeeDetails