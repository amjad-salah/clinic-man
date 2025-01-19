import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddSupplierMutation } from "./suppliersApiSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
const AddSupplierModal = () => {
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addSupplier] = useAddSupplierMutation();
    const handleAddSupplier = async () => {
        try {
            await addSupplier({
                name,
                contactInfo,
                address,
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-5", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0631\u062F" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "name", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "contactInfo", className: "form-label", children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062A\u0635\u0627\u0644" }), _jsx("input", { type: "text", className: "form-control", id: "contactInfo", value: contactInfo, onChange: (e) => setContactInfo(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "address", className: "form-label", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("input", { type: "text", className: "form-control", id: "address", value: address, onChange: (e) => setAddress(e.target.value) })] })] }), _jsx(Modal.Footer, { children: _jsx("button", { className: "btn btn-primary", onClick: handleAddSupplier, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddSupplierModal;
