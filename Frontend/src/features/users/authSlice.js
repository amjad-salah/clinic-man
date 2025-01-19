import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearCredentials: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        },
    },
});
export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
