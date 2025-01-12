import { apiSlice } from "../api/apiSlice.ts";
import {
  AddAppointmentDto,
  AppointmentResponseDto,
  UpdateAppointmentDto,
} from "../../Types/Appointments.ts";
import { BaseQueryArg } from "@reduxjs/toolkit/query";
import {
  AddAppointmentType,
  AppointmentTypeResponseDto,
} from "../../Types/AppointmentTypes.ts";
import { patientsApiSlice } from "../patients/patientsApiSlice.ts";
import { doctorsApiSlice } from "../doctors/doctorApiSlice.ts";
import { billingsApiSlice } from "../billings/billingsApiSlice.ts";

const APPOINTMENTS_URL = "/appointments";

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query<AppointmentResponseDto, void>({
      query: () => APPOINTMENTS_URL,
      providesTags: ["Appointments"],
    }),
    getAppointmentById: builder.query<AppointmentResponseDto, number>({
      query: (id) => `${APPOINTMENTS_URL}/${id}`,
      providesTags: ["Appointments"],
    }),
    addAppointment: builder.mutation<AppointmentResponseDto, AddAppointmentDto>(
      {
        query: (appointment) => ({
          url: APPOINTMENTS_URL,
          method: "POST",
          body: appointment,
        }),
        invalidatesTags: ["Appointments"],
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          if (await queryFulfilled) {
            dispatch(doctorsApiSlice.util.invalidateTags(["Doctors"]));
            dispatch(billingsApiSlice.util.invalidateTags(["Billings"]));
          }
        },
      },
    ),

    updateAppointment: builder.mutation<
      AppointmentResponseDto,
      UpdateAppointmentDto
    >({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(doctorsApiSlice.util.invalidateTags(["Doctors"]));
          dispatch(billingsApiSlice.util.invalidateTags(["Billings"]));
        }
      },
    }),

    deleteAppointment: builder.mutation<AppointmentResponseDto, number>({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(doctorsApiSlice.util.invalidateTags(["Doctors"]));
          dispatch(billingsApiSlice.util.invalidateTags(["Billings"]));
        }
      },
    }),

    getAllTypes: builder.query<AppointmentTypeResponseDto, void>({
      query: () => `${APPOINTMENTS_URL}/types`,
      providesTags: ["AppointmentTypes"],
    }),

    getTypeById: builder.query<AppointmentTypeResponseDto, number>({
      query: (id) => `${APPOINTMENTS_URL}/types/${id}`,
      providesTags: ["AppointmentTypes"],
    }),

    addType: builder.mutation<AppointmentTypeResponseDto, AddAppointmentType>({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AppointmentTypes"],
    }),

    deleteType: builder.mutation<AppointmentTypeResponseDto, number>({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppointmentTypes"],
    }),
  }),
});

export const {
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllTypesQuery,
  useGetTypeByIdQuery,
  useAddTypeMutation,
  useDeleteTypeMutation,
} = appointmentsApiSlice;
