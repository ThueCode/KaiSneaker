import { createContext, useEffect, useState } from "react";
import { Brand } from "~/models/Brand";
import { fetchAllBrand } from "~/service/api";

// 👉 Tạo context để chia sẻ trạng thái đăng nhập
const BrandContext = createContext<Brand[] | undefined>(undefined);

const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

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
        <BrandContext.Provider value={brandData}>
            {children}
        </BrandContext.Provider>
    );
}

export { BrandContext, BrandProvider }