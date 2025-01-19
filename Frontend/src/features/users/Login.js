import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { useLoginMutation } from "./usersApiSlice.ts";
import { setCredentials } from "./authSlice.ts";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const [login] = useLoginMutation();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                fullName: res.fullName,
                role: res.role,
                token: res.token,
            }));
            navigate("/");
        }
        catch (e) {
            console.error(e);
            // @ts-ignore
            toast.error(e.data.error);
        }
    };
    return (_jsx("div", { className: "row align-items-center justify-content-center", children: _jsx("div", { className: "col-md-5", children: _jsxs("div", { className: "card card-body p-4 shadow", children: [_jsx("h4", { className: "mb-2", children: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" }), _jsx("hr", { className: "mb-3" }), _jsxs("form", { onSubmit: loginHandler, children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "email", className: "form-label", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("input", { id: "email", type: "email", className: "form-control", onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "password", className: "form-label", children: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" }), _jsx("input", { id: "password", type: "password", className: "form-control", onChange: (e) => setPassword(e.target.value) })] }), _jsx("button", { type: "submit", className: "btn btn-primary", children: "\u062F\u062E\u0648\u0644" })] })] }) }) }));
};
export default Login;
