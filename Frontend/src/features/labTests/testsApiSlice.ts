import { apiSlice } from "../api/apiSlice.ts";
import {
  AddLabTestDto,
  TestResponseDto,
  UpdateLabTestDto,
} from "../../Types/LabTests.ts";
import { appointmentsApiSlice } from "../appointments/appointmentsApiSlice.ts";
import { patientsApiSlice } from "../patients/patientsApiSlice.ts";

const TESTS_URL = "/labtests";

const testsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTests: builder.query<TestResponseDto, void>({
      query: () => `${TESTS_URL}`,
      providesTags: ["LabTests"],
    }),
    getTestById: builder.query<TestResponseDto, number>({
      query: (id) => `${TESTS_URL}/${id}`,
      providesTags: ["LabTests"],
    }),
    addTest: builder.mutation<TestResponseDto, AddLabTestDto>({
      query: (data) => ({
        url: `${TESTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LabTests"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
        }
      },
    }),
    updateTest: builder.mutation<TestResponseDto, UpdateLabTestDto>({
      query: (data) => ({
        url: `${TESTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LabTests"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
        }
      },
    }),
    deleteTest: builder.mutation<TestResponseDto, number>({
      query: (id) => ({
        url: `${TESTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LabTests"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(appointmentsApiSlice.util.invalidateTags(["Appointments"]));
        }
      },
    }),
  }),
});

export const {
  useGetAllTestsQuery,
  useGetTestByIdQuery,
  useAddTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testsApiSlice;
