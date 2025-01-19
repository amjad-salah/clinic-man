import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks.ts";
const PrivateRoute = () => {
    const { user } = useAppSelector((state) => state.auth);
    return user ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
};
export default PrivateRoute;
