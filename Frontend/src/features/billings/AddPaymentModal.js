import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddPaymentMutation } from "./billingsApiSlice.ts";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
const AddPaymentModal = ({ billingId }) => {
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addPayment] = useAddPaymentMutation();
    const handleAddPayment = async () => {
        try {
            await addPayment({
                billingId,
                amount: Number(amount),
            }).unwrap();
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm mb-3", onClick: handleShow, children: "\u062F\u0641\u0639" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u062F\u0641\u0639" }) }), _jsx(Modal.Body, { children: _jsx("form", { children: _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "amount", className: "form-label", children: "\u0627\u0644\u0645\u0628\u0644\u063A" }), _jsx("input", { type: "number", className: "form-control", id: "amount", value: amount, onChange: (e) => setAmount(e.target.value) })] }) }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddPayment, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddPaymentModal;
