import Banner from '../components/Banner';
import Row from '../components/Row';
import requests from '../Requests';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className=" pb-14">
            <Navbar />
            <Banner />
            <Row title="UpComing" fetchURL={requests.requestUpcoming} />
            <Row title="Popular" fetchURL={requests.requestPopular} />
            <Row title="Trending" fetchURL={requests.requestTrending} />
            <Row title="Top rated" fetchURL={requests.requestTopRated} />
            <Row title="Horror" fetchURL={requests.requestHorror} />
        </div>
    );
}

export default Home;
