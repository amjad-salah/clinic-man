import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import { useAddAppointmentMutation, useGetAllTypesQuery, } from "./appointmentsApiSlice.ts";
import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { AppointmentStatus } from "../../Types/Appointments.ts";
import moment from "moment";
const AddAppointmentModal = () => {
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appointmentTypeId, setAppointmentTypeId] = useState("");
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data: patients, isSuccess: patientsSuccess, error: patientsError, } = useGetPatientsQuery();
    const { data: doctors, isSuccess: doctorsSuccess, error: doctorsError, } = useGetAllDoctorsQuery();
    const { data: typesData, isSuccess: typesSuccess, error: typesError, } = useGetAllTypesQuery();
    const [addAppointment] = useAddAppointmentMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // @ts-ignore
        if (patientsError &&
            (patientsError.status === 401 || patientsError.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
        // @ts-ignore
        if (doctorsError &&
            (doctorsError.status === 401 || doctorsError.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [patientsError, doctorsError, navigate, dispatch]);
    const handleAddAppointment = async (e) => {
        e.preventDefault();
        try {
            const res = await addAppointment({
                doctorId: parseInt(doctorId),
                patientId: parseInt(patientId),
                date: moment(date).format("YYYY-MM-DD"),
                time: moment(time, "HH:mm").format("HH:mm:ss"),
                appointmentTypeId: Number(appointmentTypeId),
                status: parseInt(status),
            }).unwrap();
            toast.success("تمت إضافة الحجز بنجاح");
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
    let doctorsOptions = [];
    let patientsOptions = [];
    let typesOptions = [];
    if (doctorsSuccess) {
        doctorsOptions = doctors.doctors.map((doctor) => ({
            value: doctor.id.toString(),
            label: doctor.user.fullName,
        }));
    }
    if (patientsSuccess) {
        patientsOptions = patients.patients.map((patient) => ({
            value: patient.id.toString(),
            label: patient.fullName,
        }));
    }
    if (typesSuccess) {
        typesOptions = typesData.appointmentTypes.map((type) => ({
            value: type.id.toString(),
            label: type.name,
        }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u062D\u062C\u0632" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx(Select, { options: patientsOptions, onChange: (e) => setPatientId(e.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsx(Select, { options: doctorsOptions, onChange: (e) => setDoctorId(e.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "date", className: "form-label", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("input", { type: "date", className: "form-control", id: "date", value: date, onChange: (e) => setDate(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "time", className: "form-label", children: "\u0627\u0644\u0632\u0645\u0646" }), _jsx("input", { type: "time", id: "time", value: time, className: "form-control", onChange: (e) => setTime(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "appointmentTypeId", className: "form-label", children: "\u0627\u0644\u063A\u0631\u0636" }), _jsx(Select, { options: typesOptions, onChange: (e) => setAppointmentTypeId(e.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "status", children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0648\u0639\u062F" }), _jsxs("select", { value: status, id: "status", className: "form-select", onChange: (e) => setStatus(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629" }), Object.keys(AppointmentStatus).map((key) => (_jsx("option", { value: key, children: AppointmentStatus[key] }, key)))] })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddAppointment, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddAppointmentModal;
