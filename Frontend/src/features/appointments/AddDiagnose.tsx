import { useAddDiagnoseMutation } from "../diganoses/diagnosesApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { TestStatus } from "../../Types/LabTests.ts";
import React, { useEffect, useState } from "react";

const AddDiagnose = () => {
  const { id } = useParams();

  const { data, isSuccess, error } = useGetAppointmentByIdQuery(parseInt(id!));

  const [addDiagnose] = useAddDiagnoseMutation();

  const [diagnosis, setDiagnosis] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addDiagnose({
        appointmentId: data!.appointment!.id,
        patientId: data!.appointment!.patientId,
        diagnosis,
      }).unwrap();

      toast.success("تمت إضافة التشخيص بنجاح");
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
      <Link to={`/appointments/${id}`} className="btn btn-primary mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="text-center mb-2">إضافة تشخيص</h4>
            <hr className="mb-5" />
            <form onSubmit={handleAddDiagnose}>
              <div className="mb-3">
                <label htmlFor="diagnosis" className="form-label">
                  التشخيص
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                إضافة
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDiagnose;
