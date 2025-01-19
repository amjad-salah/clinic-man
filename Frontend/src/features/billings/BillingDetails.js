import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetBillingByIdQuery, useDeleteBillingItemMutation, useDeletePaymentMutation, } from "./billingsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { BillingStatus } from "../../Types/Billings.ts";
import moment from "moment";
import AddItemModal from "./AddItemModal.tsx";
import AddPaymentModal from "./AddPaymentModal.tsx";
const BillingDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, error, isError } = useGetBillingByIdQuery(parseInt(id));
    const [deleteBillingItem] = useDeleteBillingItemMutation();
    const [deletePayment] = useDeletePaymentMutation();
    const handleDeleteBillingItem = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا العنصر؟");
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
    const handleDeletePayment = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا الدفع؟");
        if (deleteConfirm) {
            try {
                await deletePayment(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/bills", className: "btn btn-dark mb-5 d-print-none", children: _jsx(IoMdReturnRight, {}) }), _jsxs("div", { className: "card card-body p-4 mb-5 shadow", children: [_jsxs("p", { className: "mb-2", children: [_jsx("span", { className: "fw-bold me-2", children: "\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629:" }), id] }), _jsxs("p", { className: "mb-2", children: [_jsx("span", { className: "fw-bold me-2", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629:" }), moment(data?.billing.date).format("YYYY/MM/DD")] }), _jsxs("p", { className: "mb-2", children: [_jsx("span", { className: "fw-bold me-2", children: "\u0625\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644:" }), data?.billing.patient?.fullName] }), _jsxs("p", { className: "mb-2", children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u0627\u0644\u0629:" }), BillingStatus[data?.billing.status]] })] }), _jsxs("div", { className: "d-flex justify-content-between d-print-none", children: [_jsx(AddItemModal, { billingId: Number(id) }), _jsx(AddPaymentModal, { billingId: Number(id) })] }), _jsxs("table", { className: "table table-hover", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0648\u0635\u0641" }), _jsx("th", { children: "\u0627\u0644\u0643\u0645\u064A\u0629" }), _jsx("th", { children: "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629" }), _jsx("th", { children: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639" }), _jsx("th", { className: "d-print-none" })] }) }), _jsxs("tbody", { children: [data?.billing.billItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.description }), _jsx("td", { children: item.quantity }), _jsx("td", { children: item.unitPrice }), _jsx("td", { children: item.total }), _jsx("td", { className: "d-print-none", children: _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteBillingItem(item.id), children: "\u0645\u0633\u062D" }) })] }, item.id))), _jsx("tr", { children: _jsx("td", { colSpan: 5 }) }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "text-end fw-bold", children: "\u0627\u0644\u0645\u062C\u0648\u0639" }), _jsx("td", { children: data?.billing.subTotal }), _jsx("td", {})] }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "text-end fw-bold", children: "\u0627\u0644\u0636\u0631\u064A\u0628\u0629" }), _jsx("td", { children: `${data?.billing.tax}%` }), _jsx("td", {})] }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "text-end fw-bold", children: "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A" }), _jsx("td", { children: data?.billing.total }), _jsx("td", {})] }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "text-end fw-bold", children: "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062F\u0641\u0648\u0639" }), _jsx("td", { children: data?.billing.paidAmount }), _jsx("td", {})] }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "text-end fw-bold", children: "\u0627\u0644\u0645\u062A\u0628\u0642\u064A" }), _jsx("td", { children: data?.billing.remainingBalance }), _jsx("td", {})] })] })] })] }));
    }
    return content;
};
export default BillingDetails;
