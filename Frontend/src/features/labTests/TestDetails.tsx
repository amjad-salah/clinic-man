import { useGetTestByIdQuery } from "./testsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";
import { TestStatus } from "../../Types/LabTests.ts";

const TestDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError, error } = useGetTestByIdQuery(
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
        <Link to="/labtests" className="btn btn-primary mb-5">
          <IoMdReturnRight />
        </Link>
        <h4 className="text-center mb-2">تفاصيل فحص</h4>
        <hr className="mb-5" />
        <div className="card card-body p-4">
          <div className="row mb-4">
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">الفحص:</span>
                {data?.test?.testName}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">رقم الحجز:</span>
                {data?.test?.appointmentId}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">الحالة:</span>
                {TestStatus[data?.test?.status!]}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">المريض:</span>
                {data?.test?.patient.fullName}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">الوصف:</span>
                {data?.test?.description}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">النتيجة:</span>
                {data?.test?.result}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default TestDetails;
