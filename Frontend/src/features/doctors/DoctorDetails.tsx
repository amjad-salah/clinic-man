import { useGetDoctorByIdQuery } from "./doctorApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import React from "react";

const DoctorDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isError, isLoading, error } = useGetDoctorByIdQuery(
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
        <Link to="/doctors" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card card-body p-4 shadow">
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
            </div>
          </div>
          <div className="col-md-8">
            <h4 className="text-center mb-2">الحجوزات</h4>
            <hr className="mb-5" />
            <table className="table table-hover table-striped shadow">
              <thead>
                <tr>
                  <th>رقم الحجز</th>
                  <th>إسم المريض</th>
                  <th>تاريخ الحجز</th>
                  <th>زمن الحجز</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
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

export default DoctorDetails;
