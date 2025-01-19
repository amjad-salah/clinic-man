import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddInventoryMutation } from "./inventoriesApiSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
const AddInventoryModal = () => {
    const [name, setName] = useState("");
    const [minQuantity, setMinQuantity] = useState("");
    const [expirationData, setExpirationData] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addInventory] = useAddInventoryMutation();
    const handleAddInventory = async () => {
        try {
            await addInventory({
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-5", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0632\u0648\u0646" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "name", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "minQuantity", className: "form-label", children: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649" }), _jsx("input", { type: "number", className: "form-control", id: "minQuantity", value: minQuantity, onChange: (e) => setMinQuantity(e.target.value) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "expirationDate", className: "form-label", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" }), _jsx("input", { type: "date", className: "form-control", id: "expirationDate", value: expirationData, onChange: (e) => setExpirationData(e.target.value) })] })] }), _jsx(Modal.Footer, { children: _jsx("button", { className: "btn btn-primary", onClick: handleAddInventory, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddInventoryModal;
