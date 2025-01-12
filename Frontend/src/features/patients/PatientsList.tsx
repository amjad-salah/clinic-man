import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "./patientsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Gender } from "../../Types/Patients.ts";
import { useState } from "react";
import AddPatientModal from "./AddPatientModal.tsx";
import UpdatePatientModal from "./UpdatePatientModal.tsx";

const PatientsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } = useGetPatientsQuery();

  const [deletePatient] = useDeletePatientMutation();

  const handleDeletePatient = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا المريض؟");

    if (deleteConfirm) {
      try {
        await deletePatient(id).unwrap();
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
        <h4 className="text-center mb-2">المرضى</h4>
        <hr className="mb-3" />
        <AddPatientModal tag="" />
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالإسم أو رقم الهاتف"
            className="form-control"
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الجنس</th>
                <th>رقم الهاتف</th>
                <th>العنوان</th>
                <th>العمر</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.patients!.filter((patient) => {
                  if (filter !== "") {
                    return (
                      patient.fullName.includes(filter) ||
                      patient.phoneNo.includes(filter)
                    );
                  }

                  return true;
                })
                .map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.fullName}</td>
                    <td>{Gender[patient.gender]}</td>
                    <td>{patient.phoneNo}</td>
                    <td>{patient.address}</td>
                    <td>
                      {new Date().getFullYear() -
                        new Date(patient.doB).getFullYear()}
                    </td>
                    <td>
                      <Link
                        to={`/patients/${patient.id}`}
                        className="btn btn-success btn-sm me-2"
                      >
                        <BsInfoCircle />
                      </Link>
                      <UpdatePatientModal id={patient.id} />
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeletePatient(patient.id)}
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

export default PatientsList;
