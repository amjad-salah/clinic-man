import {
  useGetAllAppointmentsQuery,
  useDeleteAppointmentMutation,
} from "./appointmentsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import AddAppointmentModal from "./AddAppointmentModal.tsx";

const AppointmentsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetAllAppointmentsQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDeleteAppointment = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الحجز؟");

    if (deleteConfirm) {
      try {
        await deleteAppointment(id).unwrap();
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
        <h4 className="text-center mb-2">الحجوزات</h4>
        <hr className="mb-3" />
        <div className="d-flex justify-content-between">
          <AddAppointmentModal />
          <Link to="/appointments/types" className="btn btn-primary mb-3">
            أنواع الحجز
          </Link>
        </div>
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالمريض"
            className="form-control"
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow">
            <thead>
              <tr>
                <th>رقم الحجز</th>
                <th>التاريخ</th>
                <th>الوقت</th>
                <th>المريض</th>
                <th>الطبيب</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.appointments!.filter((appointment) => {
                  if (filter !== "") {
                    return appointment.patient.fullName.includes(filter);
                  }

                  return true;
                })
                .map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{moment(appointment.date).format("YYYY/MM/DD")}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.patient.fullName}</td>
                    <td>{appointment.doctor.user.fullName}</td>
                    <td>
                      <Link
                        to={`/appointments/${appointment.id}`}
                        className="btn btn-success btn-sm me-2"
                      >
                        <BsInfoCircle />
                      </Link>
                      {/*<Link*/}
                      {/*  to={`/appointments/edit/${appointment.id}`}*/}
                      {/*  className="btn btn-primary btn-sm me-2"*/}
                      {/*>*/}
                      {/*  <FaRegEdit />*/}
                      {/*</Link>*/}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAppointment(appointment.id)}
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

export default AppointmentsList;
