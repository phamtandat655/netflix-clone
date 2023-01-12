import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import Movie from './Movie';

function Row({ title, fetchURL }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likedMovies, setLikedMovies] = useState([]);
    const [local, setLocal] = useState([]);

    const slideRef = useRef();

    const { user } = UserAuth();

    useEffect(() => {
        setLoading(true);
        try {
            axios.get(fetchURL).then((response) => {
                setMovies(response.data.results);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }

        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setLikedMovies(doc.data()?.savedShows);
            localStorage.setItem('likedMovie', JSON.stringify(doc.data()?.savedShows));
        });

        if (JSON.parse(localStorage.getItem('likedMovie'))) {
            setLocal(JSON.parse(localStorage.getItem('likedMovie')));
        }
    }, [fetchURL, user?.email]);

    const handleScrollLeft = () => {
        slideRef.current.scrollLeft -= 280 + 2;
    };

    const handleScrollRight = () => {
        slideRef.current.scrollLeft += 280 + 2;
    };

    return (
        <div>
            <h1 className="text-2xl text-white font-bold p-2 pb-0 md:p-2">{title}</h1>;
            <div className="flex items-center relative">
                {loading ? (
                    <ImSpinner2 className="mx-auto animate-spin text-white text-4xl" />
                ) : (
                    <div
                        ref={slideRef}
                        id={'slider'}
                        className="overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide md:px-3"
                    >
                        <p
                            onClick={handleScrollLeft}
                            className={`hidden z-50 lg:block cursor-pointer absolute top-1/2 left-1 rounded-full shadow-md shadow-white p-2 opacity-70 hover:opacity-100 -translate-y-1/2 text-white text-4xl`}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </p>
                        {movies.map((movie, index) => {
                            let bl = false;
                            if (likedMovies && likedMovies !== []) {
                                likedMovies.find((item) => {
                                    if (item?.id === movie?.id) bl = true;
                                    return item?.id === movie?.id;
                                });
                            }
                            if (local && local !== []) {
                                local.find((item) => {
                                    if (item?.id === movie?.id) bl = true;
                                    return item?.id === movie?.id;
                                });
                            }
                            return <Movie movie={movie} key={index} like={bl} />;
                        })}
                        <p
                            onClick={handleScrollRight}
                            className={`hidden z-50 lg:block cursor-pointer absolute top-1/2 right-1 rounded-full shadow-md shadow-white p-2 opacity-70 hover:opacity-100 -translate-y-1/2 text-white text-4xl`}
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Row;
