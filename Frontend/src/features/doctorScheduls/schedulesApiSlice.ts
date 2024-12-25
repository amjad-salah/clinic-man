import { apiSlice } from "../api/apiSlice.ts";
import {
  AddDoctorScheduleDto,
  DoctorScheduleDto,
  ScheduleResponseDto,
} from "../../Types/DoctorSchedules.ts";

const SCHEDULES_URL = "/schedules";

const schedulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchedules: builder.query<ScheduleResponseDto, null>({
      query: () => `${SCHEDULES_URL}`,
      providesTags: ["Schedules"],
    }),

    getScheduleById: builder.query<ScheduleResponseDto, number>({
      query: (id: number) => `${SCHEDULES_URL}/${id}`,
      providesTags: ["Schedules"],
    }),

    addSchedule: builder.mutation<ScheduleResponseDto, AddDoctorScheduleDto>({
      query: (data: AddDoctorScheduleDto) => ({
        url: `${SCHEDULES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schedules"],
    }),

    updateSchedule: builder.mutation<ScheduleResponseDto, DoctorScheduleDto>({
      query: (data: DoctorScheduleDto) => ({
        url: `${SCHEDULES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Schedules"],
    }),

    deleteSchedule: builder.mutation<ScheduleResponseDto, number>({
      query: (id: number) => ({
        url: `${SCHEDULES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedules"],
    }),
  }),
});

export const {
  useGetAllSchedulesQuery,
  useGetScheduleByIdQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = schedulesApiSlice;
