import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllDiagnosesQuery, useDeleteDiagnoseMutation, } from "./diagnosesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
const DiagnosesList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllDiagnosesQuery();
    const [deleteDiagnose] = useDeleteDiagnoseMutation();
    const handleDeleteDiagnose = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا التشخيص؟");
        if (deleteConfirm) {
            try {
                await deleteDiagnose(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635\u0627\u062A" }), _jsx("hr", { className: "mb-5" }), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0645\u0631\u064A\u0636", className: "form-control" }) }), _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx("th", { children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                ?.diagnoses.filter((diagnose) => {
                                if (filter !== "") {
                                    return diagnose.patient.fullName.includes(filter);
                                }
                                return true;
                            })
                                .map((diagnose) => (_jsxs("tr", { children: [_jsx("td", { children: diagnose.appointmentId }), _jsx("td", { children: diagnose.patient.fullName }), _jsx("td", { children: diagnose.diagnosis }), _jsx("td", { children: _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteDiagnose(diagnose.id), children: _jsx(FaRegTrashAlt, {}) }) })] }, diagnose.id))) })] })] }));
    }
    return content;
};
export default DiagnosesList;
