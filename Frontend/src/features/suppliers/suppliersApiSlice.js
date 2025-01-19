import { apiSlice } from "../api/apiSlice.ts";
const SUPPLIERS_URL = "/suppliers";
export const suppliersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSuppliers: builder.query({
            query: () => SUPPLIERS_URL,
            providesTags: ["Suppliers"],
        }),
        getSupplierById: builder.query({
            query: (id) => `${SUPPLIERS_URL}/${id}`,
            providesTags: ["Suppliers"],
        }),
        addSupplier: builder.mutation({
            query: (data) => ({
                url: SUPPLIERS_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Suppliers"],
        }),
        updateSupplier: builder.mutation({
            query: (data) => ({
                url: `${SUPPLIERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Suppliers"],
        }),
        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `${SUPPLIERS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Suppliers"],
        }),
    }),
});
export const { useGetAllSuppliersQuery, useGetSupplierByIdQuery, useAddSupplierMutation, useUpdateSupplierMutation, useDeleteSupplierMutation, } = suppliersApiSlice;
