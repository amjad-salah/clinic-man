import { apiSlice } from "../api/apiSlice.ts";
import { doctorsApiSlice } from "../doctors/doctorApiSlice.ts";
import { billingsApiSlice } from "../billings/billingsApiSlice.ts";
const APPOINTMENTS_URL = "/appointments";
export const appointmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAppointments: builder.query({
            query: () => APPOINTMENTS_URL,
            providesTags: ["Appointments"],
        }),
        getAppointmentById: builder.query({
            query: (id) => `${APPOINTMENTS_URL}/${id}`,
            providesTags: ["Appointments"],
        }),
        addAppointment: builder.mutation({
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
        }),
        updateAppointment: builder.mutation({
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
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `${APPOINTMENTS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Appointments"],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                if (await queryFulfilled) {
                    dispatch(doctorsApiSlice.util.invalidateTags(["Doctors"]));
                }
            },
        }),
        getAllTypes: builder.query({
            query: () => `${APPOINTMENTS_URL}/types`,
            providesTags: ["AppointmentTypes"],
        }),
        getTypeById: builder.query({
            query: (id) => `${APPOINTMENTS_URL}/types/${id}`,
            providesTags: ["AppointmentTypes"],
        }),
        addType: builder.mutation({
            query: (data) => ({
                url: `${APPOINTMENTS_URL}/types`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AppointmentTypes"],
        }),
        deleteType: builder.mutation({
            query: (id) => ({
                url: `${APPOINTMENTS_URL}/types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AppointmentTypes"],
        }),
    }),
});
export const { useGetAllAppointmentsQuery, useGetAppointmentByIdQuery, useAddAppointmentMutation, useUpdateAppointmentMutation, useDeleteAppointmentMutation, useGetAllTypesQuery, useGetTypeByIdQuery, useAddTypeMutation, useDeleteTypeMutation, } = appointmentsApiSlice;
