import { apiSlice } from "../api/apiSlice.ts";
import {
  AddDoctorDto,
  DoctorResponseDto,
  UpdateDoctorDto,
} from "../../Types/Doctors.ts";

const DOCTORS_URL = "/doctors";

export const doctorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query<DoctorResponseDto, null>({
      query: () => `${DOCTORS_URL}`,
      providesTags: ["Doctors"],
    }),

    getDoctorById: builder.query<DoctorResponseDto, number>({
      query: (id: number) => `${DOCTORS_URL}/${id}`,
      providesTags: ["Doctors"],
    }),

    addDoctor: builder.mutation<DoctorResponseDto, AddDoctorDto>({
      query: (data: AddDoctorDto) => ({
        url: `${DOCTORS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    updateDoctor: builder.mutation<DoctorResponseDto, UpdateDoctorDto>({
      query: (data: UpdateDoctorDto) => ({
        url: `${DOCTORS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    deleteDoctor: builder.mutation<DoctorResponseDto, number>({
      query: (id: number) => ({
        url: `${DOCTORS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApiSlice;
