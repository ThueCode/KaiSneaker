import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './signIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { useState, useReducer, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const SignIn = () => {

    const initialValues = {
        username: "",
        repassword: "",
        password: "",
        SignUpusername: "",
        SignUprepassword: "",
        SignUppassword: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<ErrorType>({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    interface ErrorType {
        username?: string;
        password?: string;
        SignUpusername?: string;
        SignUppassword?: string;
        SignUprepassword?: string;

    }
    const validate = (values: any) => {
        const errors: ErrorType = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //check email
        //check không bỏ trống
        if (!values.username) {
            errors.username = "Vui lòng nhập tên tài khoản!";
        }
        if (!values.password) {
            errors.password = "Vui lòng nhập mật khẩu";
        } else if (values.password.length < 4) {
            errors.password = "Mật Khẩu không được ít hơn 4 ký tự";
        } else if (values.password.length > 18) {
            errors.password = "Mật khẩu không dài quá 18 ký tự";
        }else{
            //check đăng nhập
        }
        //
        if (!values.SignUpusername) {
            errors.SignUpusername = "Vui lòng nhập tên tài khoản!";
        }
        if (!values.SignUppassword) {
            errors.SignUppassword = "Vui lòng nhập mật khẩu";
        } else if (values.SignUppassword.length < 4) {
            errors.SignUppassword = "Mật Khẩu không được ít hơn 4 ký tự";
        } else if (values.SignUppassword.length > 18) {
            errors.SignUppassword = "Mật khẩu không dài quá 18 ký tự";
        }
        if (!values.SignUprepassword) {
            errors.SignUprepassword = "Vui lòng nhập mật khẩu1";
        } else if (values.SignUprepassword.length < 4) {
            errors.SignUprepassword = "Mật Khẩu không được ít hơn 4 ký tự1";
        } else if (values.SignUprepassword.length > 10) {
            errors.SignUprepassword = "Mật khẩu không dài quá 18 ký tự1";
        } else {
            if (values.SignUppassword == values.SignUprepassword) {
                //đăng ký
                
            } else {
                errors.SignUppassword = "Mật khẩu phải giống nhau!";
                errors.SignUprepassword = "Mật khẩu phải giống nhau!";
            }
        }
        return errors;
    };
    const [isContainerActive, setIsContainerActive] = useState(false);
    let navigate = useNavigate();

    // console.log(cookies);
    const signUpButton = () => {
        setIsContainerActive(true);
    };
    const signInButton = () => {
        setIsContainerActive(false);
    };

    // Login


    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    return (
        <div className={cx('login')}>
            {/* <!-- Begin Trigger --> */}
            <Link to="/" className={cx('logo')} data-target="#login" data-toggle="modal">
                <img src={images.logo} alt="" className={cx('logo_img')} />
            </Link>
            <div className={cx('wrapper', `${isContainerActive ? 'right-panel-active' : ''}`)}>
                <div className={cx('inner', 'sign_up')}>
                    <form action="#" className={cx('morri-container')}
                        onSubmit={handleSubmit}
                    >
                        <h1 className={cx('heading')}>Tạo tài khoản</h1>
                        <div className={cx('social')}>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                        </div>
                        <span className={cx('subcontent')}>hoặc sử dụng email của bạn để đăng ký</span>
                        <input
                            type="text"
                            placeholder="Tên tài khoản"
                            className={cx('morri_input')}
                            name='SignUpusername'
                            value={formValues.SignUpusername}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <p>{formErrors.SignUpusername}</p>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className={cx('morri_input')}
                            name='SignUppassword'
                            value={formValues.SignUppassword}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <p>{formErrors.SignUppassword}</p>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className={cx('morri_input')}
                            name='SignUprepassword'
                            value={formValues.SignUprepassword}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <p>{formErrors.SignUprepassword}</p>
                        <button type='submit' className={cx('btn')}>Đăng kí</button>
                    </form>
                </div>
                <div className={cx('inner', 'sign_in')}>
                    <form className={cx('morri-container')} onSubmit={handleSubmit}>
                        <h1 className={cx('heading')}>Đăng nhập</h1>
                        <div className={cx('social')}>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                        </div>
                        <span className={cx('subcontent')}>hoặc sử dụng tài khoản của bạn</span>
                        <input
                            type="text"
                            placeholder="Email"
                            className={cx('morri_input')}
                            name='username'
                            value={formValues.username}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <p>{formErrors.username}</p>
                        <input
                            type="password"
                            placeholder="Password"
                            className={cx('morri_input')}
                            name='password'
                            value={formValues.password}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <p>{formErrors.password}</p>
                        <Link to="/langquen" className={cx('forgot')}>
                            Quên mật khẩu?
                        </Link>
                        <button type='submit' className={cx('btn')}>Đăng nhập</button>
                    </form>
                </div>
                <div className={cx('overlay-container')}>
                    <div className={cx('overlay')}>
                        <div className={cx('overlay-panel', 'overlay-left')}>
                            <h1 className={cx('heading')}>Chào mừng trở lại!</h1>
                            <p className={cx('overlay-content')}>
                                Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
                            </p>
                            <button className={cx('btn', 'ghost')} onClick={signInButton} id="signIn">
                                Đăng nhập
                            </button>
                        </div>
                        <div className={cx('overlay-panel', 'overlay-right')}>
                            <h1 className={cx('heading')}>Chào bạn!</h1>
                            <p className={cx('overlay-content')}>
                                Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi
                            </p>
                            <button className={cx('btn', 'ghost')} onClick={signUpButton} id="signUp">
                                Đăng kí
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Trigger --> */}
        </div>
    );
}

export default SignIn;
