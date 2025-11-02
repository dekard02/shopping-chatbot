import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";



export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/product`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)
export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        loading: false,
        value: []
    },
    reducers: {
        updateProduct: (state, action) => {
            const Products = state.value
            const updateProduct = action.payload

            let index = Products.findIndex(item => item.id === updateProduct.id)
            //update
            Products[index] = updateProduct
            state.value = Products
        },
        addProduct: (state, action) => {
            const Products = state.value
            const updateProduct = action.payload

            //add
            Products.push(updateProduct)
            state.value = Products


        },
        deleteProduct: (state, action) => {
            const Products = state.value
            const updateProduct = action.payload

            let index = Products.findIndex(item => item.id === updateProduct.id)
            //delete
            Products.splice(index, 1)
            state.value = Products


        },
        updateProducts: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state, action) => {
            
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }


})
export const { updateProduct, addProduct, deleteProduct, updateProducts } = productsSlice.actions
export default productsSlice.reducer