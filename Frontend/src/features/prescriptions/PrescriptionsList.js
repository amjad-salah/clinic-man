import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllPrescriptionsQuery, useDeletePrescriptionMutation, } from "./prescriptionsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
const PrescriptionsList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllPrescriptionsQuery();
    const [deletePrescription] = useDeletePrescriptionMutation();
    const handleDeletePrescription = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذه الوصفة؟");
        if (deleteConfirm) {
            try {
                await deletePrescription(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0648\u0635\u0641\u0627\u062A" }), _jsx("hr", { className: "mb-5" }), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0645\u0631\u064A\u0636", className: "form-control" }) }), _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx("th", { children: "\u0623\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" }), _jsx("th", { children: "\u0627\u0644\u062C\u0631\u0639\u0629" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                ?.prescriptions.filter((pres) => {
                                if (filter !== "") {
                                    return pres.patient.fullName.includes(filter);
                                }
                                return true;
                            })
                                .map((prescription) => (_jsxs("tr", { children: [_jsx("td", { children: prescription.appointmentId }), _jsx("td", { children: prescription.patient.fullName }), _jsx("td", { children: prescription.medicationName }), _jsx("td", { children: prescription.dosage }), _jsxs("td", { children: [_jsx(Link, { to: `/prescriptions/${prescription.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeletePrescription(prescription.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, prescription.id))) })] })] }));
    }
    return content;
};
export default PrescriptionsList;
