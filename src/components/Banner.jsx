import axios from 'axios';
import { useEffect, useState } from 'react';
import requests from '../Requests';

import { ImSpinner2 } from 'react-icons/im';

function Banner() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const movie = movies[Math.floor(Math.random() * movies.length)];

    useEffect(() => {
        setLoading(true);
        try {
            axios.get(requests.requestPopular).then((response) => {
                setMovies(response.data.results);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const truncateString = (string, num) => {
        if (string?.length > num) {
            return string.slice(0, num) + '...';
        } else {
            return string;
        }
    };

    return (
        <div className="w-full h-[650px] text-white">
            {loading ? (
                <ImSpinner2 className="mx-auto animate-spin text-white text-4xl" />
            ) : (
                <div className="w-full h-full">
                    <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
                    <img
                        className="w-full h-full object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt={movie?.title}
                    />
                    <div className="absolute top-[20%] p-4 md:p-8">
                        <h1 className="text-3xl font-bold">{movie?.title}</h1>
                        <div className="mt-3">
                            <button className="py-2 px-3 mr-2 bg-gray-300 text-black border border-gray-300 hover:bg-gray-400">
                                Play
                            </button>
                            <button className="py-2 px-3 border boder-white text-white hover:bg-gray-700">
                                Watch Later
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm my-2">Released : {movie?.release_date}</p>
                        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] text-gray-200">
                            {truncateString(movie?.overview, 150)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Banner;
