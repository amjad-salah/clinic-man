import { apiSlice } from "../api/apiSlice.ts";
const DOCTORS_URL = "/doctors";
export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: () => `${DOCTORS_URL}`,
            providesTags: ["Doctors"],
        }),
        getDoctorById: builder.query({
            query: (id) => `${DOCTORS_URL}/${id}`,
            providesTags: ["Doctors"],
        }),
        addDoctor: builder.mutation({
            query: (data) => ({
                url: `${DOCTORS_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Doctors"],
        }),
        updateDoctor: builder.mutation({
            query: (data) => ({
                url: `${DOCTORS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Doctors"],
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `${DOCTORS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Doctors"],
        }),
    }),
});
export const { useGetAllDoctorsQuery, useGetDoctorByIdQuery, useAddDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation, } = doctorsApiSlice;
