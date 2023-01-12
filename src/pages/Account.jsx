import Navbar from '../components/Navbar';
import bgImg from '../assets/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg';
import trailer2 from '../assets/9convert.com - Alchemy of Souls Part 2  Official Trailer  Netflix_720p.mp4';
import Video from '../components/Video';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

function Account() {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);
    const handleDeleteLikedMovie = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc(movieRef, {
                savedShows: result,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenVideo = () => {
        if (!user) {
            alert('Please sign in to watch this video!');
            navigate('/signin');
        } else {
            navigate('/watch');
        }
    };

    const truncateString = (string, num) => {
        if (string?.length > num) {
            return string.slice(0, num) + '...';
        } else {
            return string;
        }
    };

    return (
        <div className="w-full h-full">
            <Navbar />
            <img className="w-full h-[400px] object-cover" src={bgImg} alt="/" />
            <h1 className="text-2xl text-white font-bold p-2 mt-4 pb-0 md:p-2">FAVORITE MOVIES</h1>;
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-4 md:ml-6 lg:ml-3 xl:ml-8">
                {movies &&
                    movies.map((movie, index) => (
                        <div
                            key={index}
                            onClick={handleOpenVideo}
                            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 my-3 md:my-4"
                        >
                            <img src={`https://image.tmdb.org/t/p/original/${movie?.img}`} alt="movie" />

                            <div className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0 hover:bg-black hover:opacity-100 md:hover:w-[300px] md:hover:-left-[10px] z-20 text-white">
                                <Video video={trailer2} />
                                <div className="flex items-center px-5">
                                    <p onClick={(e) => e.stopPropagation()} className="p-1">
                                        <i className="fa-solid fa-heart"></i>
                                    </p>
                                    <h1 className="whitespace-normal text-white text-xs md:text-sm font-bold sm:px-1 sm:pl-2">
                                        {truncateString(movie?.title, 20)}
                                    </h1>
                                    <p
                                        className="ml-auto p-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteLikedMovie(movie?.id);
                                        }}
                                    >
                                        <i className="fa-solid fa-x"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Account;
