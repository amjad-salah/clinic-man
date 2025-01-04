import { apiSlice } from "../api/apiSlice.ts";
import {
  AddDiagnoseDto,
  DiagnoseResponseDto,
  UpdateDiagnoseDto,
} from "../../Types/Diagnoses.ts";
import { appointmentsApiSlice } from "../appointments/appointmentsApiSlice.ts";
import { patientsApiSlice } from "../patients/patientsApiSlice.ts";

const DIAGNOSES_URL = "/diagnoses";

const diagnosesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDiagnoses: builder.query<DiagnoseResponseDto, void>({
      query: () => DIAGNOSES_URL,
      providesTags: ["Diagnoses"],
    }),
    getDiagnoseById: builder.query<DiagnoseResponseDto, number>({
      query: (id) => `${DIAGNOSES_URL}/${id}`,
      providesTags: ["Diagnoses"],
    }),
    addDiagnose: builder.mutation<DiagnoseResponseDto, AddDiagnoseDto>({
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
    updateDiagnose: builder.mutation<DiagnoseResponseDto, UpdateDiagnoseDto>({
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
    deleteDiagnose: builder.mutation<DiagnoseResponseDto, number>({
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

export const {
  useGetAllDiagnosesQuery,
  useGetDiagnoseByIdQuery,
  useAddDiagnoseMutation,
  useUpdateDiagnoseMutation,
  useDeleteDiagnoseMutation,
} = diagnosesApiSlice;
