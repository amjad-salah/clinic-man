import { apiSlice } from "../api/apiSlice.ts";
const USERS_URL = "/users";
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        getAllUsers: builder.query({
            query: () => `${USERS_URL}`,
            providesTags: ["Users"],
        }),
        getUserById: builder.query({
            query: (id) => `${USERS_URL}/${id}`,
            providesTags: ["Users"],
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});
export const { useGetAllUsersQuery, useGetUserByIdQuery, useLoginMutation, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, } = usersApiSlice;
