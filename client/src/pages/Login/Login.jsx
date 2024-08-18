import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();

    const { signIn } = useContext(AuthContext);

    const handleLog = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const log = { name, email, password };
        console.log(log);

        signIn(email, password)
            .then(res => {
                console.log(res.user);
                toast.success("Successfully Logged In!", {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate("/")
                }, 5000);
                
            })
            .catch(err => {
                console.log(err);
                toast.error("Email and Password got wrong !", {
                    position: "top-right"
                });
            })
    }

    return (
        <div className='flex justify-center items-center bg-[#f9f6f1] min-h-screen'>
            <div>
                <div className="card-compact bg-base-100 w-96 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-center text-xl">Login!</h1>
                        {/*  */}
                        <form className="card-body" onSubmit={handleLog}>
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
                                <p>No Account? <span><Link to="/register">Register</Link></span></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
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
            <ToastContainer />
        </div>
    );
};

export default Login