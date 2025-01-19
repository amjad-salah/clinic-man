import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddDoctorMutation } from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { UserRole } from "../../Types/UserType.ts";
const AddDoctorModal = () => {
    const [userId, setUserId] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // @ts-ignore
    const { data, isSuccess, error } = useGetAllUsersQuery();
    const [addDoctor] = useAddDoctorMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //   // @ts-ignore
    //   if (error && (error.status === 401 || error.status === 403)) {
    //     dispatch(clearCredentials());
    //     navigate("/login");
    //   }
    // }, [error, navigate, dispatch]);
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const res = await addDoctor({
                userId: parseInt(userId),
                phoneNo,
                specialization,
            }).unwrap();
            toast.success("تمت إضافة الطبيب بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: "\u0625\u0636\u0627\u0641\u0629" }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0637\u0628\u064A\u0628" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "userId", className: "form-label", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" }), _jsxs("select", { value: userId, id: "userId", className: "form-select", onChange: (e) => setUserId(e.target.value), children: [_jsx("option", { value: "", selected: true, disabled: true, children: "\u0625\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" }), isSuccess &&
                                                    data.users
                                                        ?.filter((user) => user.role === UserRole.Doctor)
                                                        .map((user) => (_jsx("option", { value: user.id, children: user.fullName }, user.id)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "phoneNo", className: "form-label", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), _jsx("input", { type: "text", id: "phoneNo", value: phoneNo, className: "form-control", onChange: (e) => setPhoneNo(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "specialization", className: "form-label", children: "\u0627\u0644\u062A\u062D\u0635\u0635" }), _jsx("input", { type: "text", id: "specialization", value: specialization, className: "form-control", onChange: (e) => setSpecialization(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddDoctor, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddDoctorModal;
