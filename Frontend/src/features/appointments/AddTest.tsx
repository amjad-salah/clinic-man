import { useAddTestMutation } from "../labTests/testsApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { TestStatus } from "../../Types/LabTests.ts";
import React, { useEffect, useState } from "react";

const AddTest = () => {
  const { id } = useParams();

  const { data, isSuccess, error } = useGetAppointmentByIdQuery(parseInt(id!));

  const [addTest] = useAddTestMutation();

  const [testName, setTestName] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddTest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addTest({
        appointmentId: data!.appointment!.id,
        patientId: data!.appointment!.patientId,
        testName,
        status: parseInt(status),
        result,
        description,
      }).unwrap();
      toast.success("تمت إضافة الفحص بنجاح");
      navigate(`/appointments/${id}`);
    } catch (e) {
      console.log(e);

      // @ts-ignore
      if (e.status == 401 || e.status == 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
      // @ts-ignore
      toast.error(e.data.error);
    }
  };

  return (
    <>
      <Link to={`/appointments/${id}`} className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="mb-2">إضافة فحص</h4>
            <hr className="mb-3" />
            <form onSubmit={handleAddTest}>
              <div className="mb-3">
                <label htmlFor="testName" className="form-label">
                  إسم الفحص
                </label>
                <input
                  type="text"
                  id="testName"
                  value={testName}
                  className="form-control"
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  وصف الفحص
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status">حالة الفحص</label>
                <select
                  value={status}
                  id="status"
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled selected>
                    اختر الحالة
                  </option>
                  {(
                    Object.keys(TestStatus) as Array<keyof typeof TestStatus>
                  ).map((key) => (
                    <option key={key} value={key}>
                      {TestStatus[key]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="result" className="form-label">
                  النتيجة
                </label>
                <input
                  type="text"
                  id="result"
                  value={result}
                  className="form-control"
                  onChange={(e) => setResult(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTest;
