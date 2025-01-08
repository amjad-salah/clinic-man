import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import { useAddAppointmentMutation } from "./appointmentsApiSlice.ts";
import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { AppointmentStatus, SelectOptions } from "../../Types/Appointments.ts";
import moment from "moment";

const AddAppointmentModal = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: patients,
    isSuccess: patientsSuccess,
    error: patientsError,
  } = useGetPatientsQuery();
  const {
    data: doctors,
    isSuccess: doctorsSuccess,
    error: doctorsError,
  } = useGetAllDoctorsQuery();

  const [addAppointment] = useAddAppointmentMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (
      patientsError &&
      (patientsError.status === 401 || patientsError.status === 403)
    ) {
      dispatch(clearCredentials());
      navigate("/login");
    }

    // @ts-ignore
    if (
      doctorsError &&
      (doctorsError.status === 401 || doctorsError.status === 403)
    ) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [patientsError, doctorsError, navigate, dispatch]);

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addAppointment({
        doctorId: parseInt(doctorId),
        patientId: parseInt(patientId),
        date: moment(date).format("YYYY-MM-DD"),
        time: moment(time, "HH:mm").format("HH:mm:ss"),
        reason,
        status: parseInt(status),
      }).unwrap();

      toast.success("تمت إضافة الحجز بنجاح");
      setShow(false);
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

  let doctorsOptions: SelectOptions[] = [];
  let patientsOptions: SelectOptions[] = [];

  if (doctorsSuccess) {
    doctorsOptions = doctors!.doctors!.map((doctor) => ({
      value: doctor.id.toString(),
      label: doctor.user.fullName,
    }));
  }

  if (patientsSuccess) {
    patientsOptions = patients!.patients!.map((patient) => ({
      value: patient.id.toString(),
      label: patient.fullName,
    }));
  }

  return (
    <>
      <button className="btn btn-primary mb-3" onClick={handleShow}>
        إضافة
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>إضافة حجز</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label">
                المريض
              </label>
              <Select
                options={patientsOptions}
                onChange={(e) => setPatientId(e!.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label">
                الطبيب
              </label>
              <Select
                options={doctorsOptions}
                onChange={(e) => setDoctorId(e!.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                التاريخ
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                الزمن
              </label>
              <input
                type="time"
                id="time"
                value={time}
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                السبب
              </label>
              <input
                type="text"
                id="reason"
                value={reason}
                className="form-control"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status">حالة الموعد</label>
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
                  Object.keys(AppointmentStatus) as Array<
                    keyof typeof AppointmentStatus
                  >
                ).map((key) => (
                  <option key={key} value={key}>
                    {AppointmentStatus[key]}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddAppointment}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAppointmentModal;
