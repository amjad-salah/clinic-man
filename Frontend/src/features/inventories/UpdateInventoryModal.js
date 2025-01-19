import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useUpdateInventoryMutation, useGetInventoryByIdQuery, } from "./inventoriesApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
const UpdateInventoryModal = ({ id }) => {
    const { data, isSuccess, error } = useGetInventoryByIdQuery(Number(id));
    const [updateInventory] = useUpdateInventoryMutation();
    const [name, setName] = useState("");
    const [minQuantity, setMinQuantity] = useState("");
    const [expirationData, setExpirationData] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (isSuccess) {
            setName(data?.inventory.name);
            setMinQuantity(data?.inventory.minQuantity.toString());
            setExpirationData(data?.inventory.expirationDate);
        }
        // @ts-ignore
        if (error && (error.status === 401 || error.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [isSuccess, data, error, dispatch, navigate]);
    const handleUpdateInventory = async (e) => {
        e.preventDefault();
        try {
            await updateInventory({
                id: Number(id),
                name,
                minQuantity: Number(minQuantity),
                expirationDate: moment(expirationData).format("YYYY-MM-DD"),
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm me-2", onClick: handleShow, children: _jsx(FaRegEdit, {}) }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0632\u0648\u0646" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "name", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "minQuantity", className: "form-label", children: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649" }), _jsx("input", { type: "number", className: "form-control", id: "minQuantity", value: minQuantity, onChange: (e) => setMinQuantity(e.target.value) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "expirationDate", className: "form-label", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" }), _jsx("input", { type: "date", className: "form-control", id: "expirationDate", value: expirationData, onChange: (e) => setExpirationData(e.target.value) })] })] }), _jsx(Modal.Footer, { children: _jsx("button", { className: "btn btn-primary", onClick: handleUpdateInventory, children: "\u062D\u0641\u0638" }) })] })] }));
};
export default UpdateInventoryModal;
