import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice';
import messageReducer from '../slice/messageSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        messages: messageReducer,
    },
});
export default store;