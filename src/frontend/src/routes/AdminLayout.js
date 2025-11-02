import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Admin/Header";
import Navbar from "../components/Admin/Navbar";
import Category from "../pages/Admin/Category";
import Customer from "../pages/Admin/Customer";
import Dashboard from "../pages/Admin/Dashboard";
import Order from "../pages/Admin/OrderAdmin";
import ProductAdmin from "../pages/Admin/ProductAdmin";
import Profile from "../pages/Admin/Profile";
import Setting from "../pages/Admin/Setting";
import Staff from "../pages/Admin/Staff";
import ProductViewAdmin from "../pages/Admin/ProductViewAdmin"
import NoPage from "../pages/NoPage";
import OrderViewAdmin from "../pages/Admin/OrderViewAdmin";
import CustomerViewAdmin from "../pages/Admin/CustomerViewAdmin";
import Backdropp from "../components/Backdropp";
import { getAllProduct } from '../redux/product/productsSlice'
import { getAllCategory } from "../redux/category/categorySlice";
import AlertMessage from "../components/AlertMessage"
import { getAllOrders } from "../redux/order/orderSlice";
import { getAllCustomers } from "../redux/user/customerSlice";
import { getAllUsers } from "../redux/user/staffSlice";


const AdminLayout = () => {
  
  const user = useSelector(state => state.userState.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProduct())
    dispatch(getAllCategory())
    dispatch(getAllOrders())
    dispatch(getAllCustomers())
    dispatch(getAllUsers())
  }, [])
  useEffect(() => {

    if (user) {
      if (user.role === "customer")
        navigate("/")
    }
  }, [user]);
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <div className="content">
        <div className="content-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<ProductAdmin />} />
            <Route path="/product/:slug" element={<ProductViewAdmin />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/:id" element={<CustomerViewAdmin />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/category" element={<Category />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderViewAdmin />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </div>
      </div>
      <AlertMessage />
      <Backdropp />
    </React.Fragment>
  )
}

export default AdminLayout;
