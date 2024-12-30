import {
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} from "./schedulesApiSlice.ts";
import moment from "moment";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";

const SchedulesList = () => {
  // @ts-ignore
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
        <Link to="/schedules/add" className="btn btn-primary mb-4">
          إضافة
        </Link>
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
              {data?.schedules!.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.doctor.user.fullName}</td>
                  <td>{DayOfWeek[schedule.day]}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                  <td>
                    <Link
                      to={`/schedules/edit/${schedule.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FaRegEdit />
                    </Link>
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
