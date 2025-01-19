import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetPatientsQuery, useDeletePatientMutation, } from "./patientsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Gender } from "../../Types/Patients.ts";
import { useState } from "react";
import AddPatientModal from "./AddPatientModal.tsx";
import UpdatePatientModal from "./UpdatePatientModal.tsx";
const PatientsList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetPatientsQuery();
    const [deletePatient] = useDeletePatientMutation();
    const handleDeletePatient = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا المريض؟");
        if (deleteConfirm) {
            try {
                await deletePatient(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0645\u0631\u0636\u0649" }), _jsx("hr", { className: "mb-3" }), _jsx(AddPatientModal, { tag: "" }), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0625\u0633\u0645 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641", className: "form-control" }) }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("th", { children: "\u0627\u0644\u062C\u0646\u0633" }), _jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), _jsx("th", { children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("th", { children: "\u0627\u0644\u0639\u0645\u0631" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                    ?.patients.filter((patient) => {
                                    if (filter !== "") {
                                        return (patient.fullName.includes(filter) ||
                                            patient.phoneNo.includes(filter));
                                    }
                                    return true;
                                })
                                    .map((patient) => (_jsxs("tr", { children: [_jsx("td", { children: patient.fullName }), _jsx("td", { children: Gender[patient.gender] }), _jsx("td", { children: patient.phoneNo }), _jsx("td", { children: patient.address }), _jsx("td", { children: new Date().getFullYear() -
                                                new Date(patient.doB).getFullYear() }), _jsxs("td", { children: [_jsx(Link, { to: `/patients/${patient.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx(UpdatePatientModal, { id: patient.id }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeletePatient(patient.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, patient.id))) })] }) })] }));
    }
    return content;
};
export default PatientsList;
