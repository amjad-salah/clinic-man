import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home.tsx";
import store from "./app/store.ts";
import PrivateRoute from "./components/PrivateRoute.tsx";

import Login from "./features/users/Login.tsx";
import UsersList from "./features/users/UsersList.tsx";
import DoctorsList from "./features/doctors/DoctorsList.tsx";
import DoctorDetails from "./features/doctors/DoctorDetails.tsx";
import SchedulesList from "./features/doctorScheduls/SchedulesList.tsx";
import PatientsList from "./features/patients/PatientsList.tsx";
import PatientDetails from "./features/patients/PatientDetails.tsx";
import AppointmentsList from "./features/appointments/AppointmentsList.tsx";
import AppointmentDetails from "./features/appointments/AppointmentDetails.tsx";
import TestsList from "./features/labTests/TestsList.tsx";
import TestDetails from "./features/labTests/TestDetails.tsx";
import DiagnosesList from "./features/diganoses/DiagnosesList.tsx";
import PrescriptionsList from "./features/prescriptions/PrescriptionsList.tsx";
import PrescriptionDetails from "./features/prescriptions/PrescriptionDetails.tsx";
import BillingsList from "./features/billings/BillingsList.tsx";
import BillingDetails from "./features/billings/BillingDetails.tsx";
import InventoriesList from "./features/inventories/InventoriesList.tsx";
import InventoryDetails from "./features/inventories/InventoryDetails.tsx";
import SuppliersList from "./features/suppliers/SuppliersList.tsx";
import SupplierDetails from "./features/suppliers/SupplierDetails.tsx";
import LogsList from "./features/inventoryLogs/LogsList.tsx";

//Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/*Private Routes*/}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/users">
          <Route path="/users" index={true} element={<UsersList />} />
        </Route>

        <Route path="/doctors">
          <Route path="/doctors" index={true} element={<DoctorsList />} />
          <Route path="/doctors/:id" index={true} element={<DoctorDetails />} />
        </Route>

        <Route path="/schedules">
          <Route path="/schedules" index={true} element={<SchedulesList />} />
        </Route>

        <Route path="/patients">
          <Route path="/patients" index={true} element={<PatientsList />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Route>

        <Route path="/appointments">
          <Route
            path="/appointments"
            index={true}
            element={<AppointmentsList />}
          />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
        </Route>

        <Route path="/labtests">
          <Route path="/labtests" index={true} element={<TestsList />} />
          <Route path="/labtests/:id" element={<TestDetails />} />
        </Route>

        <Route path="/diagnoses">
          <Route path="/diagnoses" index={true} element={<DiagnosesList />} />
        </Route>
        <Route path="/prescriptions">
          <Route
            path="/prescriptions"
            index={true}
            element={<PrescriptionsList />}
          />
          <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
        </Route>
        <Route path="/bills">
          <Route path="/bills" index={true} element={<BillingsList />} />
          <Route path="/bills/:id" element={<BillingDetails />} />
        </Route>
        <Route path="/inventories">
          <Route
            path="/inventories"
            index={true}
            element={<InventoriesList />}
          />
        </Route>
        <Route path="/inventories/:id" element={<InventoryDetails />} />
      </Route>

      <Route path="/suppliers">
        <Route path="/suppliers" index={true} element={<SuppliersList />} />
        <Route path="/suppliers/:id" element={<SupplierDetails />} />
      </Route>
      <Route path="/invlogs">
        <Route path="/invlogs" index={true} element={<LogsList />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
