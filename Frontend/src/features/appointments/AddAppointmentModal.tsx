import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import {
  useAddAppointmentMutation,
  useGetAllTypesQuery,
} from "./appointmentsApiSlice.ts";
import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { AppointmentStatus, SelectOptions } from "../../Types/Appointments.ts";
import moment from "moment";
import AddPatientModal from "../patients/AddPatientModal.tsx";

const AddAppointmentModal = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentTypeId, setAppointmentTypeId] = useState("");
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

  const {
    data: typesData,
    isSuccess: typesSuccess,
    error: typesError,
  } = useGetAllTypesQuery();

  const [addAppointment] = useAddAppointmentMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (patientsError) {
      // @ts-ignore
      if (patientsError.status === 401 || patientsError.status === 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }

    if (doctorsError) {
      // @ts-ignore
      if (doctorsError.status === 401 || doctorsError.status === 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
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
        appointmentTypeId: Number(appointmentTypeId),
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
  let typesOptions: SelectOptions[] = [];

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

  if (typesSuccess) {
    typesOptions = typesData!.appointmentTypes!.map((type) => ({
      value: type.id.toString(),
      label: type.name,
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
              <label htmlFor="appointmentTypeId" className="form-label">
                الغرض
              </label>
              <Select
                options={typesOptions}
                onChange={(e) => setAppointmentTypeId(e!.value)}
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
