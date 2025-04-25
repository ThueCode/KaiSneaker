import classNames from 'classnames/bind';
import styles from './categoryAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Button from '~/components/Button/Button';
import Image from '~/components/Image/Image';
import { createBrand, deleteBrand, fetchAllBrand } from '~/service/api';
import { Brand } from '~/models/Brand';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
interface BrandDTO {
    idBrand: string,
    brandName: string,
    descriptionBrand: string,
    imageBrand: string
}
const CategoryAdmin = () => {
    //check null
    const initVal = {
        brandName: '',
    }
    interface ErrorType {
        brandName?: string;
    }
    const [formVal, setFormVal] = useState(initVal);
    const [formErr, setFormErr] = useState<ErrorType>({});
    const [isSubmit, setSubmit] = useState(false);
    const [isContainerActive, uploadImagesetIsContainerActive] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [stateBrand, setStateBrand] = useState<BrandDTO>({
        idBrand: '',
        brandName: '',
        descriptionBrand: '',
        imageBrand: ''
    });
    const validate = (values: any) => {
        const errs: ErrorType = {};
        if (!values.brandName) {
            errs.brandName = "Không được bỏ trống tên thương hiệu"
        }
        return errs
    };
    //---------------------------

    const [brandData, setBrandData] = useState<Brand[]>([]);

    // Begin : Tickets
    const showBuyTickets = () => {
        // add class open vào hàm open đã viết bên CSS
        setStatusModal(true);
    };

    // ẩn
    const hideBuyTickets = () => {
        // remove class open vào hàm open đã viết bên CSS
        setStatusModal(false);
    };
    // End : Tickets
    const dummyBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
    useEffect(() => {
        const mockData: Brand[] = [
            {
                idBrand: "123-1231313-12-121-23131",
                brandName: "Apple",
                descriptionBrand: "Thương hiệu công nghệ nổi tiếng toàn cầu.",
                imageBrand: dummyBase64,
            },
            {
                idBrand:"123-1231313-12-121-23131",
                brandName: "Samsung",
                descriptionBrand: "Hãng điện tử lớn đến từ Hàn Quốc.",
                imageBrand: dummyBase64,
            },
            {
                idBrand:"123-1231313-12-121-23131",
                brandName: "Sony",
                descriptionBrand: "Thương hiệu nổi tiếng với thiết bị âm thanh và hình ảnh.",
                imageBrand: dummyBase64,
            },
        ];

        setBrandData(mockData);
        getCourses();
        if (Object.keys(formErr).length === 0 && isSubmit) {
            //
        }
    }, []);

    const getCourses = async () => {
        try {
            await fetchAllBrand()
                .then((res) => {
                    return res.data.result;

                }).then((data) => setBrandData(data))
        } catch (error) {
            console.error(error);
        }
    };
    //handChange
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormVal({
            ...formVal, [name]
                : value
        });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmitNewBrand(
            stateBrand
        );
        setFormErr(validate(formVal));
        setSubmit(true);

    };

    const handleSubmitNewBrand = (data: BrandDTO) => {
        try {
            createBrand(data)
                .then((res) => {
                    if (res.data?.success) {
                        toast.success('Thêm thương hiệu thành công');
                        setStatusModal(false);
                        getCourses();
                    } else {
                        toast.error('Thêm thương hiệu thất bại');
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitDeleteBrand = async (item: Brand) => {

        // try {
        //     if (window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này không?')) {
        //         await deleteBrand(item.idBrand)
        //             .then((res) => {
        //                 if (res.data?.success) {
        //                     toast.success('Xóa thương hiệu thành công');
        //                     getCourses();
        //                 } else {
        //                     toast.error('Xóa thương hiệu thất bại');
        //                 }
        //             });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    // Convert input sang base 64
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await convertBase64(file);
            setStateBrand((prev) => ({
                ...prev,
                imageBrand: base64 as string,
            }));
        } catch (error) {
            console.error("Error converting image:", error);
        }
    };

    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className={cx('wrapper')}>
            {/* <!-- Begin adminCategoriesTable --> */}
            <div className={cx('category-header')}>
                <h2 className={cx('category-heading')}>Danh sách thương hiệu</h2>
                <button className={cx('category-create-btn')} onClick={showBuyTickets}>
                    Thêm mới
                </button>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>Tên Thương hiệu</td>
                        <td className={cx('details-title-item')}>Ảnh Thương hiệu</td>
                        <td className={cx('details-title-item')}>Mô tả</td>
                        <td className={cx('details-title-item')}>Hành động</td>
                    </tr>
                </thead>
                <tbody className={cx('details-tbody')} >
                    {brandData.length > 0 ?
                        brandData.map((item) => {
                            return (

                                <tr className={cx('details-content-list')} key={item.idBrand}>
                                    <td className={cx('details-content-item')}>{item.brandName}</td>
                                    <td className={cx('details-content-item')}>
                                        <Image
                                            className={cx('details-content-item-img')}
                                            src={item?.imageBrand ? item.imageBrand : ''}
                                        ></Image>
                                    </td>
                                    <td className={cx('details-content-item', 'details-content-item--maxwith')}>
                                        <span>{item.descriptionBrand}</span>
                                    </td>
                                    <td className={cx('details-content-item')}>
                                        <Button
                                            to={`/admin/brand/${item.brandName}`}
                                            state={{ data: item }}
                                            className={cx('details-content-item-btn')}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            className={cx('details-content-item-btn')}
                                            onClick={() => handleSubmitDeleteBrand(item)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>

                                </tr>
                            );
                        })
                        :
                        <tr className={cx('details-content-list')}>


                            <td className={cx('details-content-item')} colSpan={4} style={{ paddingTop: '20px' }}>
                                <h3>Không có dữ liệu</h3>
                            </td>
                        </tr>
                    }
                </tbody>

            </table>
            {/* <!-- End adminCategoriesTable --> */}
            {/* <!--Begin Modal --> */}
            <div
                className={cx('modal', statusModal ? 'open' : '')}
                // lắng nge ra ngoài ; khi click vào khoảng không của modal
                // (ở ngoài cái ticket) sẽ ĐÓNG ticket lại
                // modal.addEventListener('click', hideBuyTickets);
                onClick={hideBuyTickets}
            >
                <div
                    className={cx('modal-papes')}
                    // ngừng việc nỗi bọt lại;  sẽ không đóng modal container lại nửa (tới đó nó bị công an chặn lại)
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal__heading')}>Thêm thương hiệu</h2>
                        <FontAwesomeIcon
                            className={cx('modal-header-icon--close')}
                            // nge hành vi click vào button close
                            onClick={hideBuyTickets}
                            icon={faXmark}
                        />
                    </div>
                    <form className={cx('category-list')}
                        onSubmit={handleSubmit}
                    >
                        <div className={cx('product_img')}>
                            <div className={cx('img_item')}>
                                <div className={cx('file_upload')}>
                                    <input
                                        className={cx('upload')}
                                        type="file"
                                        disabled={stateBrand?.imageBrand ? true : false}
                                        onChange={(e) => uploadImage(e)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                        className={cx(stateBrand?.imageBrand ? 'fadeout' : '')}
                                    ></FontAwesomeIcon>
                                    <div className={cx('img_box',
                                        stateBrand?.imageBrand ? 'fadein' : ''
                                    )}>
                                        <img
                                            alt={stateBrand?.brandName ? stateBrand.brandName : ''}
                                            className={cx('img')}
                                            src={stateBrand?.imageBrand ? stateBrand.imageBrand : ''}
                                        />
                                        <div className={cx('delete_box',
                                            stateBrand?.imageBrand ? 'active' : ''
                                        )}>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className={cx('btn_delete')}
                                                onClick={() => setStateBrand({ ...stateBrand, imageBrand: "" })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label htmlFor="" className={cx('input-label')}>
                            Tên thương hiệu <b>*</b>
                        </label>
                        <input
                            className={cx('input-item')}
                            type="text"
                            // required
                            value={formVal.brandName}
                            name='brandName'
                            onChange={(e) => {
                                handleChange(e);
                                setStateBrand({ ...stateBrand, brandName: e.target.value })
                            }}
                        />
                        <p style={{ color: "red" }}>{formErr.brandName}</p>
                        <label htmlFor="" className={cx('input-label')}>
                            Mô tả thương hiệu
                        </label>
                        <textarea
                            className={cx('input-item-description')}
                            cols={54}
                            rows={10}
                            onChange={(e) => setStateBrand({ ...stateBrand, descriptionBrand: e.target.value })}
                        />
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* <!--End Modal --> */}
        </div>
    );
}

export default CategoryAdmin;
