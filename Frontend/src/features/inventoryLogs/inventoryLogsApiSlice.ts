import { apiSlice } from "../api/apiSlice.ts";
import {
  AddInventoryLogDto,
  InventoryLogResponseDto,
  UpdateInventoryLogDto,
} from "../../Types/InventoryLogs.ts";
import { inventoriesApiSlice } from "../inventories/inventoriesApiSlice.ts";

const LOGS_URL = "/invlogs";

export const inventoryLogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLogs: builder.query<InventoryLogResponseDto, void>({
      query: () => LOGS_URL,
      providesTags: ["InventoryLogs"],
    }),

    getLogById: builder.query<InventoryLogResponseDto, number>({
      query: (id) => `${LOGS_URL}/${id}`,
      providesTags: ["InventoryLogs"],
    }),

    addLog: builder.mutation<InventoryLogResponseDto, AddInventoryLogDto>({
      query: (data) => ({
        url: LOGS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["InventoryLogs"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
          //dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
        }
      },
    }),

    updateLog: builder.mutation<InventoryLogResponseDto, UpdateInventoryLogDto>(
      {
        query: (data) => ({
          url: `${LOGS_URL}/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["InventoryLogs"],
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          if (await queryFulfilled) {
            dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
            //dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
          }
        },
      },
    ),

    deleteLog: builder.mutation<InventoryLogResponseDto, number>({
      query: (id) => ({
        url: `${LOGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InventoryLogs"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        if (await queryFulfilled) {
          dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
          //dispatch(inventoriesApiSlice.util.invalidateTags(["Inventories"]));
        }
      },
    }),
  }),
});

export const {
  useGetAllLogsQuery,
  useGetLogByIdQuery,
  useAddLogMutation,
  useUpdateLogMutation,
  useDeleteLogMutation,
} = inventoryLogsApiSlice;
