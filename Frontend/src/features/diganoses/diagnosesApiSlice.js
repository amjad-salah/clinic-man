import { apiSlice } from "../api/apiSlice.ts";
import { appointmentsApiSlice } from "../appointments/appointmentsApiSlice.ts";
import { patientsApiSlice } from "../patients/patientsApiSlice.ts";
const DIAGNOSES_URL = "/diagnoses";
const diagnosesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDiagnoses: builder.query({
            query: () => DIAGNOSES_URL,
            providesTags: ["Diagnoses"],
        }),
        getDiagnoseById: builder.query({
            query: (id) => `${DIAGNOSES_URL}/${id}`,
            providesTags: ["Diagnoses"],
        }),
        addDiagnose: builder.mutation({
            query: (data) => ({
                url: DIAGNOSES_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Diagnoses"],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                if (await queryFulfilled) {
                    dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
                    dispatch(patientsApiSlice.util.invalidateTags(["Patients"]));
                }
            },
        }),
        updateDiagnose: builder.mutation({
            query: (data) => ({
                url: `${DIAGNOSES_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Diagnoses"],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                if (await queryFulfilled) {
                    dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
                    dispatch(patientsApiSlice.util.invalidateTags(["Patients"]));
                }
            },
        }),
        deleteDiagnose: builder.mutation({
            query: (id) => ({
                url: `${DIAGNOSES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Diagnoses"],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                if (await queryFulfilled) {
                    dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
                    dispatch(patientsApiSlice.util.invalidateTags(["Patients"]));
                }
            },
        }),
    }),
});
export const { useGetAllDiagnosesQuery, useGetDiagnoseByIdQuery, useAddDiagnoseMutation, useUpdateDiagnoseMutation, useDeleteDiagnoseMutation, } = diagnosesApiSlice;
