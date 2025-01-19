import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { useDeleteDiagnoseMutation } from "../diganoses/diagnosesApiSlice.ts";
import { useDeleteTestMutation } from "../labTests/testsApiSlice.ts";
import { useDeletePrescriptionMutation } from "../prescriptions/prescriptionsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { IoPrintSharp } from "react-icons/io5";
import { AppointmentStatus } from "../../Types/Appointments.ts";
import AddDiagnoseModal from "./AddDiagnoseModal.tsx";
import AddPrescriptionModal from "./AddPrescriptionModal.tsx";
import AddTestModal from "./AddTestModal.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateTestModal from "../labTests/UpdateTestModal.tsx";
const AppointmentDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, error, isError } = useGetAppointmentByIdQuery(parseInt(id));
    const [deleteDiagnose] = useDeleteDiagnoseMutation();
    const [deleteTest] = useDeleteTestMutation();
    const [deletePrescription] = useDeletePrescriptionMutation();
    const handleDeleteDiagnose = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا التشخيص؟");
        if (deleteConfirm) {
            try {
                await deleteDiagnose(id).unwrap();
            }
            catch (e) {
                console.log(e);
                // @ts-ignore
                toast.error(e.data.error);
            }
        }
    };
    const handleDeleteTest = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا الفحص؟");
        if (deleteConfirm) {
            try {
                await deleteTest(id).unwrap();
            }
            catch (e) {
                console.log(e);
                // @ts-ignore
                toast.error(e.data.error);
            }
        }
    };
    const handleDeletePrescription = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذه الوصفة؟");
        if (deleteConfirm) {
            try {
                await deletePrescription(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/appointments", className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsx(Link, { to: `/doctors/${data?.appointment.doctorId}`, className: "btn btn-dark ms-5 mb-5", children: "\u0639\u0648\u062F\u0629 \u0644\u0644\u0637\u0628\u064A\u0628" }), _jsxs("div", { className: "card card-body p-4 mb-5 shadow", children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-6", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0645\u0631\u064A\u0636:" }), data?.appointment.patient.fullName] }) }), _jsx("div", { className: "col-md-6", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0637\u0628\u064A\u0628:" }), data?.appointment.doctor.user.fullName] }) })] }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-6", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632:" }), data?.appointment.id] }) }), _jsx("div", { className: "col-md-6", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u0627\u0644\u0629:" }), AppointmentStatus[data?.appointment.status]] }) })] }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-md-6", children: _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0629/ \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0632\u0645\u0646\u0629:" }), data?.appointment.patient.allergies] }) }) })] }), data?.appointment.billings && (_jsx(Link, { to: `/appointments/${data?.appointment.billings[0].id}/print-bill`, className: "my-3 btn btn-secondary", children: "\u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629" })), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-6", children: _jsxs("div", { className: "card card-body p-4 mb-5 shadow", children: [_jsxs("div", { className: "d-flex justify-content-between", children: [_jsx("h6", { className: "mb-2", children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635" }), _jsx(AddDiagnoseModal, {})] }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-striped table-hover table-sm mb-5", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0627\u0644\u062A\u0634\u062E\u064A\u0635" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.appointment.diagnoses.map((diagnose) => (_jsxs("tr", { children: [_jsx("td", { children: diagnose.appointmentId }), _jsx("td", { children: diagnose.diagnosis }), _jsx("td", { children: _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteDiagnose(diagnose.id), children: _jsx(FaRegTrashAlt, {}) }) })] }))) })] }), _jsxs("div", { className: "d-flex justify-content-between", children: [_jsx("h6", { className: "mb-2", children: "\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A" }), _jsxs("div", { children: [_jsx(Link, { to: `/appointments/${id}/print-tests`, className: "btn btn-secondary btn-sm me-2 mb-3", children: _jsx(IoPrintSharp, {}) }), _jsx(AddTestModal, {})] })] }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-striped table-sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0641\u062D\u0635" }), _jsx("th", { children: "\u0627\u0644\u0646\u062A\u064A\u062C\u0629" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.appointment.tests.map((test) => (_jsxs("tr", { children: [_jsx("td", { children: test.testName }), _jsx("td", { children: test.result }), _jsxs("td", { children: [_jsx(UpdateTestModal, { id: test.id }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeleteTest(test.id), children: _jsx(FaRegTrashAlt, {}) })] })] }, test.id))) })] })] }) }), _jsx("div", { className: "col-md-6", children: _jsxs("div", { className: "card card-body p-4 mb-5 shadow", children: [_jsxs("div", { className: "d-flex justify-content-between", children: [_jsx("h6", { className: "mb-2", children: "\u0627\u0644\u0648\u0635\u0641\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629" }), _jsxs("div", { children: [_jsx(Link, { to: `/appointments/${id}/print-pres`, className: "btn btn-secondary btn-sm me-2 mb-3", children: _jsx(IoPrintSharp, {}) }), _jsx(AddPrescriptionModal, {})] })] }), _jsx("hr", { className: "mb-3" }), _jsxs("table", { className: "table table-striped table-sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u062F\u0648\u0627\u0621" }), _jsx("th", { children: "\u0627\u0644\u062C\u0631\u0639\u0629" }), _jsx("th", { children: "\u0627\u0644\u062A\u0643\u0631\u0627\u0631" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.appointment.prescriptions.map((pres) => (_jsxs("tr", { children: [_jsx("td", { children: pres.medicationName }), _jsx("td", { children: pres.dosage }), _jsx("td", { children: pres.frequency }), _jsx("td", { children: _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => handleDeletePrescription(pres.id), children: _jsx(FaRegTrashAlt, {}) }) })] }, pres.id))) })] })] }) })] })] }));
    }
    return content;
};
export default AppointmentDetails;
