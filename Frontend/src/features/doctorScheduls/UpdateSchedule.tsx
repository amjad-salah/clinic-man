import {
  useGetScheduleByIdQuery,
  useUpdateScheduleMutation,
} from "./schedulesApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdReturnRight } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
const UpdateSchedule = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetScheduleByIdQuery(parseInt(id!));
  // @ts-ignore
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
    if (
      doctorsError &&
      (doctorsError.status === 401 || doctorsError.status === 403)
    ) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [isSuccess, data, doctorsError, dispatch, navigate]);

  const handleUpdateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateSchedule({
        id: parseInt(id!),
        doctorId: parseInt(doctorId),
        day: parseInt(day),
        startTime: moment(startTime, "HH:mm").format("HH:mm:ss"),
        endTime: moment(endTime, "HH:mm").format("HH:mm:ss"),
      }).unwrap();
      toast.success("تم تعديل الجدول بنجاح");
      navigate("/schedules");
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
      <Link to="/schedules" className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="mb-2">تعديل جدولة طبيب</h4>
            <hr className="mb-3" />
            <form onSubmit={handleUpdateSchedule}>
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
                  {isSuccess &&
                    doctorsData?.doctors!.map((doc) => (
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
                  {(
                    Object.keys(DayOfWeek) as Array<keyof typeof DayOfWeek>
                  ).map((key) => (
                    <option key={key} value={key}>
                      {DayOfWeek[parseInt(key)]}
                    </option>
                  ))}
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
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSchedule;
