import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const getNameUser = (email) => {
        return email.split('@')[0];
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('likedMovie');
            await logout();
            navigate('/signin');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
            <h1
                onClick={(e) => {
                    navigate('/');
                }}
                className="text-4xl font-bold text-red-600 cursor-pointer"
            >
                NETFLIX
            </h1>
            <div>
                {user?.email ? (
                    <>
                        <img
                            className="inline-block w-8 h-8 object-cover align-top"
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="avatar"
                        />
                        <Link
                            to="/account"
                            className="inline-block mx-3 font-bold text-gray-200 text-xl drop-shadow-lg"
                        >
                            {getNameUser(user?.email)}
                        </Link>
                        <p className="inline-block" onClick={handleLogout}>
                            <i className="text-2xl text-white cursor-pointer fa-solid fa-right-from-bracket"></i>
                        </p>
                    </>
                ) : (
                    <>
                        <button
                            onClick={(e) => {
                                navigate('/signin');
                            }}
                            className="px-3 py-2 mr-1 text-lg text-white hover:text-red-600"
                        >
                            Sign in
                        </button>
                        <button
                            onClick={(e) => {
                                navigate('/signup');
                            }}
                            className="px-3 py-2 rounded-md text-lg text-white bg-red-600 hover:bg-red-800"
                        >
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
