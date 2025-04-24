// import Products from '~/components/Products';
import styles from './featured.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Products from '../Products/Products';
// import axios from 'axios';

const cx = classNames.bind(styles);

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ProductItem {
    SHOESID: string;
    SHOESNAME: string;
    SHOESPRICE: number;
    IMAGEID: string;
    IMAGE: string;
    SHOESDESCRIPTION: string;
    BRANDNAME: string;
    TOTAL: number;
}

const Featured = () => {
    const [countProduct, setCountProduct] = useState<ProductItem[]>([{
        "SHOESID": "01JRS9RHR6HD2H1NCV05HBQAWK",
        "SHOESNAME": "Cinnamon Ice Cream",
        "SHOESDESCRIPTION": "Creamy ice cream with a warm cinnamon flavor, perfect for dessert.",
        "BRANDNAME": "Nike",
        "SHOESPRICE": 4.99,
        "IMAGE": "http://dummyimage.com/116x100.png/ff4444/ffffff",
        "IMAGEID": "1",
        "TOTAL": 200
    }, {
        "SHOESID": "01JRS9RJG0GJX8PZWYBRYQD8XP",
        "SHOESNAME": "Vegan Mac & Cheese",
        "SHOESDESCRIPTION": "Creamy vegan mac and cheese made with cashew cheese.",
        "BRANDNAME": "Nike",
        "SHOESPRICE": 8.99,
        "IMAGE": "http://dummyimage.com/167x100.png/5fa2dd/ffffff",
        "IMAGEID": "1",
        "TOTAL": 202

    }, {
        "SHOESID": "01JRS9RJG1EHCGEFH3Q9WV76NZ",
        "SHOESNAME": "Pet Grooming Glove",
        "SHOESDESCRIPTION": "Gentle glove for brushing and massaging your pet.",
        "BRANDNAME": "Nike",
        "SHOESPRICE": 12.99,
        "IMAGE": "http://dummyimage.com/174x100.png/5fa2dd/ffffff",
        "IMAGEID": "1",
        "TOTAL": 205
    }, {
        "SHOESID": "01JRS9RJG107B4T9KXD6MDAT52",
        "SHOESNAME": "Teriyaki Stir-Fry Sauce",
        "SHOESDESCRIPTION": "Savory teriyaki sauce for stir-frying veggies or meats.",
        "BRANDNAME": "MLB",
        "SHOESPRICE": 3.49,
        "IMAGE": "http://dummyimage.com/135x100.png/ff4444/ffffff",
        "IMAGEID": "1",
        "TOTAL": 200
    }, {
        "SHOESID": "01JRS9RJG2AHM2JK6H1ST2VRRA",
        "SHOESNAME": "Carrot Sticks",
        "SHOESDESCRIPTION": "Freshly cut carrot sticks, perfect for snacking.",
        "BRANDNAME": "MLB",
        "SHOESPRICE": 2.49,
        "IMAGE": "http://dummyimage.com/137x100.png/dddddd/000000",
        "IMAGEID": "1",
        "TOTAL": 206
    }, {
        "SHOESID": "01JRS9RJG399N1PERTVYHZQ6GB",
        "SHOESNAME": "Dog Car Seat Cover",
        "SHOESDESCRIPTION": "Waterproof cover to protect car seats from pet hair and dirt.",
        "BRANDNAME": "MLB",
        "SHOESPRICE": 39.99,
        "IMAGE": "http://dummyimage.com/204x100.png/dddddd/000000",
        "IMAGEID": "1",
        "TOTAL": 200
    }, {
        "SHOESID": "01JRS9RJG3QCS6HB4Y1KJWCMSX",
        "SHOESNAME": "Wine Decanter",
        "SHOESDESCRIPTION": "Elegant glass decanter for aerating wine.",
        "BRANDNAME": "MLB",
        "SHOESPRICE": 34.99,
        "IMAGE": "http://dummyimage.com/136x100.png/dddddd/000000",
        "IMAGEID": "1",
        "TOTAL": 200
    }, {
        "SHOESID": "01JRS9RJG4F15MTTYA3S00E7BQ",
        "SHOESNAME": "Crispy Rice Treats",
        "SHOESDESCRIPTION": "Classic marshmallow treats made with crispy rice.",
        "BRANDNAME": "Adidas",
        "SHOESPRICE": 3.5,
        "IMAGE": "http://dummyimage.com/241x100.png/5fa2dd/ffffff",
        "IMAGEID": "1",
        "TOTAL": 199
    }, {
        "SHOESID": "01JRS9RJG4KDXWG802VJMJ9RMT",
        "SHOESNAME": "Mango Chili Salsa",
        "SHOESDESCRIPTION": "A sweet and spicy salsa made with mangoes and a hint of chili, great with chips or grilled chicken.",
        "BRANDNAME": "Adidas",
        "SHOESPRICE": 4.29,
        "IMAGE": "https://www.pngarts.com/files/4/Sneaker-PNG-Image.png",
        "IMAGEID": "1",
        "TOTAL": 500
    }, {
        "SHOESID": "01JRS9RJG5F2FJB1NNNCJ4E2N1",
        "SHOESNAME": "Granola Cereal",
        "SHOESDESCRIPTION": "Crunchy granola with oats, nuts, and honey.",
        "BRANDNAME": "Adidas",
        "SHOESPRICE": 4.49,
        "IMAGE": "http://dummyimage.com/169x100.png/dddddd/000000",
        "IMAGEID": "1",
        "TOTAL": 200
    }]);

    // useEffect(() => {
    //     try {
    //         axios.post('http://26.17.209.162/api/shoes/hotproduct').then((res) => setCountProduct(res.data));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    return (
        <div className={cx('row', 'features')}>
            <h1 className={cx('features_heading', 'col', 'l-12')}>Sản phẩm nổi bật</h1>
            <div className={cx('row', 'item', 'l-12', 'col')}>

                {countProduct &&
                    countProduct
                        .sort((a, b) => b.TOTAL - a.TOTAL)
                        .slice(0, 4)
                        .map((product) => (
                            <div key={product.SHOESID} className={cx('col', 'l-3')}>
                                <Products
                                    id={product.SHOESID}
                                    name={product.SHOESNAME}
                                    price={product.SHOESPRICE}
                                    imgID={product.IMAGEID}
                                    img={product.IMAGE}
                                    description={product.SHOESDESCRIPTION}
                                    brand={product.BRANDNAME}
                                    featured
                                />
                            </div>
                        ))
                }

            </div>
        </div>
    );
};

export default Featured;
