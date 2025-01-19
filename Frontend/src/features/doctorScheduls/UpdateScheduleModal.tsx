import {
  useGetScheduleByIdQuery,
  useUpdateScheduleMutation,
} from "./schedulesApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import { FaRegEdit } from "react-icons/fa";

type UpdateDocSchProps = {
  id: number;
};

const UpdateScheduleModal = ({ id }: UpdateDocSchProps) => {
  const { data, isSuccess } = useGetScheduleByIdQuery(id);
  const {
    data: doctorsData,
    isSuccess: doctorsIsSuccess,
    error: doctorsError,
  } = useGetAllDoctorsQuery();

  const [updateSchedule] = useUpdateScheduleMutation();

  const [doctorId, setDoctorId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      setDoctorId(data!.schedule!.doctorId.toString());
      setDay(data!.schedule!.day.toString());
      setStartTime(data!.schedule!.startTime);
      setEndTime(data!.schedule!.endTime);
    }
    // @ts-ignore
    if (doctorsError) {
      // @ts-ignore
      if (doctorsError.status === 401 || doctorsError.status === 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }
  }, [isSuccess, data, doctorsError, dispatch, navigate]);

  const handleUpdateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateSchedule({
        id,
        doctorId: parseInt(doctorId),
        day: parseInt(day),
        startTime: moment(startTime, "HH:mm").format("HH:mm:ss"),
        endTime: moment(endTime, "HH:mm").format("HH:mm:ss"),
      }).unwrap();
      toast.success("تم تعديل الجدول بنجاح");

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

  return (
    <>
      <button className="btn btn-primary btn-sm me-2" onClick={handleShow}>
        <FaRegEdit />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>تعديل جدولة طبيب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="doctorId" className="form-label">
                الطبيب
              </label>
              <select
                value={doctorId}
                id="doctorId"
                className="form-select"
                onChange={(e) => setDoctorId(e.target.value)}
              >
                <option value="" disabled selected>
                  اختر الطبيب
                </option>
                {doctorsIsSuccess &&
                  doctorsData.doctors!.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.user.fullName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="day" className="form-label">
                اليوم
              </label>
              <select
                value={day}
                id="day"
                className="form-select"
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="" disabled selected>
                  اختر اليوم
                </option>
                {(Object.keys(DayOfWeek) as Array<keyof typeof DayOfWeek>).map(
                  (key) => (
                    <option key={key} value={key}>
                      {DayOfWeek[parseInt(key)]}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                زمن البداية
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                className="form-control"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                زمن النهاية
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                className="form-control"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                إضافة
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateSchedule}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateScheduleModal;
