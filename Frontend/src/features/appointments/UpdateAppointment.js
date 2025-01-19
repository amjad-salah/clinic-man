import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import Select from "react-select";
import { useUpdateAppointmentMutation, useGetAppointmentByIdQuery, } from "./appointmentsApiSlice.ts";
import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { AppointmentStatus } from "../../Types/Appointments.ts";
import moment from "moment";
const UpdateAppointment = () => {
    const { id } = useParams();
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const { data, isSuccess, isLoading, error, isError } = useGetAppointmentByIdQuery(parseInt(id));
    const { data: patients, isSuccess: patientsSuccess, error: patientsError, } = useGetPatientsQuery();
    const { data: doctors, isSuccess: doctorsSuccess, error: doctorsError, } = useGetAllDoctorsQuery();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            setDoctorId(data.appointment.doctorId.toString());
            setPatientId(data.appointment.patientId.toString());
            setDate(data.appointment.date);
            setTime(data.appointment.time);
            setReason(data.appointment.reason);
            setStatus(data.appointment.status.toString());
        }
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
    }, [patientsError, doctorsError, navigate, dispatch, isSuccess, data]);
    const handleUpdateAppointment = async (e) => {
        e.preventDefault();
        try {
            const res = await updateAppointment({
                id: parseInt(id),
                doctorId: parseInt(doctorId),
                patientId: parseInt(patientId),
                date: moment(date).format("YYYY-MM-DD"),
                time: moment(time, "HH:mm").format("HH:mm:ss"),
                reason,
                status: parseInt(status),
            }).unwrap();
            toast.success("تم تحديث الموعد بنجاح");
            navigate("/appointments");
        }
        catch (e) {
            console.log(e);
            // @ts-ignore
            toast.error(e.data.error);
        }
    };
    let doctorsOptions = [];
    let patientsOptions = [];
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
    return (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/appointments", className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsx("div", { className: "row align-items-center justify-content-center", children: _jsx("div", { className: "col-md-8", children: _jsxs("div", { className: "card card-body shadow", children: [_jsx("h4", { className: "mb-2", children: "\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0639\u062F" }), _jsx("hr", { className: "mb-3" }), _jsxs("form", { onSubmit: handleUpdateAppointment, children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx(Select, { options: patientsOptions, onChange: (e) => setPatientId(e.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsx(Select, { options: doctorsOptions, onChange: (e) => setDoctorId(e.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "date", className: "form-label", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("input", { type: "date", className: "form-control", id: "date", value: date, onChange: (e) => setDate(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "time", className: "form-label", children: "\u0627\u0644\u0632\u0645\u0646" }), _jsx("input", { type: "time", id: "time", value: time, className: "form-control", onChange: (e) => setTime(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "reason", className: "form-label", children: "\u0627\u0644\u0633\u0628\u0628" }), _jsx("input", { type: "text", id: "reason", value: reason, className: "form-control", onChange: (e) => setReason(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "status", children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0648\u0639\u062F" }), _jsxs("select", { value: status, id: "status", className: "form-select", onChange: (e) => setStatus(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629" }), Object.keys(AppointmentStatus).map((key) => (_jsx("option", { value: key, children: AppointmentStatus[key] }, key)))] })] }), _jsx("div", { className: "mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary", children: "\u062D\u0641\u0638" }) })] })] }) }) })] }));
};
export default UpdateAppointment;
