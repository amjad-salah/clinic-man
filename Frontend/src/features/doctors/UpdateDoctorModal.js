import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetDoctorByIdQuery, useUpdateDoctorMutation, } from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import { FaRegEdit } from "react-icons/fa";
const UpdateDoctorModal = ({ id }) => {
    const { data, isSuccess } = useGetDoctorByIdQuery(id);
    // @ts-ignore
    const { data: usersData, isSuccess: usersIsSuccess, error: usersError, } = useGetAllUsersQuery();
    const [updateDoctor] = useUpdateDoctorMutation();
    const [userId, setUserId] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isSuccess) {
            setUserId(data.doctor.userId.toString());
            setPhoneNo(data.doctor.phoneNo);
            setSpecialization(data.doctor.specialization);
        }
        // @ts-ignore
        // if (
        //   usersError &&
        //   (usersError.status === 401 || usersError.status === 403)
        // ) {
        //   dispatch(clearCredentials());
        //   navigate("/login");
        // }
    }, [isSuccess, data]);
    const handleUpdateDoctor = async (e) => {
        e.preventDefault();
        try {
            const res = await updateDoctor({
                id,
                userId: parseInt(userId),
                phoneNo,
                specialization,
            }).unwrap();
            toast.success("تمت تعديل الطبيب بنجاح");
            setShow(false);
        }
        catch (e) {
            console.log(e);
            // @ts-ignore
            if (e.status == 401 || e.status == 403) {
                dispatch(clearCredentials());
                navigate("/login");
            }
            // @ts-ignore
            toast.error(e.data.error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm me-2", onClick: handleShow, children: _jsx(FaRegEdit, {}) }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u062A\u0639\u062F\u064A\u0644 \u0637\u0628\u064A\u0628" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" }), _jsxs("select", { value: userId, id: "userId", className: "form-select", onChange: (e) => setUserId(e.target.value), children: [_jsx("option", { value: "", selected: true, disabled: true, children: "\u0625\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" }), usersIsSuccess &&
                                                    usersData.users
                                                        ?.filter((user) => user.role === UserRole.Doctor)
                                                        .map((user) => (_jsx("option", { value: user.id, children: user.fullName }, user.id)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "phoneNo", className: "form-label", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), _jsx("input", { type: "text", id: "phoneNo", value: phoneNo, className: "form-control", onChange: (e) => setPhoneNo(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "specialization", className: "form-label", children: "\u0627\u0644\u062A\u062D\u0635\u0635" }), _jsx("input", { type: "text", id: "specialization", value: specialization, className: "form-control", onChange: (e) => setSpecialization(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleUpdateDoctor, children: "\u062D\u0641\u0638" }) })] })] }));
};
export default UpdateDoctorModal;
