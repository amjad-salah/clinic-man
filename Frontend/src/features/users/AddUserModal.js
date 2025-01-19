import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddUserMutation } from "./usersApiSlice.ts";
import { clearCredentials } from "./authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { UserRole } from "../../Types/UserType.ts";
const AddUserModal = () => {
    const [addUser] = useAddUserMutation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await addUser({
                fullName,
                email,
                password,
                role: parseInt(role),
            }).unwrap();
            toast.success("تمت إضافة المستخدم بنجاح");
            setShow(false);
        }
        catch (e) {
            console.log(e);
            // @ts-ignore
            if (e.status == 401 || e.status == 403) {
                dispatch(clearCredentials());
                navigate("/login");
            }
            // @ts-ignore
            toast.error(e.data.error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "fullName", className: "form-label", children: "\u0627\u0644\u0625\u0633\u0645" }), _jsx("input", { type: "text", id: "fullName", value: fullName, className: "form-control", onChange: (e) => setFullName(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "email", className: "form-label", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("input", { type: "email", id: "email", value: email, className: "form-control", onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "password", className: "form-label", children: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" }), _jsx("input", { type: "password", id: "password", value: password, className: "form-control", onChange: (e) => setPassword(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "role", className: "form-label", children: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), _jsxs("select", { value: role, id: "role", className: "form-select", onChange: (e) => setRole(e.target.value), children: [_jsx("option", { value: "", selected: true, disabled: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), Object.keys(UserRole).map((key) => (_jsx("option", { value: key, children: UserRole[parseInt(key)] }, key)))] })] }), _jsx("div", { className: "mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary", children: "\u0625\u0636\u0627\u0641\u0629" }) })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddUser, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddUserModal;
