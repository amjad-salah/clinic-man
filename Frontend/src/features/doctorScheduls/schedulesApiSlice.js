import { apiSlice } from "../api/apiSlice.ts";
const SCHEDULES_URL = "/schedules";
const schedulesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSchedules: builder.query({
            query: () => `${SCHEDULES_URL}`,
            providesTags: ["Schedules"],
        }),
        getScheduleById: builder.query({
            query: (id) => `${SCHEDULES_URL}/${id}`,
            providesTags: ["Schedules"],
        }),
        addSchedule: builder.mutation({
            query: (data) => ({
                url: `${SCHEDULES_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Schedules"],
        }),
        updateSchedule: builder.mutation({
            query: (data) => ({
                url: `${SCHEDULES_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Schedules"],
        }),
        deleteSchedule: builder.mutation({
            query: (id) => ({
                url: `${SCHEDULES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Schedules"],
        }),
    }),
});
export const { useGetAllSchedulesQuery, useGetScheduleByIdQuery, useAddScheduleMutation, useUpdateScheduleMutation, useDeleteScheduleMutation, } = schedulesApiSlice;
