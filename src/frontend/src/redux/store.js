import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./product-modal/productModalSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";
import loginSlice from "./login-sign_modal/loginSlice";
import signSlice from "./login-sign_modal/signSlice";
import alertMessage from "./alert-message/alertMessage";
import productsSlice from "./product/productsSlice";
import userState from "./user/userState";
import accessoriesSlice from "./product/accessoriesSlice";
import clothesSlice from "./product/clothesSlice";
import saleSlice from "./product/saleSlice";
import categorySlice from "./category/categorySlice";
import loadingSlice from "./loading/loadingSlice";
import orderSlice from "./order/orderSlice";
import customerSlice from "./user/customerSlice";
import staffSlice from "./user/staffSlice";

export const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartItems: cartItemsSlice,
        loginModal: loginSlice,
        signModal: signSlice,
        alertMessage: alertMessage,
        productsSlice: productsSlice,
        userState: userState,
        accessoriesSlice: accessoriesSlice,
        clothesSlice: clothesSlice,
        saleSlice: saleSlice,
        categorySlice: categorySlice,
        loading: loadingSlice,
        orderSlice: orderSlice,
        customerSlice: customerSlice,
        staffSlice: staffSlice

    },
    devTools: true
})