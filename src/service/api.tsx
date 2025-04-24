import { UUID } from "crypto";
import axios from "./axios.customize";
// BRAND
interface BrandDTO {
    brandName: string,
    descriptionBrand: string,
    imageBrand: string
}

const fetchAllBrand = () => {
    const URL_BACKEND = "/brand"
    return axios.get(URL_BACKEND)
}

const updateBrand = (idBrand: UUID, data: BrandDTO) => {
    const URL_BACKEND = `/brand/${idBrand}`
    return axios.put(URL_BACKEND, data)
}

const createBrand = (data: BrandDTO) => {
    const URL_BACKEND = `/brand`
    return axios.post(URL_BACKEND, data)
}

const deleteBrand = (idBrand: UUID) => {
    const URL_BACKEND = `/brand/${idBrand}`
    return axios.delete(URL_BACKEND)
}
// Exit BRAND

// SLIDE

const fetchAllSlide = () => {
    const URL_BACKEND = "/slider"
    return axios.get(URL_BACKEND)
}
// Exit Slide

// Product

export interface ProductDTO {
    shoesName: string,
    shoesPrice: number,
    shoesDescription: string,
    shoesImg: string[],
    brand: {
        idBrand: UUID
    }
}

const fetchAllProduct = () => {
    const URL_BACKEND = "/products"
    return axios.get(URL_BACKEND)
}

const fetchProductByName = (keySearch: string) => {
    const URL_BACKEND = `/products/search/${keySearch}`
    return axios.get(URL_BACKEND)
}

const deleteProduct = (idProduct: UUID) => {
    const URL_BACKEND = `products/${idProduct}`;
    return axios.delete(URL_BACKEND)
}

const createProduct = (data: ProductDTO) => {
    const URL_BACKEND = `/products`
    return axios.post(URL_BACKEND, data)
}

const updateProduct = (idProduct: UUID, data: ProductDTO) => {
    const URL_BACKEND = `/products/${idProduct}`
    return axios.put(URL_BACKEND, data)
}


// SIZE
const fetchAllSize = () => {
    const URL_BACKEND = "/size"
    return axios.get(URL_BACKEND)
}

// END SIZE


//STOCK


export interface StockDTO {
    productId: UUID;
    sizeId: UUID;
    quantityInStock: number;
}

const fetchAllStock = () => {
    const URL_BACKEND = "/stock"
    return axios.get(URL_BACKEND)
}

const fetchStockByProduct = (idProduct: UUID) => {
    const URL_BACKEND = `/stock/product/${idProduct}`
    return axios.get(URL_BACKEND)
}


const createStock = (data: StockDTO) => {
    const URL_BACKEND = "/stock"
    return axios.post(URL_BACKEND, data)
}

const deleteStock = (idStock: UUID) => {
    const URL_BACKEND = `/stock/${idStock}`
    return axios.delete(URL_BACKEND)
}

const updateStock = (idStock: UUID, data: StockDTO) => {
    const URL_BACKEND = `/stock/${idStock}`;
    return axios.put(URL_BACKEND, data)
}

// END STOCK

export {
    fetchAllBrand, updateBrand, createBrand, deleteBrand,

    fetchAllSlide,

    fetchAllProduct, fetchProductByName, createProduct, deleteProduct, updateProduct,

    fetchAllSize,

    fetchAllStock, createStock, updateStock, deleteStock, fetchStockByProduct
}