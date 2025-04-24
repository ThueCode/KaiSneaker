import classNames from 'classnames/bind';
import styles from './products.module.scss';
import { NumericFormat } from 'react-number-format';
import { Link, useNavigate } from 'react-router-dom';
import Image from '~/components/Image/Image';
import { useEffect, useState } from 'react';
import { Product } from '~/models/Product';
// import { useCookies } from 'react-cookie';


const cx = classNames.bind(styles);

// Định nghĩa type cho props
interface ProductsProps {
    featured?: boolean;
    item: Product;
}

const Products: React.FC<ProductsProps> = ({ featured, item }) => {
    // const [imgProducts, setImgProducts] = useState<ImgProducts>({});
    // const [stateCart, dispatchCart] = useReducer(shoppingCartReducer, initStateShoppingCart);
    // const [cookies, setCookies] = useCookies(['name']);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (cookies.name) {
    //         dispatchCart(setIDAccount(cookies.name.ID));
    //     }
    //     dispatchCart(setShoesID(id));
    //     axios
    //         .post('http://26.17.209.162/api/stock/post', {
    //             type: 'getsize',
    //             data: { SHOESID: id },
    //         })
    //         .then((res) => dispatchCart(setIDSize(res.data[0].IDSIZE)));

    //     axios
    //         .post('http://26.17.209.162/api/image/post', {
    //             type: 'get',
    //             data: { IMAGEID: imgID },
    //         })
    //         .then(async (res) => setImgProducts(res.data[0]));
    // }, []);

    return (
        <div className={cx('card', featured ? 'featured' : '')}>
            <Link
                to={`/sneaker/${item?.shoesId}`}
                state={{
                    data: {
                        item
                    },
                }}
            >
                <div className={cx('product')}>
                    <Image
                        src={item?.shoesImg[0]}
                        alt={item?.shoesName}
                        className={cx('product-img')}
                    />
                </div>
            </Link>
            <div className={cx('content')}>
                <h3 className={cx('name')}>{item?.shoesName}</h3>
                <p className={cx('price')}>
                    <span>Giá : </span>
                    <NumericFormat value={item?.shoesPrice} displayType="text" thousandSeparator suffix="đ" />
                </p>
                <Link
                    to={`/sneaker/${item?.shoesId}`}
                    state={{
                        data: {
                            item
                        },
                    }}
                    className={cx('buy')}
                >
                    Mua Ngay
                </Link>
            </div>
        </div>
    );
};

export default Products;
