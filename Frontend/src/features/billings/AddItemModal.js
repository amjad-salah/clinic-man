import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddBillingItemMutation } from "./billingsApiSlice.ts";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
const AddItemModal = ({ billingId }) => {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addItem] = useAddBillingItemMutation();
    const handleAddItem = async () => {
        try {
            await addItem({
                billingId,
                description,
                quantity: Number(quantity),
                unitPrice: Number(unitPrice),
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "description", className: "form-label", children: "\u0627\u0644\u0648\u0635\u0641" }), _jsx("input", { type: "text", className: "form-control", id: "description", value: description, onChange: (e) => setDescription(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "quantity", className: "form-label", children: "\u0627\u0644\u0643\u0645\u064A\u0629" }), _jsx("input", { type: "number", className: "form-control", id: "quantity", value: quantity, onChange: (e) => setQuantity(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "unitPrice", className: "form-label", children: "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629" }), _jsx("input", { type: "number", className: "form-control", id: "unitPrice", value: unitPrice, onChange: (e) => setUnitPrice(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddItem, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddItemModal;
