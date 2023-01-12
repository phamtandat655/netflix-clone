import { useNavigate } from 'react-router-dom';

function Watch() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="bg-gray-700 w-full h-screen">
            <p
                onClick={handleClick}
                className={`block cursor-pointer absolute top-14 left-1 rounded-full p-2 z-10 opacity-70 hover:opacity-100 -translate-y-1/2 text-white text-3xl`}
            >
                <i className="fa-solid fa-arrow-left"></i>
            </p>
            {/* <video className="w-full h-full" autoPlay progress>
                <source src="https://www.youtube.com/watch?v=50kLmhGpt1s" type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/50kLmhGpt1s"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Watch;
