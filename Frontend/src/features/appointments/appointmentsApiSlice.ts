import { apiSlice } from "../api/apiSlice.ts";
import {
  AddAppointmentDto,
  AppointmentResponseDto,
  UpdateAppointmentDto,
} from "../../Types/Appointments.ts";
import { BaseQueryArg } from "@reduxjs/toolkit/query";

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
    }),

    deleteAppointment: builder.mutation<AppointmentResponseDto, number>({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApiSlice;
