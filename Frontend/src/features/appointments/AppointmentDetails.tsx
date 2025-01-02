import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { AppointmentStatus } from "../../Types/Appointments.ts";

const AppointmentDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, error, isError } =
    useGetAppointmentByIdQuery(parseInt(id!));

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
        <Link to="/appointments" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="card card-body p-4 mb-5 shadow">
          <div className="row">
            <div className="col-md-6">
              <p>
                <span className="fw-bold me-2">المريض:</span>
                {data?.appointment!.patient.fullName}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <span className="fw-bold me-2">الطبيب:</span>
                {data?.appointment!.doctor.user.fullName}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>
                <span className="fw-bold me-2">رقم الحجز:</span>
                {data?.appointment!.id}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <span className="fw-bold me-2">الحالة:</span>
                {AppointmentStatus[data?.appointment!.status]}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body p-4 mb-5 shadow">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">التشخيص</h6>
                <Link
                  to={`/appointments/${id}/add-diagnose`}
                  className="btn btn-primary btn-sm"
                >
                  إضافة
                </Link>
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th>رقم الحجز</th>
                    <th>التشخيص</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.diagnoses!.map((diagnose) => (
                    <tr>
                      <td>{diagnose.appointmentId}</td>
                      <td>{diagnose.diagnosis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between">
                <h6 className="mb-2">الفحوصات</h6>
                <Link
                  to={`/appointments/${id}/add-test`}
                  className="btn btn-primary btn-sm"
                >
                  إضافة
                </Link>
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>الفحص</th>
                    <th>النتيجة</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.tests!.map((test) => (
                    <tr key={test.id}>
                      <td>{test.testName}</td>
                      <td>{test.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-body p-4 mb-5 shadow">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">العلاج</h6>
                <Link
                  to={`/appointments/${id}/add-prescription`}
                  className="btn btn-primary btn-sm"
                >
                  إضافة
                </Link>
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>الدواء</th>
                    <th>الجرعة</th>
                    <th>التكرار</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.prescriptions!.map((pres) => (
                    <tr key={pres.id}>
                      <td>{pres.medicationName}</td>
                      <td>{pres.dosage}</td>
                      <td>{pres.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default AppointmentDetails;
