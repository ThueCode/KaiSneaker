import Slider from '~/components/Slider/Slider';
import Brands from '~/components/Brands/Brands';
import Featured from '~/components/Featured/Featured';
// import { useCookies } from 'react-cookie';

const HomePage = () => {
    return (
        <>
            <Slider />
            <div className="content grid wide">
                <Featured />
                <Brands />
            </div>
        </>
    );
}

export default HomePage;
