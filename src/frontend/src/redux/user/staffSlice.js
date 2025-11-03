import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/user/get-all-user`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)

export const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        value: []
    },
    reducers: {
        addStaff: (state, action) => {
            const Staffs = state.value
            const updateSatff = action.payload

            //add
            Staffs.push(updateSatff)
            state.value = Staffs

        },
        deleteStaff: (state, action) => {
            const Staffs = state.value
            const updateSatff = action.payload

            let index = Staffs.findIndex(item => item.id === updateSatff.id)
            //delete
            Staffs.splice(index, 1)
            state.value = Staffs

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {

            let tmp = action.payload.filter(item => {
                return item.id_role === "00001"
            })
            state.value = tmp
        })

    }
})
export const { addStaff, deleteStaff } = staffSlice.actions
export default staffSlice.reducer