import Tippy from '@tippyjs/react';

import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image/Image';
import Menu from '~/components/Popper/Menu/Menu';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { use, useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import getUserFromToken, { JwtPayload } from '~/utils/getUserFromToken';
import { useAuth } from '~/context/AuthContext';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faSignIn} />,
        title: 'Đăng nhập',
        to: '/login',
    },
];
const Header = () => {
    const [countShopping, setCountShopping] = useState([]);

    const { logout, isAuthenticated } = useAuth();
    const [userData, setUserData] = useState<JwtPayload>({});
    const navigate = useNavigate();
    // const debounced = useDebounce(countShopping, 500);

    const removeCookie = () => {
        logout();
        toast.success('Đăng xuất thành công!');
        navigate('/');
    };

    useEffect(() => {
        if (isAuthenticated) {
            setUserData(getUserFromToken() || {})
        } else {
            setUserData({})
        }
    }, [isAuthenticated])

    console.log(userData);


    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: userData?.role === "ADMIN"
                ? 'Đi tới trang Admin'
                : 'Thông tin tài khoản',
            to: userData?.role === "ADMIN"
                ? `admin/dashboard`
                : `/@${userData?.idAccount}`,

        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
            to: '/',
            onClick: removeCookie,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <Link to="/" className={cx('logo_box')}>
                <Image src={images.logo} className={cx('logo')} />
            </Link>
            <Navbar />
            <div className={cx('actions')}>
                <Search />
                {isAuthenticated ? (
                    <Tippy content="Giỏ hàng" placement="bottom-start">
                        <Link
                            to={userData ? `/@${userData.idAccount}/shopping-cart` : ''}
                            className={cx('action-btn')}
                        >
                            <FontAwesomeIcon icon={faBagShopping} />
                            <span className={cx('badge')}>{countShopping.length}</span>
                        </Link>
                    </Tippy>
                ) : (
                    <></>
                )}
                <Menu
                    items={isAuthenticated ? userMenu : MENU_ITEMS}
                >
                    {isAuthenticated ? (
                        <Image
                            className={cx('user-avatar')}
                            src={userData.imageUser || ""}
                            alt={userData.fullName}
                        />
                    ) : (
                        <Button className={cx('account-btn')}>
                            <FontAwesomeIcon icon={faUser} />
                        </Button>
                    )}
                </Menu>
            </div>
        </header>
    )
}

export default Header