import classNames from 'classnames/bind';
import styles from './navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { BrandContext } from '~/context/BrandContext';

const cx = classNames.bind(styles);

const Navbar = () => {

    const navData = useContext(BrandContext);
    const location = useLocation();

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
            {navData ? (
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
