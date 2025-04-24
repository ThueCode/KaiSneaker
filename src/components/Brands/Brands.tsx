import classNames from 'classnames/bind';
import styles from './brands.module.scss';
import Image from '~/components/Image/Image';
import { useState, useEffect } from 'react';
import { fetchAllBrand } from '~/service/api';
import { Brand } from '~/models/Brand';
// import axios from 'axios';

const cx = classNames.bind(styles);

const Brands = () => {
    const [brandData, setBrandData] = useState<Brand[]>([]);
    const getBrand = async () => {
        try {
            await fetchAllBrand()
                .then((res) => {
                    return res.data.result;

                }).then((data) => setBrandData(data))
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBrand()
    }, []);

    return (
        <div className={cx('brand', 'row')}>
            <div className={cx('col', 'l-12', 'brand_item')}>
                {brandData.map((brand) => (
                    <Image
                        src={brand.imageBrand}
                        alt={brand.brandName}
                        key={brand.idBrand}
                        className={cx('brand_item-logo')}
                    />
                ))}
                {brandData.map((brand) => (
                    <Image
                        src={brand.imageBrand}
                        alt={brand.brandName}
                        key={brand.idBrand}
                        className={cx('brand_item-logo')}
                    />
                ))}

            </div>
        </div>
    );
};

export default Brands;
