import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    type: "",
    state: false
}

export const alertMessage = createSlice({
    name: 'alertMessage',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.state = true
        },
        removeAlert: (state) => {
            state.state = false
        }
    }
})
export const { setAlert, removeAlert } = alertMessage.actions
export default alertMessage.reducer