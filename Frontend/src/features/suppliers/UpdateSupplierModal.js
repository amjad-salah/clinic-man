import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetSupplierByIdQuery, useUpdateSupplierMutation, } from "./suppliersApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import { Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
const UpdateSupplierModal = ({ id }) => {
    const { data, isSuccess, error } = useGetSupplierByIdQuery(id);
    const [updateSupplier] = useUpdateSupplierMutation();
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (isSuccess) {
            setName(data?.supplier.name);
            setAddress(data?.supplier.address);
            setContactInfo(data?.supplier.contactInfo);
        }
        // @ts-ignore
        if (error && (error.status === 401 || error.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [isSuccess, data, error, dispatch, navigate]);
    const handleUpdateSupplier = async () => {
        try {
            await updateSupplier({
                id,
                name,
                address,
                contactInfo,
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm me-2", onClick: handleShow, children: _jsx(FaRegEdit, {}) }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0631\u062F" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "name", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "contactInfo", className: "form-label", children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062A\u0635\u0627\u0644" }), _jsx("input", { type: "text", className: "form-control", id: "contactInfo", value: contactInfo, onChange: (e) => setContactInfo(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "address", className: "form-label", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("input", { type: "text", className: "form-control", id: "address", value: address, onChange: (e) => setAddress(e.target.value) })] })] }), _jsx(Modal.Footer, { children: _jsx("button", { className: "btn btn-primary", onClick: handleUpdateSupplier, children: "\u062D\u0641\u0638" }) })] })] }));
};
export default UpdateSupplierModal;
