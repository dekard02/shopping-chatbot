import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllCategory = createAsyncThunk(
    'category/getAllCategory',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/category/getAll`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)
export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        value: []
    },
    reducers: {
        updateCategory: (state, action) => {
            const Categorys = state.value
            const updateCategory = action.payload

            let index = Categorys.findIndex(item => item.id === updateCategory.id)
            //update
            Categorys[index] = updateCategory
            state.value = Categorys
        },
        addCategory: (state, action) => {
            const Categorys = state.value
            const updateCategory = action.payload

            //add
            Categorys.push(updateCategory)
            state.value = Categorys

            console.log(action.payload,  state.value);
        },
        deleteCategory: (state, action) => {
            const Categorys = state.value
            const updateCategory = action.payload

            let index = Categorys.findIndex(item => item.id === updateCategory.id)
            //delete
            Categorys.splice(index,1)
            state.value = Categorys

            console.log(action.payload,  state.value);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.value = action.payload
        })
      
    }
})
export const { updateCategory,addCategory,deleteCategory } = categorySlice.actions
export default categorySlice.reducer