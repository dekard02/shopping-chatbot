import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload
        },
        removeLoading: (state) => {
            state.value = false
        }
    }
})
export const { setLoading, removeLoading } = loadingSlice.actions
export default loadingSlice.reducer