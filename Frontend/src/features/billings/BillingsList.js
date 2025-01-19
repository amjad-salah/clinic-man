import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllBillingsQuery, useDeleteBillingItemMutation, } from "./billingsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import AddBillingModal from "./AddBillingModal.tsx";
const BillingsList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllBillingsQuery();
    const [deleteBillingItem] = useDeleteBillingItemMutation();
    const handleDeleteBillingItem = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذه الفاتورة؟");
        if (deleteConfirm) {
            try {
                await deleteBillingItem(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631" }), _jsx("hr", { className: "mb-3" }), _jsx(AddBillingModal, {}), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629", className: "form-control" }) }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped table-hover", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629" }), _jsx("th", { children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), _jsx("th", { children: "\u0627\u0644\u0639\u0645\u064A\u0644" }), _jsx("th", { children: "\u0627\u0644\u0645\u0628\u0644\u063A" }), _jsx("th", { children: "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062F\u0641\u0648\u0639" }), _jsx("th", { children: "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0628\u0642\u064A" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                    ?.billings.filter((billing) => {
                                    if (filter !== "") {
                                        return billing.id.toString().includes(filter);
                                    }
                                    return true;
                                })
                                    .map((billing) => (_jsxs("tr", { children: [_jsx("td", { children: billing.id }), _jsx("td", { children: moment(billing.date).format("YYYY/MM/DD") }), _jsx("td", { children: billing.patient.fullName }), _jsx("td", { children: billing.total }), _jsx("td", { children: billing.paidAmount }), _jsx("td", { children: billing.remainingBalance }), _jsxs("td", { children: [_jsx(Link, { to: `/bills/${billing.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteBillingItem(billing.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, billing.id))) })] }) })] }));
    }
    return content;
};
export default BillingsList;
