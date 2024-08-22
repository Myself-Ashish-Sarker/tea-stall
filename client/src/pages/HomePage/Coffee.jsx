import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { GiCoffeeCup } from "react-icons/gi";

const Coffee = () => {

    const axiosPublic = useAxiosPublic();

    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        axiosPublic.get("/coffee")
            .then(res => {
                console.log(res.data);
                setCoffees(res.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <>
            <div className=" mt-24 flex justify-center items-center">
                <GiCoffeeCup className="text-xl" />
                <h1 className="text-xl text-[#604731] font-semibold">Popular Menu</h1>
            </div>
            <div className="mt-2 pb-5 flex justify-center">
                <h1 className="text-4xl font-extrabold">Our Special Tea & Coffee <span className="text-[#3a2306] font-medium">Menus</span></h1>
            </div>
            <div className="grid grid-cols-3 place-items-center gap-5 px-16">
                {
                    coffees.map((coffee, index) => (
                        <div key={index} className="card w-96 shadow-2xl bg-[#f9f6f1]">
                            <figure>
                                <img
                                    className="h-64"
                                    src={coffee.coffee_img}
                                    alt={coffee.coffee_name} />
                            </figure>
                            <div className="card-body">
                                <div className="bg-white p-7 rounded-md">
                                    <h2 className="card-title">{coffee.coffee_name}</h2>
                                    <p className="text-[#563e29] pb-2">{coffee.coffee_short_details}</p>
                                    <div className="card-actions justify-start">
                                        <Link to={`/coffee/${coffee._id}`}>
                                            <button className="btn bg-[#604731] hover:bg-black text-white">Coffee Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Coffee