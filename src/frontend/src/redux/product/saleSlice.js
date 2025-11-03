import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllSale = createAsyncThunk(
    'product/getAllSale',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/product/sale`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)
export const saleSlice = createSlice({
    name: 'saleSlice',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllSale.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }


})
export default saleSlice.reducer