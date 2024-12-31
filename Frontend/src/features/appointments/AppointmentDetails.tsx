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
              <h5 className="mb-2 text-center">التشخيص</h5>
              <hr className="mb-3" />
              {/*<ul>*/}
              {/*  {data?.appointment!.diagnoses.map((diagnosis) => (*/}
              {/*    <li key={diagnosis.id}>{diagnosis.name}</li>*/}
              {/*  ))}*/}
              {/*</ul>*/}

              <h5 className="mb-2 text-center">الفحوصات</h5>
              <hr className="mb-3" />
              {/*<ul>*/}
              {/*  {data?.appointment!.diagnoses.map((diagnosis) => (*/}
              {/*    <li key={diagnosis.id}>{diagnosis.name}</li>*/}
              {/*  ))}*/}
              {/*</ul>*/}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-body p-4 mb-5 shadow">
              <h5 className="mb-2 text-center">العلاج</h5>
              <hr className="mb-3" />
              {/*<ul>*/}
              {/*  {data?.appointment!.medicines.map((medicine) => (*/}
              {/*    <li key={medicine.id}>{medicine.name}</li>*/}
              {/*  ))}*/}
              {/*</ul>*/}
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default AppointmentDetails;
