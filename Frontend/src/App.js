import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
    return (_jsxs("div", { className: "wrapper", children: [_jsx(Navbar, {}), _jsxs("div", { className: "main p-3", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "container my-5 h-100", children: _jsx(Outlet, {}) })] })] }));
};
export default App;
