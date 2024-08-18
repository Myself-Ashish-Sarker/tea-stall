import { Link } from 'react-router-dom';

const Login = () => {

    const handleLog = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const log = {name, email, password};
        console.log(log);
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
        </div>
    );
};

export default Login