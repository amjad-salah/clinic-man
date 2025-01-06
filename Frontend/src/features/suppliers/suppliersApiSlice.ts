import { apiSlice } from "../api/apiSlice.ts";
import {
  AddSupplierDto,
  SupplierResponseDto,
  UpdateSupplierDto,
} from "../../Types/Suppliers.ts";
import { BaseQueryArg } from "@reduxjs/toolkit/query";

const SUPPLIERS_URL = "/suppliers";

export const suppliersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query<SupplierResponseDto, void>({
      query: () => SUPPLIERS_URL,
      providesTags: ["Suppliers"],
    }),

    getSupplierById: builder.query<SupplierResponseDto, number>({
      query: (id) => `${SUPPLIERS_URL}/${id}`,
      providesTags: ["Suppliers"],
    }),

    addSupplier: builder.mutation<SupplierResponseDto, AddSupplierDto>({
      query: (data) => ({
        url: SUPPLIERS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),

    updateSupplier: builder.mutation<SupplierResponseDto, UpdateSupplierDto>({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),

    deleteSupplier: builder.mutation<SupplierResponseDto, number>({
      query: (id) => ({
        url: `${SUPPLIERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useGetSupplierByIdQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApiSlice;
