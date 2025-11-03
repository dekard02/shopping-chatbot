import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null
}
export const signModal = createSlice({
    name: 'signModal',
    initialState,
    reducers: {
        setSignModal: (state) => {
            state.value = true
        },
        removeSignModal: (state) => {
            state.value = false
        }
    }
})
export const { removeSignModal,setSignModal} = signModal.actions
export default signModal.reducer