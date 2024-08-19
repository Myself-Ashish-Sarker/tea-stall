import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {

    const { createUser } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const handleReg = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const reg = { name, email, password };
        console.log(reg);

        createUser(email, password)
            .then(res => {
                console.log(res.user);

                const user = { name, email, password, status: "user" }

                axiosPublic.post("/users", user)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err.message);
                        if(err.response && err.response.status === 409) {
                            console.log(err.response.data.message);
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='flex justify-center items-center bg-[#f9f6f1] min-h-screen'>
            <div>
                <div className="card-compact bg-base-100 w-96 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-center text-xl">Register!</h1>
                        {/*  */}
                        <form className="card-body" onSubmit={handleReg}>
                            <div className="form-control pb-2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="name" className="input input-bordered" name="name" required />
                            </div>
                            <div className="form-control pb-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name="password" required />
                            </div>
                            <div>
                                <p>No Account? <span><Link to="/login">Login</Link></span></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        {/*  */}
                    </div>
                </div>
                <div className='flex justify-center pt-5'>
                    <button className='btn bg-[#77524a] text-white hover:bg-slate-600'>
                        <Link to="/">Back to Home</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register