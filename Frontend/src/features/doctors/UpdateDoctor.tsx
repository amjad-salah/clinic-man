import {
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdReturnRight } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import { UserRole } from "../../Types/UserType.ts";

const UpdateDoctor = () => {
  const { id } = useParams();

  const { data, isSuccess } = useGetDoctorByIdQuery(parseInt(id!));

  // @ts-ignore
  const {
    data: usersData,
    isSuccess: usersIsSuccess,
    error: usersError,
  } = useGetAllUsersQuery();
  const [updateDoctor] = useUpdateDoctorMutation();

  const [userId, setUserId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [specialization, setSpecialization] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      setUserId(data!.doctor!.userId.toString());
      setPhoneNo(data!.doctor!.phoneNo);
      setSpecialization(data!.doctor!.specialization);
    }

    // @ts-ignore
    if (
      usersError &&
      (usersError.status === 401 || usersError.status === 403)
    ) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [isSuccess, data, usersError, dispatch, navigate]);

  const handleUpdateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateDoctor({
        id: parseInt(id!),
        userId: parseInt(userId),
        phoneNo,
        specialization,
      }).unwrap();

      toast.success("تمت تعديل الطبيب بنجاح");
      navigate("/doctors");
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
      <Link to="/doctors" className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="mb-2">إضافة طبيب</h4>
            <hr className="mb-3" />
            <form onSubmit={handleUpdateDoctor}>
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  المستخدم
                </label>
                <select
                  value={userId}
                  id="userId"
                  className="form-select"
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {usersIsSuccess &&
                    usersData
                      .users!.filter((user) => user.role === UserRole.Doctor)
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">
                  رقم الهاتف
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  value={phoneNo}
                  className="form-control"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="specialization" className="form-label">
                  التحصص
                </label>
                <input
                  type="text"
                  id="specialization"
                  value={specialization}
                  className="form-control"
                  onChange={(e) => setSpecialization(e.target.value)}
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

export default UpdateDoctor;
