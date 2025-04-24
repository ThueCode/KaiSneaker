import classNames from 'classnames/bind';
import styles from './navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllBrand } from '~/service/api';

const cx = classNames.bind(styles);

// Định nghĩa kiểu cho dữ liệu trong state
interface NavData {
    idBrand: string;
    brandName: string;
    descriptionBrand: string;
    imageBrand: string;
}

const Navbar = () => {
    const [navData, setNavData] = useState<NavData[]>([]);

    const location = useLocation();

    const getBrand = async () => {
        try {
            await fetchAllBrand()
                .then((res) => {
                    return res.data.result;

                }).then((data) => setNavData(data))
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBrand()
    }, []);

    return (
        <ul className={cx('navbar')}>
            <li className={cx('navbar-item', {
                active: location.pathname === '/'
            })}>
                <Link className={cx('navbar-link')} to="/">
                    Trang chủ
                </Link>
            </li>
            <li className={cx('navbar-item', {
                active: location.pathname === '/sneaker'
            })}>
                <Link className={cx('navbar-link')} to={"/sneaker"}>
                    Sneaker
                </Link>
            </li>
            {navData.length > 0 ? (
                navData.map((nav) => (
                    <li className={cx('navbar-item', {
                        active: location.pathname === `/sneaker/${nav.brandName.toLowerCase()}`
                    })} key={nav.idBrand}>
                        <Link className={cx('navbar-link',)} to={`/sneaker/${nav.brandName.toLowerCase()}`}>
                            {nav.brandName.toUpperCase()}
                        </Link>
                    </li>
                ))
            ) : (
                <></>
            )}
        </ul>
    );
}

export default Navbar;
