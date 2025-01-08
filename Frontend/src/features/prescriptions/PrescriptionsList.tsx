import {
  useGetAllPrescriptionsQuery,
  useDeletePrescriptionMutation,
} from "./prescriptionsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const PrescriptionsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetAllPrescriptionsQuery();

  const [deletePrescription] = useDeletePrescriptionMutation();

  const handleDeletePrescription = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذه الوصفة؟");

    if (deleteConfirm) {
      try {
        await deletePrescription(id).unwrap();
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
        <h4 className="text-center mb-2">الوصفات</h4>
        <hr className="mb-5" />
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالمريض"
            className="form-control"
          />
        </div>
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr>
              <th>رقم الحجز</th>
              <th>المريض</th>
              <th>أسم الدواء</th>
              <th>الجرعة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.prescriptions!.filter((pres) => {
                if (filter !== "") {
                  return pres.patient!.fullName.includes(filter);
                }

                return true;
              })
              .map((prescription) => (
                <tr key={prescription.id}>
                  <td>{prescription.appointmentId}</td>
                  <td>{prescription.patient.fullName}</td>
                  <td>{prescription.medicationName}</td>
                  <td>{prescription.dosage}</td>
                  <td>
                    <Link
                      to={`/prescriptions/${prescription.id}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      <BsInfoCircle />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeletePrescription(prescription.id)}
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

export default PrescriptionsList;
