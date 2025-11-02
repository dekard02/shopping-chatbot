import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/cart/get-all`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        value: []
    },
    reducers: {
        updateOrder: (state, action) => {
            const Orders = state.value
            const updateOrder = action.payload

            let index = Orders.findIndex(item => item.id === updateOrder.id)
            //update
            Orders[index] = updateOrder
            state.value = Orders
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }
})
export const { updateOrder } = orderSlice.actions
export default orderSlice.reducer