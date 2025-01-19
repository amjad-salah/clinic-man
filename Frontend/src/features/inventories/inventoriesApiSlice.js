import { apiSlice } from "../api/apiSlice.ts";
const INVENTORIES_URL = "/inventories";
export const inventoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllInventories: builder.query({
            query: () => INVENTORIES_URL,
            providesTags: ["Inventories"],
        }),
        getInventoryById: builder.query({
            query: (id) => `${INVENTORIES_URL}/${id}`,
            providesTags: ["Inventories"],
        }),
        addInventory: builder.mutation({
            query: (data) => ({
                url: INVENTORIES_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Inventories"],
        }),
        updateInventory: builder.mutation({
            query: (data) => ({
                url: `${INVENTORIES_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Inventories"],
        }),
        deleteInventory: builder.mutation({
            query: (id) => ({
                url: `${INVENTORIES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Inventories"],
        }),
    }),
});
export const { useGetAllInventoriesQuery, useGetInventoryByIdQuery, useAddInventoryMutation, useUpdateInventoryMutation, useDeleteInventoryMutation, } = inventoriesApiSlice;
