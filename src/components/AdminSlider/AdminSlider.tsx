import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminSlider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useLocation } from 'react-router';

const cx = classNames.bind(styles);
interface SliderDTO {
    slideId: number;
    imageUrl: string;
    description: string;
    order: number;
}
const AdminSlider = () => {

    let location = useLocation();
    const [sliderModal, setSliderModal] = useState(false);
    const [sliderDataState, setSliderDataState] = useState<SliderDTO[]>([]);
    //------ sài ticket
    const showBuyTickets = () => {
        setSliderModal(true);
    }
    const hideBuyTickets = () => {
        setSliderModal(false);
    }
    //------

    // const [stateSlide, dispatchSlide] = useReducer(slideReducer, initStateSlide);
    const [sliderData, setSliderData] = useState<SliderDTO>({
        slideId: 0,
        imageUrl: "",
        description: "",
        order: 0,
    });
    //----------convert base64
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await convertBase64(file);
                setSliderData((prev) => ({
                    ...prev,
                    imageUrl: base64 as string,
                }));
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    }
    // ------fetch data ảo

    const dummyBase64 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // thay bằng base64 thật

    //----------------------
    useEffect(() => {
        // axios.get(`http://26.17.209.162/api/image/get`).then((res) => {
        //     setSliderData(res.data);
        //     dispatchSlide(addSlide(res.data));
        // });
        const mockSliderData: SliderDTO[] = [
            {
                slideId: 1,
                imageUrl: dummyBase64,
                description: "Khuyến mãi hè rực cháy!",
                order: 1,
            },
            {
                slideId: 2,
                imageUrl: dummyBase64,
                description: "Giảm giá lên tới 50%",
                order: 2,
            },
            {
                slideId: 3,
                imageUrl: dummyBase64,
                description: "Hàng mới về cực hot",
                order: 3,
            },
        ];

        setSliderDataState(mockSliderData);
    }, []);

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await handleSubmitSlide({
    //         stateSlide,
    //     });
    // };

    // const handleSubmitSlide = (data) => {
    //     try {
    //         axios
    //             .post('http://26.17.209.162/api/image/post', {
    //                 type: 'update',
    //                 data: stateSlide,
    //             })
    //             .then((res) => {
    //                 if (res.data == 1) {
    //                     alert('Cập nhật Slider thành công');
    //                     window.location.reload();
    //                 } else if (res.data == -1) {
    //                     alert('Cập nhật Slider thất bại');
    //                 }
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const checkChangeSlide = () => {
    //     if (JSON.stringify(sliderData[0]) === JSON.stringify(stateSlide)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h2 className={cx('heading')}>
                        {location.state?.data ? "Cập nhật Slider" : "Thêm Slider"}
                    </h2>
                    <button className={cx('slider-create-btn')} onClick={showBuyTickets}>
                        Thêm mới
                    </button>
                </div>
                <div className={cx('inner')}>
                    {/* <h2 className={cx('heading')}>Chỉnh sửa Slider</h2> */}
                </div>
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>Vị trí ưu tiên</td>
                            <td className={cx('details-title-item')}>Ảnh</td>
                            <td className={cx('details-title-item')}>Hành động</td>
                        </tr>
                    </thead>
                    <tbody className={cx('details-tbody')} >
                        {sliderDataState.length > 0 ?
                            sliderDataState.map((item) => {
                                return (
                                    <tr className={cx('details-content-list')} key={item.order}>
                                        <td className={cx('details-content-item')}>
                                            <div className={cx('details-content-item-priority')}>
                                                {item.order}
                                            </div>
                                        </td>
                                        <td className={cx('details-content-item')}>
                                            <img
                                                className={cx('details-content-item-img')}
                                                src={item?.imageUrl ? item.imageUrl : ''}
                                            ></img>
                                        </td>
                                        <td className={cx('details-content-item')}>
                                            <Button
                                                to={`/admin/slider/${item.slideId}`}
                                                state={{ data: item }}
                                                className={cx('details-content-item-btn')}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                className={cx('details-content-item-btn')}
                                            // onClick={() => handleSubmitDeleteBrand(item)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }) : <></>}
                    </tbody>
                </table>
                {/* <form className={cx('inner_img')}
                    // onSubmit={handleSubmit}
                    >
                        <div className={cx('upload_box')}>
                            <div className={cx('file_upload')}>
                                <input
                                    type="file"
                                    className={cx('upload')}
                                // disabled={stateSlide.IMAGESHOES1}
                                // onChange={(e) => uploadImage(e, setIMG1)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                // className={cx(stateSlide.IMAGESHOES1 ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box',)
                                    // stateSlide.IMAGESHOES1 != '' ? 'fadein' : '')
                                }>
                                    <img alt="" className={cx('img')}
                                    // src={stateSlide.IMAGESHOES1} 
                                    />
                                    <div className={cx('delete_box',)
                                        // stateSlide.IMAGESHOES1 != '' ? 'active' : '')
                                    }>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                        // onClick={(e) => dispatchSlide(deleteImg1())}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={cx('btn_update')}
                        // disabled={checkChangeSlide()}
                        >
                            Update
                        </button>
                    </form> */}
            </div>
            {/* <!-- End adminCategoriesTable --> */}
            {/* <!--Begin Modal --> */}
            <div
                className={cx('modal', sliderModal ? 'open' : '')}
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
                        <h2 className={cx('modal__heading')}>Vui lòng chọn ảnh slider</h2>
                        <FontAwesomeIcon
                            className={cx('modal-header-icon--close')}
                            // nge hành vi click vào button close
                            onClick={hideBuyTickets}
                            icon={faXmark}
                        />
                    </div>
                    <form className={cx('category-list')}
                    // onSubmit={handleSubmit}
                    >
                        <div className={cx('slider_img')}>
                            <div className={cx('img_item')}>
                                <div className={cx('file_upload')}>
                                    <input
                                        className={cx('upload')}
                                        type="file"
                                        disabled={sliderData?.imageUrl ? true : false}
                                        onChange={(e) => uploadImage(e)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                        className={cx(sliderData?.imageUrl ? 'fadeout' : '')}
                                    ></FontAwesomeIcon>
                                    <div className={cx('img_box',
                                        sliderData?.imageUrl ? 'fadein' : ''
                                    )}>
                                        <img
                                            alt={sliderData?.description ? sliderData?.description : ''}
                                            className={cx('img')}
                                            src={sliderData?.imageUrl ? sliderData.imageUrl : ''}
                                        />
                                        <div className={cx('delete_box',
                                            sliderData?.imageUrl ? 'active' : ''
                                        )}>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className={cx('btn_delete')}
                                                onClick={() => setSliderData({ ...sliderData, imageUrl: "" })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* <!--End Modal --> */}
        </>
    );
}

export default AdminSlider;
