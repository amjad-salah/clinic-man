import {
  useGetAllDiagnosesQuery,
  useDeleteDiagnoseMutation,
} from "./diagnosesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DiagnosesList = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetAllDiagnosesQuery();

  const [deleteDiagnose] = useDeleteDiagnoseMutation();

  const handleDeleteDiagnose = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا التشخيص؟");

    if (deleteConfirm) {
      try {
        await deleteDiagnose(id).unwrap();
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
        <h4 className="text-center mb-2">التشخيصات</h4>
        <hr className="mb-5" />
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr>
              <th>رقم الحجز</th>
              <th>المريض</th>
              <th>التشخيص</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.diagnoses!.map((diagnose) => (
              <tr key={diagnose.id}>
                <td>{diagnose.appointmentId}</td>
                <td>{diagnose.patient.fullName}</td>
                <td>{diagnose.diagnosis}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteDiagnose(diagnose.id)}
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

export default DiagnosesList;
