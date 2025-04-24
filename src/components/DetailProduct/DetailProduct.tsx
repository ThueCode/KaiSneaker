// import Breadcrumbs from '~/components/Breadcrumbs';
import { useState, useRef, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from '~/components/Image/Image';
import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Product } from '~/models/Product';
import { fetchStockByProduct } from '~/service/api';
import { UUID } from 'crypto';
import { Size } from '~/models/Size';

const cx = classNames.bind(styles);

const DetailProduct = () => {
    // const [cookies, setCookie] = useCookies(['name']);
    const [sizeData, setSizeData] = useState([]);
    // const [stateShopping, dispatchShopping] = useReducer(shoppingCartReducer, initStateShoppingCart);
    const [productData, setProductData] = useState<Product>({
        shoesId: "-----",
        shoesName: "string",
        shoesPrice: 0,
        shoesDescription: "",
        shoesImg: [],
        brand: {
            idBrand: "----",
            brandName: "",
            descriptionBrand: "",
            imageBrand: ""
        }
    });
    const [quantity, setQuantityData] = useState(1);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (location.state?.data?.item) {
            setProductData(location.state?.data?.item)
            getSize(location.state?.data?.item?.shoesId);
        }
    }, [location.state?.data?.item])

    const getSize = async (shoesId: UUID) => {
        try {
            await fetchStockByProduct(shoesId)
                .then((res) => {
                    if (res.data?.success) {
                        setSizeData(res.data.result);
                        // dispatchShopping(setIDSize(res.data[0].IDSIZE));
                    }
                });
        } catch (error) {

        }
    };

    useEffect(() => {
        // try {
        //     // if (cookies.name) {
        //     //     dispatchShopping(setIDAccount(cookies.name.ID));
        //     // }
        //     // dispatchShopping(setShoesID(location.state.data.SHOESID));

        // } catch (error) {
        //     console.log(error);
        // }
    }, []);

    const quantityUp = () => {
        // sizeData.filter((product) => {
        //     if (stateShopping.IDSIZE === product.IDSIZE) {
        //         if (stateShopping.QUANTITY < product.QUANTITYINSTOCK) {
        //             dispatchShopping(setQuantityUP());
        //             setQuantityData(quantity + 1);
        //         }
        //     }
        // });
        setQuantityData(quantity + 1);

    };

    const quantityDown = () => {
        if (quantity > 1) {
            // dispatchShopping(setQuantityDown());
            setQuantityData(quantity - 1);
        }
    };
    const createMarkup = () => {
        return {
            __html: productData?.shoesDescription
        };
    }

    // const handleShoppingCart = () => {
    //     try {
    //         if (cookies.name) {
    //             axios
    //                 .post('http://26.17.209.162/api/shoppingcart/post', {
    //                     type: 'create',
    //                     data: stateShopping,
    //                 })
    //                 .then(async (res) => {
    //                     if (res.data == 1) {
    //                         alert('Thêm vào giỏ hàng thành công!!');
    //                     } else if (res.data == -1) {
    //                         alert('Sản phẩm đã tồn tại trong giỏ hàng!!');
    //                     }
    //                 });
    //         } else {
    //             navigate('/login');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleBuyNow = () => {
    //     if (cookies.name) {
    //         handleShoppingCart();
    //         navigate(`/@${cookies.name.ID}/shopping-cart`);
    //     } else {
    //         navigate('/login');
    //     }
    // };

    console.log(sizeData);

    return (
        <div className="grid wide">
            <div className="row">
                {/* <Breadcrumbs /> */}
                <div className={cx('slide-container', 'col', 'l-5')}>
                    <Fade>
                        {productData?.shoesImg
                            .map((img) => {
                                return (
                                    <div className="each-fade" key={productData?.shoesId}>
                                        <div className={cx('image-container')}>
                                            <Image
                                                className={cx('fill')}
                                                src={img}
                                                alt={productData.shoesName}
                                            />
                                        </div>
                                    </div>

                                );
                            })}
                    </Fade>
                </div>
                <div className={cx('col', 'l-7', 'info')}>
                    <h2 className={cx('info-heading')}>{productData?.shoesName}</h2>
                    <p className={cx('brand')}>{productData?.brand?.brandName}</p>
                    <p className={cx('info-money')}>
                        <span>Giá : </span>
                        <NumericFormat
                            value={productData?.shoesPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                        />
                    </p>

                    <div className={cx('options')}>
                        <div className={cx('size')}>
                            <label className={cx('size_heading')}>Size</label>
                            <select
                                className={cx('size_option')}
                                onChange={(e) => {
                                    // dispatchShopping(setIDSize(e.target.value));
                                    setQuantityData(1);
                                    // dispatchShopping(setQuantity());
                                }}
                            >

                                {sizeData ? (
                                    sizeData.map((size: Size, index) => {
                                        return (
                                            <option
                                                value={size?.idSize}
                                                key={size?.idSize || index}
                                                disabled={size?.quantityInStock === 0}
                                            >
                                                {size?.sizeVi}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </select>
                        </div>
                        <div className={cx('info_quantity')}>
                            <span className={cx('minus')}
                                onClick={quantityDown}
                            >
                                -
                            </span>
                            <span className={cx('num')}>{quantity < 10 ? '0' + quantity : quantity}</span>
                            <span className={cx('plus')}
                                onClick={quantityUp}
                            >
                                +
                            </span>
                        </div>
                    </div>

                    <div className={cx('info-btn')}>
                        <button className={cx('info-btn-bag')}
                        // onClick={handleShoppingCart}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button className={cx('info-btn-buy')}
                        // onClick={handleBuyNow}
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('row', 'description')}>
                <div className={cx('col', 'l-12', 'describe')}>
                    <h2 className={cx('describe_heading')}>Mô tả sản phẩm</h2>
                    <div className={cx('describe_content')}>
                        <h3 className={cx('describe_content-name')}>{productData?.shoesName}</h3>
                        <div className={cx('describe_content-summary')}>
                            <h3 className={cx('describe_content-summary-heading')}>Sơ lược sản phẩm</h3>
                            <p
                                className={cx('describe_content-summary-content')}
                                dangerouslySetInnerHTML={createMarkup()}
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
