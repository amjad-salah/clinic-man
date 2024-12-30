import { useGetPatientQuery } from "./patientsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { Gender } from "../../Types/Patients.ts";

const PatientDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isError, isLoading, error } = useGetPatientQuery(
    parseInt(id!),
  );

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
        <Link to="/patients" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="row justify-content-center h-100">
          <div className="col-md-4">
            <div className="card card-body p-4 shadow h-100">
              <p>
                <span className="fw-bold me-2">الإسم:</span>
                {data?.patient!.fullName}
              </p>
              <p>
                <span className="fw-bold me-2">العمر:</span>
                {new Date().getFullYear() -
                  new Date(data?.patient!.doB).getFullYear()}
              </p>
              <p>
                <span className="fw-bold me-2">الجنس:</span>
                {Gender[data?.patient!.gender]}
              </p>
              <p>
                <span className="fw-bold me-2">رقم الهاتف:</span>
                {data?.patient!.phoneNo}
              </p>
              <h5 className="mb-2 mt-5">التشخيصات</h5>
              <hr className="mb-3" />
            </div>
          </div>
          <div className="col-md-8">
            <h5 className="mb-2 text-center">الحجوزات</h5>
            <hr className="mb-3" />
            <table className="table table-hover table-striped shadow">
              <thead>
                <tr>
                  <th>رقم الحجز</th>
                  <th>إسم الطبيب</th>
                  <th>تاريخ الحجز</th>
                  <th>زمن الحجز</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default PatientDetails;
