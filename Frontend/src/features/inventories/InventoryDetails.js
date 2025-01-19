import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetInventoryByIdQuery } from "./inventoriesApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";
import { LogType } from "../../Types/InventoryLogs.ts";
const InventoryDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, isError, error } = useGetInventoryByIdQuery(Number(id));
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/inventories", className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsx("div", { className: "row justify-content-center mb-5", children: _jsxs("div", { className: "card card-body p-4 shadow", children: [_jsx("div", { className: "col-md-3", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0625\u0633\u0645:" }), data?.inventory.name] }) }), _jsx("div", { className: "col-md-3", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0643\u0645\u064A\u0629:" }), data?.inventory.quantity] }) }), _jsx("div", { className: "col-md-3", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649:" }), data?.inventory.minQuantity] }) }), _jsx("div", { className: "col-md-3", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629:" }), moment(data?.inventory.expirationDate).format("YYYY/MM/DD")] }) })] }) }), _jsx("h5", { className: "text-center mb-2", children: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A" }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-hover table-striped shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646" }), _jsx("th", { children: "\u0627\u0644\u0645\u0648\u0631\u062F" }), _jsx("th", { children: "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629" }), _jsx("th", { children: "\u0627\u0644\u0643\u0645\u064A\u0629" })] }) }), _jsx("tbody", { children: data?.inventory.logs.map((log) => (_jsxs("tr", { children: [_jsx("td", { children: log.inventory.name }), _jsx("td", { children: log.supplier?.name }), _jsx("td", { children: LogType[log.type] }), _jsx("td", { children: log.quantity })] }, log.id))) })] })] }));
    }
    return content;
};
export default InventoryDetails;
