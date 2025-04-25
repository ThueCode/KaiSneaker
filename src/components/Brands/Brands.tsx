import classNames from 'classnames/bind';
import styles from './brands.module.scss';
import Image from '~/components/Image/Image';
import { useContext } from 'react';
import { BrandContext } from '~/context/BrandContext';
// import axios from 'axios';

const cx = classNames.bind(styles);

const Brands = () => {
    const brandData = useContext(BrandContext);

    return (
        <div className={cx('brand', 'row')}>
            <div className={cx('col', 'l-12', 'brand_item')}>
                {brandData && brandData.map((brand) => (
                    <Image
                        src={brand.imageBrand}
                        alt={brand.brandName}
                        key={brand.idBrand}
                        className={cx('brand_item-logo')}
                    />
                ))}
                {brandData && brandData.map((brand) => (
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
