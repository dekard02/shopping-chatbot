import React, { useEffect } from 'react';
import ProductViewModal from '../components/ProductViewModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import AlertMessage from '../components/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Accessories from '../pages/Accessories';
import Contact from '../pages/Contact';
import Order from '../pages/Order';
import CustomerInfo from '../pages/CustomerInfo';
import Policy from '../pages/Policy';
import NoPage from '../pages/NoPage';
import Backdropp from '../components/Backdropp';
import { getCart } from '../redux/user/userState';
import { getAllSale } from '../redux/product/saleSlice';
import { getAllCategory } from '../redux/category/categorySlice';
import { getAllProduct } from '../redux/product/productsSlice';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useChatbotAssistant } from '../hooks/useChatbotAssistant';

const Layout = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSale());
    dispatch(getAllCategory());
    dispatch(getAllProduct());
    dispatch(getCart());
  }, []);
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
    }
  }, [user]);

  useChatbotAssistant();

  return (
    <CopilotSidebar
      defaultOpen={true}
      instructions={`Bạn đang hỗ trợ người dùng tốt nhất có thể. Hãy trả lời theo cách tốt nhất dựa trên dữ liệu bạn có.
        Bạn có thể giúp khách hàng:
          - Tìm kiếm sản phẩm
          - Hỗ trợ tương tác với website
          - Trả lời các câu hỏi về cửa hàng: chính sách đổi trả, giao hàng, hoàn hàng,...
        `}
      labels={{
        title: 'Trợ lý',
        initial: 'Tôi có thể giúp gì cho bạn?',
      }}
      suggestions={'auto'}
      clickOutsideToClose={false}
      onReloadMessages={() => {}}
      onRegenerate={() => {}}
    >
      <React.Fragment>
        <Header />
        <div className="container">
          <React.Fragment>
            <div className="main">
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/catalog/:slug" element={<Product />}></Route>
                <Route path="/policy/:policy" element={<Policy />}></Route>
                <Route path="/catalog" element={<Catalog />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/accessories" element={<Accessories />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/order" element={<Order />}></Route>
                <Route path="/customer" element={<CustomerInfo />}></Route>
                <Route path="*" element={<NoPage />}></Route>
              </Routes>
            </div>
          </React.Fragment>
        </div>
        <Footer />
        <ProductViewModal />
        <LoginModal />
        <RegisterModal />
        <AlertMessage />
        <Backdropp />
      </React.Fragment>
    </CopilotSidebar>
  );
};

export default Layout;
