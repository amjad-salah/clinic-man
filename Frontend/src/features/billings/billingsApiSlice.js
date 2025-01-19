import { apiSlice } from "../api/apiSlice.ts";
const BILLINGS_URL = "/billings";
export const billingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBillings: builder.query({
            query: () => BILLINGS_URL,
            providesTags: ["Billings"],
        }),
        getBillingById: builder.query({
            query: (id) => `${BILLINGS_URL}/${id}`,
            providesTags: ["Billings"],
        }),
        addBilling: builder.mutation({
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
        addBillingItem: builder.mutation({
            query: (data) => ({
                url: `${BILLINGS_URL}/${data.billingId}/items`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Billings"],
        }),
        deleteBillingItem: builder.mutation({
            query: (itemId) => ({
                url: `${BILLINGS_URL}/items/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Billings"],
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: `${BILLINGS_URL}/${data.billingId}/payments`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Billings"],
        }),
        deletePayment: builder.mutation({
            query: (paymentId) => ({
                url: `${BILLINGS_URL}/payments/${paymentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Billings"],
        }),
    }),
});
export const { useGetAllBillingsQuery, useGetBillingByIdQuery, useAddBillingMutation, useDeleteBillingMutation, useAddBillingItemMutation, useDeleteBillingItemMutation, useAddPaymentMutation, useDeletePaymentMutation, } = billingsApiSlice;
