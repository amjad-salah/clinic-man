import { apiSlice } from "../api/apiSlice.ts";
import {
  AddPrescriptionDto,
  PrescriptionResponseDto,
  UpdatePrescriptionDto,
} from "../../Types/Prescriptions.ts";

const PRESCRIPTIONS_URL = "/prescriptions";

const prescriptionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPrescriptions: builder.query<PrescriptionResponseDto, void>({
      query: () => PRESCRIPTIONS_URL,
      providesTags: ["Prescriptions"],
    }),

    getPrescriptionById: builder.query<PrescriptionResponseDto, number>({
      query: (id) => `${PRESCRIPTIONS_URL}/${id}`,
      providesTags: ["Prescriptions"],
    }),

    addPrescription: builder.mutation<
      PrescriptionResponseDto,
      AddPrescriptionDto
    >({
      query: (body) => ({
        url: PRESCRIPTIONS_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    updatePrescription: builder.mutation<
      PrescriptionResponseDto,
      UpdatePrescriptionDto
    >({
      query: (body) => ({
        url: `${PRESCRIPTIONS_URL}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    deletePrescription: builder.mutation<PrescriptionResponseDto, number>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),
  }),
});

export const {
  useGetAllPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useAddPrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionsApiSlice;
