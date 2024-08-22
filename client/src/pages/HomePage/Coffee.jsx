import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
        <div className="grid grid-cols-3 place-items-center gap-5">
            {
                coffees.map((coffee, index) => (
                    <div key={index} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{coffee.coffee_name}</h2>
                            <p>{coffee.coffee_short_details}</p>
                            <div className="card-actions justify-start">
                                <Link to={`/coffee/${coffee._id}`}>
                                    <button className="btn btn-primary">Coffee Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Coffee