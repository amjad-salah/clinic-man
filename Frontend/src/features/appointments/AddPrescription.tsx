import { useAddPrescriptionMutation } from "../prescriptions/prescriptionsApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { TestStatus } from "../../Types/LabTests.ts";

const AddPrescription = () => {
  const { id } = useParams();

  const { data, isSuccess, error } = useGetAppointmentByIdQuery(parseInt(id!));

  const [addPrescription] = useAddPrescriptionMutation();

  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addPrescription({
        appointmentId: data!.appointment!.id,
        patientId: data!.appointment!.patientId,
        medicationName,
        dosage,
        frequency,
        duration,
      }).unwrap();
      toast.success("تمت إضافة الوصفة الطبية بنجاح");
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
            <h4 className="mb-2">إضافة وصفة طبية</h4>
            <hr className="mb-3" />
            <form onSubmit={handleAddPrescription}>
              <div className="mb-3">
                <label htmlFor="medicationName" className="form-label">
                  إسم الدواء
                </label>
                <input
                  type="text"
                  id="medicationName"
                  value={medicationName}
                  className="form-control"
                  onChange={(e) => setMedicationName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dosage" className="form-label">
                  الجرعة
                </label>
                <input
                  type="text"
                  id="dosage"
                  value={dosage}
                  className="form-control"
                  onChange={(e) => setDosage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="frequency" className="form-label">
                  التكرار
                </label>
                <input
                  type="text"
                  id="frequency"
                  value={frequency}
                  className="form-control"
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  المدة
                </label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  className="form-control"
                  onChange={(e) => setDuration(e.target.value)}
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

export default AddPrescription;
