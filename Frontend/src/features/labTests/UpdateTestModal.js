import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useUpdateTestMutation, useGetTestByIdQuery } from "./testsApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { TestStatus } from "../../Types/LabTests.ts";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
const UpdateTestModal = ({ id }) => {
    const { data, isSuccess, error } = useGetTestByIdQuery(id);
    const [updateTest] = useUpdateTestMutation();
    const [testName, setTestName] = useState("");
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");
    const [fees, setFees] = useState(0);
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            setTestName(data?.test.testName);
            setStatus(data?.test.status.toString());
            setResult(data?.test.result);
            setDescription(data?.test.description);
        }
        // @ts-ignore
        if (error && (error.status === 401 || error.status === 403)) {
            dispatch(clearCredentials());
            navigate("/login");
        }
    }, [error, navigate, dispatch, data]);
    const handleUpdateTest = async (e) => {
        e.preventDefault();
        try {
            const res = await updateTest({
                id: data.test.id,
                appointmentId: data.test.appointmentId,
                patientId: data.test.patientId,
                testName,
                status: parseInt(status),
                result,
                description,
                fees,
            }).unwrap();
            toast.success("تمت تعديل الفحص بنجاح");
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-primary btn-sm me-2", onClick: handleShow, children: _jsx(FaRegEdit, {}) }), _jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { children: _jsx(Modal.Title, { children: "\u062A\u0639\u062F\u064A\u0644 \u0641\u062D\u0635" }) }), _jsx(Modal.Body, { children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "testName", className: "form-label", children: "\u0625\u0633\u0645 \u0627\u0644\u0641\u062D\u0635" }), _jsx("input", { type: "text", id: "testName", value: testName, className: "form-control", onChange: (e) => setTestName(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "description", className: "form-label", children: "\u0648\u0635\u0641 \u0627\u0644\u0641\u062D\u0635" }), _jsx("input", { type: "text", id: "description", value: description, className: "form-control", onChange: (e) => setDescription(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "status", children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u062D\u0635" }), _jsxs("select", { value: status, id: "status", className: "form-select", onChange: (e) => setStatus(e.target.value), children: [_jsx("option", { value: "", disabled: true, selected: true, children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629" }), Object.keys(TestStatus).map((key) => (_jsx("option", { value: key, children: TestStatus[key] }, key)))] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "fees", className: "form-label", children: "\u0627\u0644\u0633\u0639\u0631" }), _jsx("input", { type: "number", id: "fees", value: fees, className: "form-control", onChange: (e) => setFees(Number(e.target.value)) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "result", className: "form-label", children: "\u0627\u0644\u0646\u062A\u064A\u062C\u0629" }), _jsx("input", { type: "text", id: "result", value: result, className: "form-control", onChange: (e) => setResult(e.target.value) })] })] }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "primary", onClick: handleUpdateTest, children: "\u062D\u0641\u0638" }) })] })] }));
};
export default UpdateTestModal;
