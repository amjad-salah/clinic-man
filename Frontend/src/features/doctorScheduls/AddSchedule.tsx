import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddScheduleMutation } from "./schedulesApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { clearCredentials } from "../users/authSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import { DayOfWeek } from "../../Types/DoctorSchedules.ts";
import moment from "moment";

const AddSchedule = () => {
  const [doctorId, setDoctorId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [addSchedule] = useAddScheduleMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // @ts-ignore
  const { data, isSuccess, error } = useGetAllDoctorsQuery();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addSchedule({
        doctorId: parseInt(doctorId),
        day: parseInt(day),
        startTime: moment(startTime, "HH:mm").format("HH:mm:ss"),
        endTime: moment(endTime, "HH:mm").format("HH:mm:ss"),
      }).unwrap();

      toast.success("تمت إضافة الجدول بنجاح");
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
            <h4 className="mb-2">إضافة جدولة طبيب</h4>
            <hr className="mb-3" />
            <form onSubmit={handleAddSchedule}>
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
                    data.doctors!.map((doc) => (
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

export default AddSchedule;