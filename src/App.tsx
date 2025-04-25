import { Route, Routes } from "react-router"
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout"
import HomePage from "./page/Home/HomePage"
import Sneaker from "./page/Sneaker/Sneaker"
import DefaultWithSidebar from "./layouts/DefaultWithSidebar/DefaultWithSideBar"
import DetailProduct from "./components/DetailProduct/DetailProduct"
import { useEffect, useState } from "react"
import BrandSneaker from "./page/Sneaker/BrandSneaker/BrandSneaker"
import Login from "./layouts/Login/Login"
import SignIn from "./components/SignIn/SignIn"
import Admin from "./layouts/Admin/Admin"
import Dashboard from "./components/Dashboard/Dashboard"
import AdminBill from "./components/AdminBill/AdminBill"
import AdminSlider from "./components/AdminSlider/AdminSlider"
import AdminProduct from "./components/AdminProduct/AdminProduct"
import AdminStock from "./components/AdminStock/AdminStock"
import CategoryAdmin from "./components/CategoryAdmin/CategoryAdmin"
import AddProduct from "./components/AddProduct/AddProduct"
import UpdateBrand from "./components/UpdateBrand/UpdateBrand"
import { fetchAllBrand } from "./service/api"
import { Brand } from "./models/Brand"
import { useAuth } from "./context/AuthContext"
import UpdateSlider from "./components/UpdateSlider/UpdateSlider"

const App = () => {

  const isAuth = useAuth();
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
    <>
      <Routes>

        {/* Public */}
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/sneaker" element={<DefaultWithSidebar />}>
            <Route path="" element={<Sneaker />} />
            {brandData.map((brandData) => {
              return (
                <>
                  <Route path={`${brandData.brandName}`} element={<BrandSneaker brandName={brandData.brandName} />} />
                </>
              )
            })}
          </Route>
          <Route path="/sneaker/:product" element={<DetailProduct />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bill" element={<AdminBill />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="brand" element={<CategoryAdmin />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="products/new-item" element={<AddProduct />} />
          <Route path="products/:product" element={<AddProduct />} />
          <Route path="brand/:id" element={<UpdateBrand />} />

          <Route path="slider" element={<AdminSlider />} />
          <Route path="slider/:id" element={<UpdateSlider />} />
        </Route>

        {/* LOGIN */}
        {!isAuth.isAuthenticated &&
          <Route path="/login" element={<Login />}>
            <Route path="" element={<SignIn />} />
          </Route>
        }

      </Routes>
    </>
  )
}

export default App
