import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAddPatientMutation } from "./patientsApiSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Gender } from "../../Types/Patients.ts";
import moment from "moment";
const AddPatientModal = ({ tag }) => {
    const [fullName, setFullName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [allergies, setAllergies] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addPatient] = useAddPatientMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            const res = await addPatient({
                fullName,
                phoneNo,
                address,
                gender: parseInt(gender),
                email,
                doB: moment(dob).format("YYYY-MM-DD"),
                allergies,
            }).unwrap();
            toast.success("تمت إضافة المريض بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsxs("button", { className: "btn btn-primary mb-3", onClick: handleShow, children: ["\u0625\u0636\u0627\u0641\u0629", `${tag}`] }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u064A\u0636" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "fullName", className: "form-label", children: "\u0627\u0644\u0627\u0633\u0645" }), _jsx("input", { type: "text", className: "form-control", id: "fullName", value: fullName, onChange: (e) => setFullName(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "gender", children: "\u0627\u0644\u0646\u0648\u0639" }), _jsxs("select", { value: gender, id: "gender", className: "form-select", onChange: (e) => setGender(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639" }), Object.keys(Gender).map((key) => (_jsx("option", { value: key, children: Gender[key] }, key)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "phoneNo", className: "form-label", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), _jsx("input", { type: "text", className: "form-control", id: "phoneNo", value: phoneNo, onChange: (e) => setPhoneNo(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "address", className: "form-label", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("input", { type: "text", className: "form-control", id: "address", value: address, onChange: (e) => setAddress(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "dob", className: "form-label", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F" }), _jsx("input", { type: "date", className: "form-control", id: "dob", value: dob, onChange: (e) => setDob(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "email", className: "form-label", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("input", { type: "email", className: "form-control", id: "email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "allergies", className: "form-label", children: "\u0623\u0645\u0631\u0627\u0636 \u0645\u0632\u0645\u0646\u0629/ \u062D\u0633\u0627\u0633\u064A\u0629" }), _jsx("input", { type: "text", className: "form-control", id: "allergies", value: allergies, onChange: (e) => setAllergies(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleAddPatient, children: "\u0625\u0636\u0627\u0641\u0629" }) })] })] }));
};
export default AddPatientModal;
