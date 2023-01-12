function Video({ video }) {
    return <video className="w-[260px] object-cover mx-auto" src={video} autoPlay={true} loop muted />;
}

export default Video;
