import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllTypesQuery, useDeleteTypeMutation, } from "./appointmentsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddTypeModal from "./AddTypeModal.tsx";
const TypesList = () => {
    const { data, isLoading, isError, isSuccess, error } = useGetAllTypesQuery();
    const [deleteType] = useDeleteTypeMutation();
    const handleDeleteType = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا النوع؟");
        if (deleteConfirm) {
            try {
                await deleteType(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A" }), _jsx("hr", { className: "mb-3" }), _jsx(AddTypeModal, {}), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0625\u0633\u0645" }), _jsx("th", { children: "\u0627\u0644\u0633\u0639\u0631" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.appointmentTypes.map((type) => (_jsxs("tr", { children: [_jsx("td", { children: type.name }), _jsx("td", { children: type.fees }), _jsxs("td", { children: [_jsx(Link, { to: `/appointments/types/${type.id}`, className: "btn btn-success btn-sm me-2", children: _jsx(BsInfoCircle, {}) }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteType(type.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, type.id))) })] }) })] }));
    }
    return content;
};
export default TypesList;
