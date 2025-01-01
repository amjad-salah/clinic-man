import { apiSlice } from "../api/apiSlice.ts";
import {
  AddDiagnoseDto,
  DiagnoseResponseDto,
  UpdateDiagnoseDto,
} from "../../Types/Diagnoses.ts";

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
      invalidatesTags: ["Diagnoses", "Appointments", "Patients"],
    }),
    updateDiagnose: builder.mutation<DiagnoseResponseDto, UpdateDiagnoseDto>({
      query: (data) => ({
        url: `${DIAGNOSES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Diagnoses", "Appointments", "Patients"],
    }),
    deleteDiagnose: builder.mutation<DiagnoseResponseDto, number>({
      query: (id) => ({
        url: `${DIAGNOSES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Diagnoses", "Appointments", "Patients"],
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
