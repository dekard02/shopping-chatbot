import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllAccessories = createAsyncThunk(
    'product/getAllAccessories',
    async (data, { rejectWithValue }) => {
        const belt = await axios.get(`${apiUrl}/product/category_slug/that-lung`)
        const umbrella = await axios.get(`${apiUrl}/product/category_slug/o`)
        const hat = await axios.get(`${apiUrl}/product/category_slug/non`)
        const glass = await axios.get(`${apiUrl}/product/category_slug/kinh`)
    
        if (belt.status < 200 || belt.status >= 300) {
            return rejectWithValue(belt.data)
        }
        if (umbrella.status < 200 || umbrella.status >= 300) {
            return rejectWithValue(umbrella.data)
        }
        if (hat.status < 200 || hat.status >= 300) {
            return rejectWithValue(hat.data)
        }
        if (glass.status < 200 || glass.status >= 300) {
            return rejectWithValue(glass.data)
        }
        let tmp = []
        tmp = tmp.concat(belt.data).concat(umbrella.data).concat(hat.data).concat(glass.data)
        return tmp
    }

)
export const accessoriesSlice = createSlice({
    name: 'accessoriesSlice',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllAccessories.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }


})
export default accessoriesSlice.reducer