import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trailer2 from '../assets/9convert.com - Alchemy of Souls Part 2  Official Trailer  Netflix_720p.mp4';
import Video from './Video';

import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

function Movie({ movie, like }) {
    const [liked, setLiked] = useState(like);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);
    const saveShow = async (e) => {
        e.stopPropagation();

        if (user?.email) {
            setLiked(!liked);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path,
                }),
            });
        } else {
            alert('Please sign in to save this video!');
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
        <div
            onClick={handleOpenVideo}
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
        >
            <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.img}`} alt="movie" />

            <div className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0 hover:bg-black hover:opacity-100 md:hover:w-[300px] md:hover:-left-[10px] z-20 text-white">
                <Video video={trailer2} />
                <div className="flex items-center px-5">
                    <p className="p-1" onClick={saveShow}>
                        {liked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                    </p>
                    <h1 className="whitespace-normal text-white text-xs md:text-sm font-bold sm:px-1 sm:pl-2">
                        {truncateString(movie?.title, 20)}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Movie;
