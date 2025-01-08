import {
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} from "./schedulesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import { useState } from "react";
import AddScheduleModal from "./AddScheduleModal.tsx";
import UpdateScheduleModal from "./UpdateScheduleModal.tsx";

const SchedulesList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetAllSchedulesQuery();

  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleDeleteSchedule = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الجدول؟");

    if (deleteConfirm) {
      try {
        await deleteSchedule(id).unwrap();
      } catch (e) {
        console.log(e);
        // @ts-ignore
        toast.error(e.data.error);
      }
    }
  };

  let content = <div></div>;

  if (isError) {
    console.error(error);
    // @ts-ignore
    if (error?.status == 401) {
      content = <div className="alert alert-danger">الرجاء تسجيل الدخول!</div>;
    } else {
      // @ts-ignore
      if (error?.status == 403) {
        content = (
          <div className="alert alert-danger">
            ليس لديك الصلاحية لمعاينة هذه الصفحة!
          </div>
        );
      } else {
        content = <div className="alert alert-danger">{data?.error}</div>;
      }
    }
  }

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <>
        <h4 className="text-center mb-2">جدولة الأطباء</h4>
        <hr className="mb-3" />
        <AddScheduleModal />
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالطبيب"
            className="form-control"
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow">
            <thead>
              <tr>
                <th>الطبيب</th>
                <th>اليوم</th>
                <th>زمن البداية</th>
                <th>زمن النهاية</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.schedules!.filter((schedule) => {
                  if (filter !== "") {
                    return schedule.doctor!.user!.fullName.includes(filter);
                  }

                  return true;
                })
                .map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.doctor.user.fullName}</td>
                    <td>{DayOfWeek[schedule.day]}</td>
                    <td>{schedule.startTime}</td>
                    <td>{schedule.endTime}</td>
                    <td>
                      <UpdateScheduleModal id={schedule.id} />
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return content;
};

export default SchedulesList;
