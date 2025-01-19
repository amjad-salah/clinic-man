import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllUsersQuery, useDeleteUserMutation } from "./usersApiSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import AddUserModal from "./AddUserModal.tsx";
import EditUserModal from "./EditUserModal.tsx";
const UsersList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isError, error, isLoading } = useGetAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const handleDeleteUser = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا المستخدم؟");
        if (deleteConfirm) {
            try {
                await deleteUser(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" }), _jsx("hr", { className: "mb-3" }), _jsx(AddUserModal, {}), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", className: "form-control" }) }), _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { scope: "col", children: "\u0627\u0644\u0625\u0633\u0645" }), _jsx("th", { scope: "col", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("th", { scope: "col", children: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), _jsx("th", { scope: "col" })] }) }), _jsx("tbody", { children: data
                                ?.users.filter((user) => {
                                if (filter !== "") {
                                    return user.email.includes(filter);
                                }
                                return true;
                            })
                                .map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.fullName }), _jsx("td", { children: user.email }), _jsx("td", { children: UserRole[user.role] }), _jsxs("td", { children: [_jsx(EditUserModal, { id: user.id }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteUser(user.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, user.id))) })] })] }));
    }
    return content;
};
export default UsersList;
