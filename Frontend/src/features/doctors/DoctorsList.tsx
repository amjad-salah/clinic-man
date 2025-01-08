import {
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
} from "./doctorApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const DoctorsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetAllDoctorsQuery();

  const [deleteDoctor] = useDeleteDoctorMutation();

  const handleDeleteDoctor = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الطبيب؟");

    if (deleteConfirm) {
      try {
        await deleteDoctor(id).unwrap();
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
        <h4 className="text-center mb-2">الأطباء</h4>
        <hr className="mb-3" />
        <Link to="/doctors/add" className="btn btn-primary mb-4">
          إضافة
        </Link>
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالإسم أو رقم الهاتف"
            className="form-control"
          />
        </div>
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr>
              <th>الإسم</th>
              <th>رقم الهاتف</th>
              <th>التخصص</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.doctors!.filter((doctor) => {
                if (filter !== "") {
                  return (
                    doctor.user!.fullName.includes(filter) ||
                    doctor.phoneNo.includes(filter)
                  );
                }

                return true;
              })
              .map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.user.fullName}</td>
                  <td>{doctor.phoneNo}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      <BsInfoCircle />
                    </Link>
                    <Link
                      to={`/doctors/edit/${doctor.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  return content;
};

export default DoctorsList;
