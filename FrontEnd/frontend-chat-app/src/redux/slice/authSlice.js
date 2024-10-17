import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isNewUser: false,  // Track whether the user is new.
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isNewUser = action.payload.isNewUser;  // Set isNewUser to true based o sign-up logic
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isNewUser = false;  // Reset isNewUser to false when logging out
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;