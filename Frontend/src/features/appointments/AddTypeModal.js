import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { Button, Modal } from "react-bootstrap";
import { useAddTypeMutation } from "./appointmentsApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
const AddTypeModal = () => {
    const [name, setName] = useState("");
    const [fees, setFees] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addType] = useAddTypeMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleAddType = async (e) => {
        e.preventDefault();
        try {
            await addType({ name, fees }).unwrap();
            toast.success("تمت الإضافة بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u062D\u062C\u0632" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "\u0627\u0644\u0625\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "name", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "fees", className: "form-label", children: "\u0627\u0644\u0633\u0639\u0631" }), _jsx("input", { type: "number", id: "fees", value: fees, className: "form-control", onChange: (e) => setFees(Number(e.target.value)) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddType, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddTypeModal;
