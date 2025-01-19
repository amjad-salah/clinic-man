import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddPrescriptionMutation } from "../prescriptions/prescriptionsApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
const AddPrescriptionModal = () => {
    const { id } = useParams();
    const { data, isSuccess, error } = useGetAppointmentByIdQuery(parseInt(id));
    const [addPrescription] = useAddPrescriptionMutation();
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [duration, setDuration] = useState("");
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
    const handleAddPrescription = async (e) => {
        e.preventDefault();
        try {
            const res = await addPrescription({
                appointmentId: data.appointment.id,
                patientId: data.appointment.patientId,
                medicationName,
                dosage,
                frequency,
                duration,
            }).unwrap();
            toast.success("تمت إضافة الوصفة الطبية بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0648\u0635\u0641\u0629 \u0637\u0628\u064A\u0629" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "medicationName", className: "form-label", children: "\u0625\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" }), _jsx("input", { type: "text", id: "medicationName", value: medicationName, className: "form-control", onChange: (e) => setMedicationName(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "dosage", className: "form-label", children: "\u0627\u0644\u062C\u0631\u0639\u0629" }), _jsx("input", { type: "text", id: "dosage", value: dosage, className: "form-control", onChange: (e) => setDosage(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "frequency", className: "form-label", children: "\u0627\u0644\u062A\u0643\u0631\u0627\u0631" }), _jsx("input", { type: "text", id: "frequency", value: frequency, className: "form-control", onChange: (e) => setFrequency(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "duration", className: "form-label", children: "\u0627\u0644\u0645\u062F\u0629" }), _jsx("input", { type: "text", id: "duration", value: duration, className: "form-control", onChange: (e) => setDuration(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddPrescription, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddPrescriptionModal;
