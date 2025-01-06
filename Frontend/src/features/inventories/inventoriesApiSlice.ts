import { apiSlice } from "../api/apiSlice.ts";
import {
  AddInventoryDto,
  InventoryResponseDto,
  UpdateInventoryDto,
} from "../../Types/Inventories.ts";

const INVENTORIES_URL = "/inventories";

export const inventoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInventories: builder.query<InventoryResponseDto, void>({
      query: () => INVENTORIES_URL,
      providesTags: ["Inventories"],
    }),
    getInventoryById: builder.query<InventoryResponseDto, number>({
      query: (id) => `${INVENTORIES_URL}/${id}`,
      providesTags: ["Inventories"],
    }),
    addInventory: builder.mutation<InventoryResponseDto, AddInventoryDto>({
      query: (data) => ({
        url: INVENTORIES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inventories"],
    }),
    updateInventory: builder.mutation<InventoryResponseDto, UpdateInventoryDto>(
      {
        query: (data) => ({
          url: `${INVENTORIES_URL}/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Inventories"],
      },
    ),
    deleteInventory: builder.mutation<InventoryResponseDto, number>({
      query: (id) => ({
        url: `${INVENTORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventories"],
    }),
  }),
});

export const {
  useGetAllInventoriesQuery,
  useGetInventoryByIdQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventoriesApiSlice;
