import { apiSlice } from "../api/apiSlice.ts";
const PATIENTS_URL = "/patients";
export const patientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => PATIENTS_URL,
            providesTags: ["Patients"],
        }),
        getPatient: builder.query({
            query: (id) => `${PATIENTS_URL}/${id}`,
            providesTags: ["Patients"],
        }),
        addPatient: builder.mutation({
            query: (data) => ({
                url: PATIENTS_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        updatePatient: builder.mutation({
            query: (data) => ({
                url: `${PATIENTS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `${PATIENTS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Patients"],
        }),
    }),
});
export const { useGetPatientsQuery, useGetPatientQuery, useAddPatientMutation, useUpdatePatientMutation, useDeletePatientMutation, } = patientsApiSlice;
