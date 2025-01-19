import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetDoctorByIdQuery } from "./doctorApiSlice.ts";
import { useUpdateAppointmentMutation, } from "../appointments/appointmentsApiSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { GoIssueClosed } from "react-icons/go";
import { TbCancel } from "react-icons/tb";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import moment from "moment";
import { AppointmentStatus } from "../../Types/Appointments.ts";
import AddAppointmentModal from "../appointments/AddAppointmentModal.tsx";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import AddPatientModal from "../patients/AddPatientModal.tsx";
const DoctorDetails = () => {
    const { id } = useParams();
    const { data, isSuccess, isError, isLoading, error } = useGetDoctorByIdQuery(parseInt(id));
    const [updateAppointment] = useUpdateAppointmentMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleFinishAppStatusToggle = async (appointment) => {
        try {
            await updateAppointment({
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                appointmentTypeId: appointment.appointmentTypeId,
                status: AppointmentStatus.إنتهى,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
            }).unwrap();
            toast.success("تم التعديل بنجاح");
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
    const handleCancelAppStatusToggle = async (appointment) => {
        try {
            await updateAppointment({
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                appointmentTypeId: appointment.appointmentTypeId,
                status: AppointmentStatus.ملغي,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
            }).unwrap();
            toast.success("تم التعديل بنجاح");
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
        content = (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/doctors", className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsxs("div", { className: "row justify-content-center h-100", children: [_jsx("div", { className: "col-md-4", children: _jsxs("div", { className: "card card-body p-4 shadow h-100", children: [_jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u0625\u0633\u0645:" }), data?.doctor.user.fullName] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:" }), data?.doctor.phoneNo] }), _jsxs("p", { children: [_jsx("span", { className: "fw-bold me-2", children: "\u0627\u0644\u062A\u062E\u0635\u0635:" }), data?.doctor.specialization] }), _jsx("h5", { className: "mb-2 mt-5", children: "\u0627\u0644\u062C\u062F\u0648\u0644\u0629" }), _jsx("hr", { className: "mb-3" }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover table-striped", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u064A\u0648\u0645" }), _jsx("th", { children: "\u0645\u0646" }), _jsx("th", { children: "\u0625\u0644\u0649" })] }) }), _jsx("tbody", { children: data?.doctor?.schedules.map((schedule) => (_jsxs("tr", { children: [_jsx("td", { children: DayOfWeek[schedule.day] }), _jsx("td", { children: schedule.startTime }), _jsx("td", { children: schedule.endTime })] }, schedule.id))) })] }) })] }) }), _jsxs("div", { className: "col-md-8", children: [_jsx("h4", { className: "text-center mb-2", children: "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A" }), _jsx("hr", { className: "mb-5" }), _jsxs("div", { className: "d-flex justify-content-sm-between", children: [_jsx(AddAppointmentModal, {}), _jsx(AddPatientModal, { tag: " \u0645\u0631\u064A\u0636" })] }), _jsxs("table", { className: "table table-hover table-striped shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0625\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636" }), _jsx("th", { children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", { children: "\u0646\u0648\u0639 \u0627\u0644\u062D\u062C\u0632" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data?.doctor?.appointments
                                                .filter((appointment) => appointment.status == AppointmentStatus.مقرر)
                                                .map((appointment) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx(Link, { to: `/appointments/${appointment.id}`, children: appointment.id }) }), _jsx("td", { children: appointment.patient.fullName }), _jsx("td", { children: moment(appointment.date).format("YYYY/MM/DD") }), _jsx("td", { children: appointment.appointmentType?.name }), _jsxs("td", { children: [_jsx("button", { className: "btn btn-sm btn-success me-2", onClick: () => handleFinishAppStatusToggle(appointment), children: _jsx(GoIssueClosed, {}) }), _jsx("button", { className: "btn btn-sm btn-warning", onClick: () => handleCancelAppStatusToggle(appointment), children: _jsx(TbCancel, {}) })] })] }))) })] })] })] })] }));
    }
    return content;
};
export default DoctorDetails;
