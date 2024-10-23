import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    success: null,
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
            state.success = null; // Clear success message when error occurs
        },
        setSuccessMessage:(state, action) => {
            state.success = action.payload;
            state.error = null; // Clear error message when success occurs
        },
        clearMessages: (state) => {
            state.error = null;
            state.success = null; // Clear both error and success messages when called
        },
    },
});

export const { setErrorMessage, setSuccessMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;