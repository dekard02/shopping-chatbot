import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const getAllCustomers = createAsyncThunk(
    'user/getAllCustomers',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/user/get-all-customer`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        value: []
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            state.value = action.payload
        })
      
    }
})
export const { } = customerSlice.actions
export default customerSlice.reducer