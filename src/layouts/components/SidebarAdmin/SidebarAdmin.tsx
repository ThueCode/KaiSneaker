import classNames from 'classnames/bind';
import styles from './sidebarAdmin.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import Image from '~/components/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBoxesStacked,
    faBoxOpen,
    faDashboard,
    faFileInvoiceDollar,
    faHome,
    faSignOut,
    faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { faBarChart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

interface SidebarAdminProps {
    children: ReactNode;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ children }) => {
    const [statusMenu, setStatusMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Example for authentication check
        // if (!cookie.name) {
        //     navigate('/login');
        // }
    }, [navigate]);

    const handleToggleMenu = () => {
        setStatusMenu(!statusMenu);
    };

    const logOut = () => {
        // Example: removeCookie('name');
    };

    return (
        <>
            <div className={cx('navigation', 'col', 'l-3', statusMenu ? 'active' : '')}>
                <ul className={cx('nav-list')}>
                    <li className={cx('nav-item')}>
                        <Link to="/" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                            <span className={cx('nav-title')}>Kai Sneaker</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/dashboard" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faDashboard} />
                            </span>
                            <span className={cx('nav-title')}>Dashboard</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/brand" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faBarChart} />
                            </span>
                            <span className={cx('nav-title')}>Thương hiệu</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/products" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faBoxOpen} />
                            </span>
                            <span className={cx('nav-title')}>Sản phẩm</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/bill" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                            </span>
                            <span className={cx('nav-title')}>Hóa đơn</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/slider" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faSliders} />
                            </span>
                            <span className={cx('nav-title')}>Slider</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link to="/admin/stock" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faBoxesStacked} />
                            </span>
                            <span className={cx('nav-title')}>Kho</span>
                        </Link>
                    </li>
                    <li className={cx('nav-item')} onClick={logOut}>
                        <Link to="/" className={cx('nav-item-link')}>
                            <span className={cx('nav-icon')}>
                                <FontAwesomeIcon icon={faSignOut} />
                            </span>
                            <span className={cx('nav-title')}>Đăng xuất</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('content', 'col', 'l-9', statusMenu ? 'active' : '')}>
                <div className={cx('topbar')}>
                    <div className={cx('toggle')} onClick={handleToggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>

                    <div className={cx('user')}>
                        <Image className={cx('user-img')} src="" alt="" />
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};

export default SidebarAdmin;
