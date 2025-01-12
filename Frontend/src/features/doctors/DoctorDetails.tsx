import { useGetDoctorByIdQuery } from "./doctorApiSlice.ts";
import {
  useUpdateAppointmentMutation,
  useGetAppointmentByIdQuery,
} from "../appointments/appointmentsApiSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { GoIssueClosed } from "react-icons/go";
import { TbCancel } from "react-icons/tb";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import moment from "moment";
import { AppointmentDto, AppointmentStatus } from "../../Types/Appointments.ts";
import AddAppointmentModal from "../appointments/AddAppointmentModal.tsx";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import AddPatientModal from "../patients/AddPatientModal.tsx";

const DoctorDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isError, isLoading, error } = useGetDoctorByIdQuery(
    parseInt(id!),
  );

  const [updateAppointment] = useUpdateAppointmentMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFinishAppStatusToggle = async (appointment: AppointmentDto) => {
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
    } catch (e) {
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

  const handleCancelAppStatusToggle = async (appointment: AppointmentDto) => {
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
    } catch (e) {
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
        <Link to="/doctors" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="row justify-content-center h-100">
          <div className="col-md-4">
            <div className="card card-body p-4 shadow h-100">
              <p>
                <span className="fw-bold me-2">الإسم:</span>
                {data?.doctor!.user.fullName}
              </p>
              <p>
                <span className="fw-bold me-2">رقم الهاتف:</span>
                {data?.doctor!.phoneNo}
              </p>
              <p>
                <span className="fw-bold me-2">التخصص:</span>
                {data?.doctor!.specialization}
              </p>
              <h5 className="mb-2 mt-5">الجدولة</h5>
              <hr className="mb-3" />
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>اليوم</th>
                      <th>من</th>
                      <th>إلى</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.doctor?.schedules!.map((schedule) => (
                      <tr key={schedule.id}>
                        <td>{DayOfWeek[schedule.day]}</td>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h4 className="text-center mb-2">الحجوزات</h4>
            <hr className="mb-5" />
            <div className="d-flex justify-content-sm-between">
              <AddAppointmentModal />
              <AddPatientModal tag=" مريض" />
            </div>
            <table className="table table-hover table-striped shadow">
              <thead>
                <tr>
                  <th>رقم الحجز</th>
                  <th>إسم المريض</th>
                  <th>تاريخ الحجز</th>
                  <th>نوع الحجز</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.doctor?.appointments
                  .filter(
                    (appointment) =>
                      appointment.status == AppointmentStatus.مقرر,
                  )
                  .map((appointment) => (
                    <tr>
                      <td>
                        <Link to={`/appointments/${appointment.id}`}>
                          {appointment.id}
                        </Link>
                      </td>
                      <td>{appointment.patient.fullName}</td>
                      <td>{moment(appointment.date).format("YYYY/MM/DD")}</td>
                      <td>{appointment.appointmentType?.name}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() =>
                            handleFinishAppStatusToggle(appointment)
                          }
                        >
                          <GoIssueClosed />
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleCancelAppStatusToggle(appointment)
                          }
                        >
                          <TbCancel />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default DoctorDetails;
