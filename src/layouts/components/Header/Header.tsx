import Tippy from '@tippyjs/react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import images from '~/assets/images';
import Image from '~/components/Image/Image';
import Menu from '~/components/Popper/Menu/Menu';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faSignIn} />,
        title: 'Đăng nhập',
        to: '/login',
    },
];
const Header = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(['name']);
    const [countShopping, setCountShopping] = useState([]);
    const [accountData, setAccountData] = useState([]);
    const [cookies, setCookie] = useState("");
    // const debounced = useDebounce(countShopping, 500);

    // const removeCK = () => {
    //     removeCookie('name');
    //     window.location.reload();
    // };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            // title: cookies.name
            //     ? cookies.name.STATUS === 'e3afed0047b08059d0fada10f400c1e5'
            //         ? 'Đi tới trang Admin'
            //         : 'Thông tin tài khoản'
            //     : '',
            // to: cookies.name
            //     ? cookies.name.STATUS === 'e3afed0047b08059d0fada10f400c1e5'
            //         ? `${config.routes.admin}`
            //         : `/@${cookies.name.ID}`
            //     : '',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
            to: '/',
            // onClick: removeCK,
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
                {/* {cookies.name ? (
                    <>
                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                            <Link
                                to={cookies.name ? `/@${cookies.name.ID}/shopping-cart` : ''}
                                className={cx('action-btn')}
                            >
                                <FontAwesomeIcon icon={faBagShopping} />
                                <span className={cx('badge')}>{countShopping.length}</span>
                            </Link>
                        </Tippy>
                    </>
                ) : (
                    <></>
                )} */}
                <Menu
                    // items={cookies.name ? userMenu : MENU_ITEMS}
                    items={MENU_ITEMS}
                >
                    {/* {cookies.name ? (
                        <Image
                            className={cx('user-avatar')}
                            src={accountData.IMAGEUSER !== null ? accountData.IMAGEUSER : ''}
                            alt={accountData.FULLNAME}
                        />
                    ) : (
                        <Button className={cx('account-btn')}>
                            <FontAwesomeIcon icon={faUser} />
                        </Button>
                    )} */}

                    <Button className={cx('account-btn')}>
                        <FontAwesomeIcon icon={faUser} />
                    </Button>
                </Menu>
            </div>
        </header>
    )
}

export default Header