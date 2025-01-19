import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllAppointmentsQuery, useDeleteAppointmentMutation, } from "./appointmentsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import AddAppointmentModal from "./AddAppointmentModal.tsx";
const AppointmentsList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllAppointmentsQuery();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const handleDeleteAppointment = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا الحجز؟");
        if (deleteConfirm) {
            try {
                await deleteAppointment(id).unwrap();
            }
            catch (e) {
                console.log(e);
                // @ts-ignore
                toast.error(e.data.error);
            }
        }
    };
    let content = _jsx("div", {});
    if (isError) {
        console.error(error);
        // @ts-ignore
        if (error?.status == 401) {
            content = _jsx("div", { className: "alert alert-danger", children: "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644!" });
        }
        else {
            // @ts-ignore
            if (error?.status == 403) {
                content = (_jsx("div", { className: "alert alert-danger", children: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629!" }));
            }
            else {
                content = _jsx("div", { className: "alert alert-danger", children: data?.error });
            }
        }
    }
    if (isLoading) {
        content = _jsx(Loader, {});
    }
    if (isSuccess) {
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A" }), _jsx("hr", { className: "mb-3" }), _jsxs("div", { className: "d-flex justify-content-between", children: [_jsx(AddAppointmentModal, {}), _jsx(Link, { to: "/appointments/types", className: "btn btn-primary mb-3", children: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u062C\u0632" })] }), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0645\u0631\u064A\u0636", className: "form-control" }) }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("th", { children: "\u0627\u0644\u0648\u0642\u062A" }), _jsx("th", { children: "\u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx("th", { children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                    ?.appointments.filter((appointment) => {
                                    if (filter !== "") {
                                        return appointment.patient.fullName.includes(filter);
                                    }
                                    return true;
                                })
                                    .map((appointment) => (_jsxs("tr", { children: [_jsx("td", { children: appointment.id }), _jsx("td", { children: moment(appointment.date).format("YYYY/MM/DD") }), _jsx("td", { children: appointment.time }), _jsx("td", { children: appointment.patient.fullName }), _jsx("td", { children: appointment.doctor.user.fullName }), _jsxs("td", { children: [_jsx(Link, { to: `/appointments/${appointment.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteAppointment(appointment.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, appointment.id))) })] }) })] }));
    }
    return content;
};
export default AppointmentsList;
