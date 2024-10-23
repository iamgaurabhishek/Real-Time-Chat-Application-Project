import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isNewUser: false,  // Track whether the user is new.
    error: null, // Global error state
    success: null, // Global success state
    delayNavigation: false, // Delay navigation
    loading: false, // Global Loading state
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isNewUser = action.payload.isNewUser;  // Set isNewUser to true based o sign-up logic
            state.error = null;  // Clear any error on successful Login
            state.success = "Login successful";
            state.loading = false; // Clear loading state.
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isNewUser = false;  // Reset isNewUser to false when logging out
            state.error = null;  // Clear any error on successful Logout
        },
        setError: (state, action) => {
            state.error = action.payload; // Update error state.
            state.success = null; // Clear any success message on error.
            state.loading = false; // Stop Loading an error
        },
        startLoading: (state) => {
            state.loading = true; // Start loading state.
        },
        stopLoading: (state) => {
            state.loading = false; // Stop loading state.
        },
        setSucess: (state, action) => {
            state.success = action.payload; // Update success state.
            state.error = null; // Clear any error on successful success message.
        },
        clearMessage: (state) => {
            state.error = null; // Clear error state.
            state.success = null; // Clear success state.
            state.loading = false; // Stop loading state.
        },
        startDelay: (state) => {
            state.delayNavigation = true; // Trigger delay navigation.
        },
        stopDelay: (state) => {
            state.delayNavigation = false; // Stop delay navigation.
        },
    },
});

export const { loginSuccess, logoutSuccess, setError, setSucess, clearMessage, startDelay, stopDelay, startLoading, stopLoading } = authSlice.actions;
export default authSlice.reducer;