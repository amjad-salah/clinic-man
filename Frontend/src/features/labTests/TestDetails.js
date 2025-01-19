import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetTestByIdQuery } from "./testsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { TestStatus } from "../../Types/LabTests.ts";
const TestDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, isError, error } = useGetTestByIdQuery(parseInt(id));
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/labtests", className: "btn btn-primary mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsx("h4", { className: "text-center mb-2", children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0641\u062D\u0635" }), _jsx("hr", { className: "mb-5" }), _jsxs("div", { className: "card card-body p-4", children: [_jsxs("div", { className: "row mb-4", children: [_jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0641\u062D\u0635:" }), data?.test?.testName] }) }), _jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632:" }), data?.test?.appointmentId] }) }), _jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u0627\u0644\u0629:" }), TestStatus[data?.test?.status]] }) })] }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0645\u0631\u064A\u0636:" }), data?.test?.patient.fullName] }) }), _jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0648\u0635\u0641:" }), data?.test?.description] }) }), _jsx("div", { className: "col-md-4", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0646\u062A\u064A\u062C\u0629:" }), data?.test?.result] }) })] })] })] }));
    }
    return content;
};
export default TestDetails;
