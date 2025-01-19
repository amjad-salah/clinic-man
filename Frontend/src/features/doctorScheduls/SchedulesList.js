import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAllSchedulesQuery, useDeleteScheduleMutation, } from "./schedulesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import { useState } from "react";
import AddScheduleModal from "./AddScheduleModal.tsx";
import UpdateScheduleModal from "./UpdateScheduleModal.tsx";
const SchedulesList = () => {
    const [filter, setFilter] = useState("");
    const { data, isSuccess, isLoading, isError, error } = useGetAllSchedulesQuery();
    const [deleteSchedule] = useDeleteScheduleMutation();
    const handleDeleteSchedule = async (id) => {
        const deleteConfirm = confirm("هل تريد مسح هذا الجدول؟");
        if (deleteConfirm) {
            try {
                await deleteSchedule(id).unwrap();
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
        content = (_jsxs(_Fragment, { children: [_jsx("h4", { className: "text-center mb-2", children: "\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0623\u0637\u0628\u0627\u0621" }), _jsx("hr", { className: "mb-3" }), _jsx(AddScheduleModal, {}), _jsx("div", { className: "col-md-5 mb-5", children: _jsx("input", { type: "text", value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "\u0628\u062D\u062B \u0628\u0627\u0644\u0637\u0628\u064A\u0628", className: "form-control" }) }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped table-hover shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0627\u0644\u0637\u0628\u064A\u0628" }), _jsx("th", { children: "\u0627\u0644\u064A\u0648\u0645" }), _jsx("th", { children: "\u0632\u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629" }), _jsx("th", { children: "\u0632\u0645\u0646 \u0627\u0644\u0646\u0647\u0627\u064A\u0629" }), _jsx("th", {})] }) }), _jsx("tbody", { children: data
                                    ?.schedules.filter((schedule) => {
                                    if (filter !== "") {
                                        return schedule.doctor.user.fullName.includes(filter);
                                    }
                                    return true;
                                })
                                    .map((schedule) => (_jsxs("tr", { children: [_jsx("td", { children: schedule.doctor.user.fullName }), _jsx("td", { children: DayOfWeek[schedule.day] }), _jsx("td", { children: schedule.startTime }), _jsx("td", { children: schedule.endTime }), _jsxs("td", { children: [_jsx(UpdateScheduleModal, { id: schedule.id }), _jsx("button", { onClick: () => handleDeleteSchedule(schedule.id), className: "btn btn-sm btn-danger", children: _jsx(FaRegTrashAlt, {}) })] })] }, schedule.id))) })] }) })] }));
    }
    return content;
};
export default SchedulesList;
