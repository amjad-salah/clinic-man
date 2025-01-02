import { useGetPrescriptionByIdQuery } from "./prescriptionsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { TestStatus } from "../../Types/LabTests.ts";

const PrescriptionDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useGetPrescriptionByIdQuery(Number(id));

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
        <Link to="/labtests" className="btn btn-primary mb-5">
          <IoMdReturnRight />
        </Link>
        <h4 className="text-center mb-2">تفاصيل وصفة طبية</h4>
        <hr className="mb-5" />
        <div className="card card-body p-4">
          <div className="row mb-4">
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">رقم الحجز:</span>
                {data?.prescription?.appointmentId}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">إسم المريض:</span>
                {data?.prescription?.patient.fullName}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">إسم الدواء:</span>
                {data?.prescription?.medicationName}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">الجرعة:</span>
                {data?.prescription?.dosage}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">التكرار:</span>
                {data?.prescription?.frequency}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">المدة:</span>
                {data?.prescription?.duration}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default PrescriptionDetails;
