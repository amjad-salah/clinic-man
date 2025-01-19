import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddScheduleMutation } from "./schedulesApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import moment from "moment";
const AddScheduleModal = () => {
    const [doctorId, setDoctorId] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addSchedule] = useAddScheduleMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const { data, isSuccess, error } = useGetAllDoctorsQuery();
    useEffect(() => {
        // @ts-ignore
        if (error && (error.status === 401 || error.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [error, navigate, dispatch]);
    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            const res = await addSchedule({
                doctorId: parseInt(doctorId),
                day: parseInt(day),
                startTime: moment(startTime, "HH:mm").format("HH:mm:ss"),
                endTime: moment(endTime, "HH:mm").format("HH:mm:ss"),
            }).unwrap();
            toast.success("تمت إضافة الجدول بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u0648\u0644\u0629 \u0637\u0628\u064A\u0628" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "doctorId", className: "form-label", children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsxs("select", { value: doctorId, id: "doctorId", className: "form-select", onChange: (e) => setDoctorId(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0637\u0628\u064A\u0628" }), isSuccess &&
                                                    data.doctors.map((doc) => (_jsx("option", { value: doc.id, children: doc.user.fullName }, doc.id)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "day", className: "form-label", children: "\u0627\u0644\u064A\u0648\u0645" }), _jsxs("select", { value: day, id: "day", className: "form-select", onChange: (e) => setDay(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u064A\u0648\u0645" }), Object.keys(DayOfWeek).map((key) => (_jsx("option", { value: key, children: DayOfWeek[parseInt(key)] }, key)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "startTime", className: "form-label", children: "\u0632\u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629" }), _jsx("input", { type: "time", id: "startTime", value: startTime, className: "form-control", onChange: (e) => setStartTime(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "endTime", className: "form-label", children: "\u0632\u0645\u0646 \u0627\u0644\u0646\u0647\u0627\u064A\u0629" }), _jsx("input", { type: "time", id: "endTime", value: endTime, className: "form-control", onChange: (e) => setEndTime(e.target.value) })] }), _jsx("div", { className: "mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary", children: "\u0625\u0636\u0627\u0641\u0629" }) })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddSchedule, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddScheduleModal;
