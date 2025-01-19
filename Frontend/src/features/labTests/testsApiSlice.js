import { apiSlice } from "../api/apiSlice.ts";
import { appointmentsApiSlice } from "../appointments/appointmentsApiSlice.ts";
const TESTS_URL = "/labtests";
const testsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTests: builder.query({
            query: () => `${TESTS_URL}`,
            providesTags: ["LabTests"],
        }),
        getTestById: builder.query({
            query: (id) => `${TESTS_URL}/${id}`,
            providesTags: ["LabTests"],
        }),
        addTest: builder.mutation({
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
        updateTest: builder.mutation({
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
        deleteTest: builder.mutation({
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
export const { useGetAllTestsQuery, useGetTestByIdQuery, useAddTestMutation, useUpdateTestMutation, useDeleteTestMutation, } = testsApiSlice;
