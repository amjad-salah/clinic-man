import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { useDeleteDiagnoseMutation } from "../diganoses/diagnosesApiSlice.ts";
import { useDeleteTestMutation } from "../labTests/testsApiSlice.ts";
import { useDeletePrescriptionMutation } from "../prescriptions/prescriptionsApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { IoPrintSharp } from "react-icons/io5";
import { AppointmentStatus } from "../../Types/Appointments.ts";
import AddDiagnoseModal from "./AddDiagnoseModal.tsx";
import AddPrescriptionModal from "./AddPrescriptionModal.tsx";
import AddTestModal from "./AddTestModal.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateTestModal from "../labTests/UpdateTestModal.tsx";

const AppointmentDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, error, isError } =
    useGetAppointmentByIdQuery(parseInt(id!));

  const [deleteDiagnose] = useDeleteDiagnoseMutation();
  const [deleteTest] = useDeleteTestMutation();
  const [deletePrescription] = useDeletePrescriptionMutation();

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

  const handleDeleteTest = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الفحص؟");

    if (deleteConfirm) {
      try {
        await deleteTest(id).unwrap();
      } catch (e) {
        console.log(e);
        // @ts-ignore
        toast.error(e.data.error);
      }
    }
  };

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
        <Link to="/appointments" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <Link
          to={`/doctors/${data?.appointment!.doctorId}`}
          className="btn btn-dark ms-5 mb-5"
        >
          عودة للطبيب
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
          <div className="row">
            <div className="col-md-6">
              <p>
                <span className="fw-bold me-2">الحساسية/ الأمراض المزمنة:</span>
                {data?.appointment!.patient.allergies}
              </p>
            </div>
          </div>
        </div>
        {data?.appointment!.billings && (
          <Link
            to={`/appointments/${data?.appointment!.billings[0].id}/print-bill`}
            className="my-3 btn btn-secondary"
          >
            الفاتورة
          </Link>
        )}
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body p-4 mb-5 shadow">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">التشخيص</h6>
                <AddDiagnoseModal />
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-hover table-sm mb-5">
                <thead>
                  <tr>
                    <th>رقم الحجز</th>
                    <th>التشخيص</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.diagnoses!.map((diagnose) => (
                    <tr>
                      <td>{diagnose.appointmentId}</td>
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

              <div className="d-flex justify-content-between">
                <h6 className="mb-2">الفحوصات</h6>
                <div>
                  <Link
                    to={`/appointments/${id}/print-tests`}
                    className="btn btn-secondary btn-sm me-2 mb-3"
                  >
                    <IoPrintSharp />
                  </Link>
                  <AddTestModal />
                </div>
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>الفحص</th>
                    <th>النتيجة</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.tests!.map((test) => (
                    <tr key={test.id}>
                      <td>{test.testName}</td>
                      <td>{test.result}</td>
                      <td>
                        <UpdateTestModal id={test.id} />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTest(test.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-body p-4 mb-5 shadow">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">الوصفات الطبية</h6>
                <div>
                  <Link
                    to={`/appointments/${id}/print-pres`}
                    className="btn btn-secondary btn-sm me-2 mb-3"
                  >
                    <IoPrintSharp />
                  </Link>
                  <AddPrescriptionModal />
                </div>
              </div>
              <hr className="mb-3" />
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>الدواء</th>
                    <th>الجرعة</th>
                    <th>التكرار</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.appointment!.prescriptions!.map((pres) => (
                    <tr key={pres.id}>
                      <td>{pres.medicationName}</td>
                      <td>{pres.dosage}</td>
                      <td>{pres.frequency}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeletePrescription(pres.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
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
