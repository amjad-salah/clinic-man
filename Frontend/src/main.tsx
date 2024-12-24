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
          <Route path="/doctors/add" index={true} element={<AddDoctor />} />
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
