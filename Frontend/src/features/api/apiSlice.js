import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders: (headers) => {
            // @ts-ignore
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                headers.set("Authorization", "Bearer " + user.token);
            }
        },
    }),
    endpoints: (builder) => ({}),
    tagTypes: [
        "Users",
        "Doctors",
        "Schedules",
        "Patients",
        "Appointments",
        "AppointmentTypes",
        "LabTests",
        "Diagnoses",
        "Prescriptions",
        "Billings",
        "Inventories",
        "InventoryLogs",
        "Suppliers",
    ],
});
