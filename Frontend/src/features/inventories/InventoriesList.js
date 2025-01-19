import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllInventoriesQuery, useDeleteInventoryMutation, } from "./inventoriesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import AddInventoryModal from "./AddInventoryModal.tsx";
import UpdateInventoryModal from "./UpdateInventoryModal.tsx";
import { useState } from "react";
const InventoriesList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllInventoriesQuery();
    const [deleteInventory] = useDeleteInventoryMutation();
    const handleDeleteInventory = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا المخزون؟");
        if (deleteConfirm) {
            try {
                await deleteInventory(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646" }), _jsx("hr", { className: "mb-3" }), _jsx(AddInventoryModal, {}), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0625\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0648\u0646", className: "form-control" }) }), _jsxs("table", { className: "table table-hover table-responsive table-striped shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("th", { children: "\u0627\u0644\u0643\u0645\u064A\u0629" }), _jsx("th", { children: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649" }), _jsx("th", { children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u062A\u0647\u0627\u0621" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                ?.inventories.filter((inventory) => {
                                if (filter !== "") {
                                    return inventory.name.includes(filter);
                                }
                                return true;
                            })
                                .map((inventory) => (_jsxs("tr", { className: inventory.quantity <= inventory.minQuantity
                                    ? "table-warning"
                                    : "", children: [_jsx("td", { children: inventory.name }), _jsx("td", { children: inventory.quantity }), _jsx("td", { children: inventory.minQuantity }), _jsx("td", { children: moment(inventory.expirationDate).format("YYYY/MM/DD") }), _jsxs("td", { children: [_jsx(Link, { to: `/inventories/${inventory.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx(UpdateInventoryModal, { id: inventory.id }), _jsx("button", { onClick: () => handleDeleteInventory(inventory.id), className: "btn btn-danger btn-sm", children: _jsx(FaRegTrashAlt, {}) })] })] }, inventory.id))) })] })] }));
    }
    return content;
};
export default InventoriesList;
