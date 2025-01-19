import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.ts";
import authSlice from "../features/users/authSlice.ts";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
export default store;
