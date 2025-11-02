import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl } from "../../utils/constant";


const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
const token = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null

export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const rs = await axios.post(`${apiUrl}/user/login`, data)
            return rs.data
        }
        catch (error) {
            return rejectWithValue(
                error.response.data
            )
        }
    }
)
export const getCart = createAsyncThunk(
    'user/getCart',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/cart/${user.id}`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }
)
export const userState = createSlice({
    name: 'userState',
    initialState: {
        loading: false,
        user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
        token: localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null,
        errorMess: null,
        cart: []
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.errorMess = null;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
        updateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        updateUserPart: (state, action) => {
            state.user = {
                ...state.user,
                [action.payload.name]: action.payload.value
            }
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true;

        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = { ...action.payload.user, role: action.payload.role }
            
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('token', JSON.stringify(action.payload.jwt))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errorMess = "Login failed"
        })
        builder.addCase(getCart.pending, state => {
            state.loading = true;

        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
            /*    localStorage.setItem('user', JSON.stringify(state.value)) */
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.errorMess = action.payload;
            state.user = null
        })

    }



})
export const { logout, updateUser, updateUserPart } = userState.actions
export default userState.reducer