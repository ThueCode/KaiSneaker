import Slider from '~/components/Slider/Slider';
import Brands from '~/components/Brands/Brands';
import Featured from '~/components/Featured/Featured';
import Pagination from '~/components/Pagination/Pagination';
// import { useCookies } from 'react-cookie';

const HomePage = () => {
    return (
        <>
            <Slider />
            <div className="content grid wide">
                <Featured />
                <Brands />
                <Pagination 
                    currentPage={1}
                    totalPages={5}
                    onPageChange={(page) => console.log(page)}
                />
            </div>
        </>
    );
}

export default HomePage;
