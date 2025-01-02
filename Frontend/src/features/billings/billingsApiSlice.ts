import { apiSlice } from "../api/apiSlice.ts";
import {
  AddBillingDto,
  AddBillingItemDto,
  BillingResponse,
  PaymentDto,
} from "../../Types/Billings.ts";

const BILLINGS_URL = "/billings";

const billingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBillings: builder.query<BillingResponse, void>({
      query: () => BILLINGS_URL,
      providesTags: ["Billings"],
    }),

    getBillingById: builder.query<BillingResponse, number>({
      query: (id) => `${BILLINGS_URL}/${id}`,
      providesTags: ["Billings"],
    }),

    addBilling: builder.mutation<BillingResponse, AddBillingDto>({
      query: (data) => ({
        url: BILLINGS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Billings"],
    }),

    deleteBilling: builder.mutation({
      query: (billingId) => ({
        url: `${BILLINGS_URL}/${billingId}`,
        method: "DELETE",
      }),
    }),
    addBillingItem: builder.mutation<BillingResponse, AddBillingItemDto>({
      query: (data) => ({
        url: `${BILLINGS_URL}/${data.billingId}/items`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Billings"],
    }),

    deleteBillingItem: builder.mutation<BillingResponse, number>({
      query: (itemId) => ({
        url: `${BILLINGS_URL}/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Billings"],
    }),

    addPayment: builder.mutation<BillingResponse, PaymentDto>({
      query: (data) => ({
        url: `${BILLINGS_URL}/${data.billingId}/payments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Billings"],
    }),

    deletePayment: builder.mutation<BillingResponse, number>({
      query: (paymentId) => ({
        url: `${BILLINGS_URL}/payments/${paymentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Billings"],
    }),
  }),
});

export const {
  useGetAllBillingsQuery,
  useGetBillingByIdQuery,
  useAddBillingMutation,
  useDeleteBillingMutation,
  useAddBillingItemMutation,
  useDeleteBillingItemMutation,
  useAddPaymentMutation,
  useDeletePaymentMutation,
} = billingsApiSlice;
