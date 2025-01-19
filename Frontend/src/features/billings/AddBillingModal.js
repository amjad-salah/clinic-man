import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddBillingMutation } from "./billingsApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
const AddBillingModal = () => {
    const [appointmentId, setAppointmentId] = useState("");
    const [date, setDate] = useState("");
    const [tax, setTax] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [addBilling] = useAddBillingMutation();
    const handleAddBilling = async (e) => {
        e.preventDefault();
        try {
            const res = await addBilling({
                appointmentId: Number(appointmentId),
                date: moment(date).format("YYYY-MM-DD"),
                tax: Number(tax),
            }).unwrap();
            toast.success("تمت إضافة الفاتورة بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0641\u0627\u062A\u0648\u0631\u0629" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "date", className: "form-label", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("input", { type: "date", className: "form-control", id: "date", value: date, onChange: (e) => setDate(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "appointmentId", className: "form-label", children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("input", { type: "text", id: "appointmentId", value: appointmentId, className: "form-control", onChange: (e) => setAppointmentId(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "tax", className: "form-label", children: "\u0627\u0644\u0636\u0631\u064A\u0628\u0629" }), _jsx("input", { type: "number", id: "tax", value: tax, className: "form-control", onChange: (e) => setTax(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddBilling, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddBillingModal;
