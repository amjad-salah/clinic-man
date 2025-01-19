import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetPatientQuery } from "./patientsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { Gender } from "../../Types/Patients.ts";
import moment from "moment";
const PatientDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isError, isLoading, error } = useGetPatientQuery(parseInt(id));
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/patients", className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsxs("div", { className: "row justify-content-center h-100", children: [_jsx("div", { className: "col-md-4", children: _jsxs("div", { className: "card card-body p-4 shadow h-100", children: [_jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0625\u0633\u0645:" }), data?.patient.fullName] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0639\u0645\u0631:" }), new Date().getFullYear() -
                                                new Date(data?.patient.doB).getFullYear()] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062C\u0646\u0633:" }), Gender[data?.patient.gender]] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0629/ \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0632\u0645\u0646\u0629:" }), data?.patient.allergies] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:" }), data?.patient.phoneNo] }), _jsx("h6", { className: "mb-2 mt-5", children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635\u0627\u062A" }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-striped table-hover table-sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635" })] }) }), _jsx("tbody", { children: data.patient?.diagnoses.map((diagnose) => (_jsxs("tr", { children: [_jsx("td", { children: diagnose.appointmentId }), _jsx("td", { children: diagnose.diagnosis })] }))) })] })] }) }), _jsxs("div", { className: "col-md-8", children: [_jsx("h5", { className: "mb-2 text-center", children: "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A" }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-hover table-striped table-sm shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0625\u0633\u0645 \u0627\u0644\u0637\u0628\u064A\u0628" }), _jsx("th", { children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0632\u0645\u0646 \u0627\u0644\u062D\u062C\u0632" })] }) }), _jsx("tbody", { children: data.patient?.appointments.map((appointment) => (_jsxs("tr", { children: [_jsx("td", { children: appointment.id }), _jsx("td", { children: appointment.doctor.user.fullName }), _jsx("td", { children: moment(appointment.date).format("YYYY/MM/DD") }), _jsx("td", { children: appointment.time })] }))) })] })] })] })] }));
    }
    return content;
};
export default PatientDetails;
