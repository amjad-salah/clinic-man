import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddDiagnoseMutation } from "../diganoses/diagnosesApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
const AddDiagnoseModal = () => {
    const { id } = useParams();
    const { data, error } = useGetAppointmentByIdQuery(parseInt(id));
    const [addDiagnose] = useAddDiagnoseMutation();
    const [diagnosis, setDiagnosis] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // @ts-ignore
        if (error && (error.status === 401 || error.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [error, navigate, dispatch]);
    const handleAddDiagnose = async (e) => {
        e.preventDefault();
        try {
            const res = await addDiagnose({
                appointmentId: data.appointment.id,
                patientId: data.appointment.patientId,
                diagnosis,
            }).unwrap();
            toast.success("تمت إضافة التشخيص بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u062A\u0634\u062E\u064A\u0635" }) }), _jsx(Modal.Body, { children: _jsx("form", { children: _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "diagnosis", className: "form-label", children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635" }), _jsx("input", { type: "text", className: "form-control", id: "diagnosis", value: diagnosis, onChange: (e) => setDiagnosis(e.target.value), required: true })] }) }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddDiagnose, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddDiagnoseModal;
