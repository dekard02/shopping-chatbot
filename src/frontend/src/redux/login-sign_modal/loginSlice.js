import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null
}



export const loginModal = createSlice({
    name: 'loginModal',
    initialState,
    reducers: {
        setLoginModal: (state) => {
            state.value = true
        },
        removeLoginModal: (state) => {
            state.value = false
        }
    }
})
export const { removeLoginModal,setLoginModal } = loginModal.actions
export default loginModal.reducer