import { apiSlice } from "../api/apiSlice.ts";
import {
  AddUserDto,
  LoginRequestDto,
  LoginResponseDto,
  UpdateUserDto,
  UsersResponseDto,
} from "../../Types/UserType.ts";
import { BaseQueryArg } from "@reduxjs/toolkit/query";

const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (data: LoginRequestDto) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    getAllUsers: builder.query<UsersResponseDto, null>({
      query: () => `${USERS_URL}`,
      providesTags: ["Users"],
    }),

    getUserById: builder.query<UsersResponseDto, number>({
      query: (id: number) => `${USERS_URL}/${id}`,
      providesTags: ["Users"],
    }),

    addUser: builder.mutation<UsersResponseDto, AddUserDto>({
      query: (data: AddUserDto) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation<UsersResponseDto, UpdateUserDto>({
      query: (data: UpdateUserDto) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<UsersResponseDto, number>({
      query: (id: number) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
