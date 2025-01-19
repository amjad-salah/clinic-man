import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddLogMutation } from "./inventoryLogsApiSlice.ts";
import { useGetAllInventoriesQuery } from "../inventories/inventoriesApiSlice.ts";
import { useGetAllSuppliersQuery } from "../suppliers/suppliersApiSlice.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import Select from "react-select";
const AddLogModal = () => {
    const [inventoryId, setInventoryId] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data: supplierData, isSuccess: supplierSuccess, error: supplierError, } = useGetAllSuppliersQuery();
    const { data: inventoryData, isSuccess: inventorySuccess, error: inventoryError, } = useGetAllInventoriesQuery();
    const [addLog] = useAddLogMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // @ts-ignore
        if (supplierError &&
            (supplierError.status === 401 || supplierError.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
        // @ts-ignore
        if (inventoryError &&
            (inventoryError.status === 401 || inventoryError.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [supplierError, inventoryError, navigate, dispatch]);
    const handleAddLog = async () => {
        try {
            await addLog({
                supplierId: supplierId ? Number(supplierId) : null,
                inventoryId: Number(inventoryId),
                description: description,
                quantity: Number(quantity),
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
    let suppliersOptions = [];
    let inventoriesOptions = [];
    if (supplierSuccess) {
        suppliersOptions = supplierData?.suppliers.map((sup) => ({
            value: sup.id.toString(),
            label: sup.name,
        }));
    }
    if (inventorySuccess) {
        inventoriesOptions = inventoryData?.inventories.map((inv) => ({
            value: inv.id.toString(),
            label: inv.name,
        }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-5", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "inventoryId", className: "form-label", children: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646" }), _jsx(Select, { id: "inventoryId", options: inventoriesOptions, onChange: (e) => setInventoryId(e.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "supplierId", className: "form-label", children: "\u0627\u0644\u0645\u0648\u0631\u062F" }), _jsx(Select, { id: "supplierId", options: suppliersOptions, onChange: (e) => setSupplierId(e.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "quantity", className: "form-label", children: "\u0627\u0644\u0643\u0645\u064A\u0629" }), _jsx("input", { type: "number", className: "form-control", id: "quantity", value: quantity, onChange: (e) => setQuantity(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "description", className: "form-label", children: "\u0627\u0644\u0648\u0635\u0641" }), _jsx("input", { type: "text", className: "form-control", id: "description", value: description, onChange: (e) => setDescription(e.target.value) })] })] }), _jsx(Modal.Footer, { children: _jsx("button", { className: "btn btn-primary", onClick: handleAddLog, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddLogModal;
