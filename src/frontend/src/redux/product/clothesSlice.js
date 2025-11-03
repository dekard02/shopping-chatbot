import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllclothes = createAsyncThunk(
    'product/getAllclothes',
    async (data, { rejectWithValue }) => {
        const tshirt = await axios.get(`${apiUrl}/product/category_slug/ao-thun`)
        const shirt = await axios.get(`${apiUrl}/product/category_slug/ao-somi`)
        const wool = await axios.get(`${apiUrl}/product/category_slug/ao-len`)
        const jean = await axios.get(`${apiUrl}/product/category_slug/quan-jean`)
        const kaki = await axios.get(`${apiUrl}/product/category_slug/quan-kaki`)
        if (tshirt.status < 200 || tshirt.status >= 300) {
            return rejectWithValue(tshirt.data)
        }
        if (shirt.status < 200 || shirt.status >= 300) {
            return rejectWithValue(shirt.data)
        }
        if (wool.status < 200 || wool.status >= 300) {
            return rejectWithValue(wool.data)
        }
        if (jean.status < 200 || jean.status >= 300) {
            return rejectWithValue(jean.data)
        }
        if (kaki.status < 200 || kaki.status >= 300) {
            return rejectWithValue(kaki.data)
        }
        let tmp = []
        return tmp = tmp.concat(tshirt.data).concat(shirt.data).concat(wool.data).concat(jean.data).concat(kaki.data)
    }

)
export const clothesSlice = createSlice({
    name: 'clothesSlice',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllclothes.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }


})
export default clothesSlice.reducer