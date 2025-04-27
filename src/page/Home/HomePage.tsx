import { useState } from 'react';
import Slider from '~/components/Slider/Slider';
import Brands from '~/components/Brands/Brands';
import Featured from '~/components/Featured/Featured';
import Pagination from '~/components/Pagination/Pagination';
// import { useCookies } from 'react-cookie';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Current page is now: ${page}`);
    };

    return (
        <>
            <Slider />
            <div className="content grid wide">
                <Featured />
                <Brands />
                <Pagination 
                    currentPage={currentPage}
                    totalPages={20}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default HomePage;
