import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg';

import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error?.message);
        }
    };

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full">
                <img className="w-full h-full object-cover" src={background} alt="bg" />
            </div>
            <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-black/80">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[450px] h-[600px] bg-black/75">
                        <h1 className="text-center text-white text-3xl font-bold py-6 pt-20">Sign In</h1>
                        {error && <p className="text-red-500 w-2/3 mx-auto">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                value={email}
                                onInput={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="block text-white bg-gray-700 w-2/3 mx-auto my-5 px-4 py-2 rounded-md outline-none border-none"
                                type="text"
                                placeholder="Email..."
                            />
                            <input
                                value={password}
                                onInput={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="block text-white bg-gray-700 w-2/3 mx-auto my-5 px-4 py-2 rounded-md outline-none border-none"
                                type="password"
                                placeholder="Password..."
                            />
                            <button
                                type="submit"
                                className="block w-2/3 mx-auto bg-red-500 text-white px-4 py-2 rounded-md text-xl"
                            >
                                Sign Up
                            </button>
                            <div className="text-white w-2/3 mx-auto">
                                <div className="flex justify-between items-center my-2">
                                    <span>
                                        <input className="cursor-pointer" type="checkbox" id="remember" />
                                        <label className="cursor-pointer select-none" htmlFor="remember">
                                            Remember me
                                        </label>
                                    </span>
                                    <span className="text-gray-400 cursor-pointer select-none">Need Help?</span>
                                </div>
                                <div>
                                    <span className="text-gray-300">
                                        New to Netflix ?{' '}
                                        <Link to="/signup" className="font-bold text-white cursor-pointer select-none">
                                            Sign Up
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
