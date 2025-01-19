import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetScheduleByIdQuery, useUpdateScheduleMutation, } from "./schedulesApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import { FaRegEdit } from "react-icons/fa";
const UpdateScheduleModal = ({ id }) => {
    const { data, isSuccess } = useGetScheduleByIdQuery(id);
    // @ts-ignore
    const { data: doctorsData, isSuccess: doctorsIsSuccess, error: doctorsError, } = useGetAllDoctorsQuery();
    const [updateSchedule] = useUpdateScheduleMutation();
    const [doctorId, setDoctorId] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isSuccess) {
            setDoctorId(data.schedule.doctorId.toString());
            setDay(data.schedule.day.toString());
            setStartTime(data.schedule.startTime);
            setEndTime(data.schedule.endTime);
        }
        // @ts-ignore
        if (doctorsError &&
            (doctorsError.status === 401 || doctorsError.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [isSuccess, data, doctorsError, dispatch, navigate]);
    const handleUpdateSchedule = async (e) => {
        e.preventDefault();
        try {
            const res = await updateSchedule({
                id,
                doctorId: parseInt(doctorId),
                day: parseInt(day),
                startTime: moment(startTime, "HH:mm").format("HH:mm:ss"),
                endTime: moment(endTime, "HH:mm").format("HH:mm:ss"),
            }).unwrap();
            toast.success("تم تعديل الجدول بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm me-2", onClick: handleShow, children: _jsx(FaRegEdit, {}) }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u062A\u0639\u062F\u064A\u0644 \u062C\u062F\u0648\u0644\u0629 \u0637\u0628\u064A\u0628" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "doctorId", className: "form-label", children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsxs("select", { value: doctorId, id: "doctorId", className: "form-select", onChange: (e) => setDoctorId(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0637\u0628\u064A\u0628" }), doctorsIsSuccess &&
                                                    doctorsData.doctors.map((doc) => (_jsx("option", { value: doc.id, children: doc.user.fullName }, doc.id)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "day", className: "form-label", children: "\u0627\u0644\u064A\u0648\u0645" }), _jsxs("select", { value: day, id: "day", className: "form-select", onChange: (e) => setDay(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u064A\u0648\u0645" }), Object.keys(DayOfWeek).map((key) => (_jsx("option", { value: key, children: DayOfWeek[parseInt(key)] }, key)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "startTime", className: "form-label", children: "\u0632\u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629" }), _jsx("input", { type: "time", id: "startTime", value: startTime, className: "form-control", onChange: (e) => setStartTime(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "endTime", className: "form-label", children: "\u0632\u0645\u0646 \u0627\u0644\u0646\u0647\u0627\u064A\u0629" }), _jsx("input", { type: "time", id: "endTime", value: endTime, className: "form-control", onChange: (e) => setEndTime(e.target.value) })] }), _jsx("div", { className: "mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary", children: "\u0625\u0636\u0627\u0641\u0629" }) })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleUpdateSchedule, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default UpdateScheduleModal;
