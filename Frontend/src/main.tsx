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
import AddUser from "./features/users/AddUser.tsx";
import EditUser from "./features/users/EditUser.tsx";
import DoctorsList from "./features/doctors/DoctorsList.tsx";
import AddDoctor from "./features/doctors/AddDoctor.tsx";
import DoctorDetails from "./features/doctors/DoctorDetails.tsx";
import UpdateDoctor from "./features/doctors/UpdateDoctor.tsx";
import SchedulesList from "./features/doctorScheduls/SchedulesList.tsx";
import AddSchedule from "./features/doctorScheduls/AddSchedule.tsx";
import UpdateSchedule from "./features/doctorScheduls/UpdateSchedule.tsx";
import PatientsList from "./features/patients/PatientsList.tsx";
import AddPatient from "./features/patients/AddPatient.tsx";
import PatientDetails from "./features/patients/PatientDetails.tsx";
import UpdatePatient from "./features/patients/UpdatePatient.tsx";
import AppointmentsList from "./features/appointments/AppointmentsList.tsx";
import AddAppointment from "./features/appointments/AddAppointment.tsx";
import AppointmentDetails from "./features/appointments/AppointmentDetails.tsx";
import AddTest from "./features/appointments/AddTest.tsx";
import TestsList from "./features/labTests/TestsList.tsx";
import TestDetails from "./features/labTests/TestDetails.tsx";
import UpdateTest from "./features/labTests/UpdateTest.tsx";
import DiagnosesList from "./features/diganoses/DiagnosesList.tsx";
import AddDiagnose from "./features/appointments/AddDiagnose.tsx";
import PrescriptionsList from "./features/prescriptions/PrescriptionsList.tsx";
import PrescriptionDetails from "./features/prescriptions/PrescriptionDetails.tsx";
import AddPrescription from "./features/appointments/AddPrescription.tsx";

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
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Route>

        <Route path="/doctors">
          <Route path="/doctors" index={true} element={<DoctorsList />} />
          <Route path="/doctors/:id" index={true} element={<DoctorDetails />} />
          <Route path="/doctors/add" index={true} element={<AddDoctor />} />
          <Route
            path="/doctors/edit/:id"
            index={true}
            element={<UpdateDoctor />}
          />
        </Route>

        <Route path="/schedules">
          <Route path="/schedules" index={true} element={<SchedulesList />} />
          <Route path="/schedules/add" element={<AddSchedule />} />
          <Route path="/schedules/edit/:id" element={<UpdateSchedule />} />
        </Route>

        <Route path="/patients">
          <Route path="/patients" index={true} element={<PatientsList />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/patients/edit/:id" element={<UpdatePatient />} />
        </Route>

        <Route path="/appointments">
          <Route
            path="/appointments"
            index={true}
            element={<AppointmentsList />}
          />
          <Route path="/appointments/add" element={<AddAppointment />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/appointments/:id/add-test" element={<AddTest />} />
          <Route
            path="/appointments/:id/add-diagnose"
            element={<AddDiagnose />}
          />
          <Route
            path="/appointments/:id/add-prescription"
            element={<AddPrescription />}
          />
          {/*<Route*/}
          {/*  path="/appointments/edit/:id"*/}
          {/*  element={<UpdateAppointment />}*/}
          {/*/>*/}
        </Route>

        <Route path="/labtests">
          <Route path="/labtests" index={true} element={<TestsList />} />
          <Route path="/labtests/:id" element={<TestDetails />} />
          <Route path="/labtests/edit/:id" element={<UpdateTest />} />
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
