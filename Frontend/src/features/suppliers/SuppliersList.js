import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllSuppliersQuery, useDeleteSupplierMutation, } from "./suppliersApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddSupplierModal from "./AddSupplierModal.tsx";
import UpdateSupplierModal from "./UpdateSupplierModal.tsx";
import { useState } from "react";
const SuppliersList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllSuppliersQuery();
    const [deleteSupplier] = useDeleteSupplierMutation();
    const handleDeleteSupplier = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا المورد؟");
        if (deleteConfirm) {
            try {
                await deleteSupplier(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0645\u0648\u0631\u062F\u0648\u0646" }), _jsx("hr", { className: "mb-3" }), _jsx(AddSupplierModal, {}), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0625\u0633\u0645", className: "form-control" }) }), _jsxs("table", { className: "table table-hover table-responsive table-striped shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("th", { children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062A\u0635\u0627\u0644" }), _jsx("th", { children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                ?.suppliers.filter((supp) => {
                                if (filter !== "") {
                                    return supp.name.includes(filter);
                                }
                                return true;
                            })
                                .map((supplier) => (_jsxs("tr", { children: [_jsx("td", { children: supplier.name }), _jsx("td", { children: supplier.contactInfo }), _jsx("td", { children: supplier.address }), _jsxs("td", { children: [_jsx(Link, { to: `/suppliers/${supplier.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx(UpdateSupplierModal, { id: supplier.id }), _jsx("button", { onClick: () => handleDeleteSupplier(supplier.id), className: "btn btn-danger btn-sm", children: _jsx(FaRegTrashAlt, {}) })] })] }, supplier.id))) })] })] }));
    }
    return content;
};
export default SuppliersList;
