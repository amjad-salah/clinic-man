import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddDoctorMutation } from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { UserRole } from "../../Types/UserType.ts";

const AddDoctor = () => {
  const [userId, setUserId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [specialization, setSpecialization] = useState("");

  // @ts-ignore
  const { data, isSuccess, error } = useGetAllUsersQuery();
  const [addDoctor] = useAddDoctorMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addDoctor({
        userId: parseInt(userId),
        phoneNo,
        specialization,
      }).unwrap();

      toast.success("تمت إضافة الطبيب بنجاح");
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
            <form onSubmit={handleAddDoctor}>
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
                  <option value="" selected disabled>
                    إختر المستخدم
                  </option>
                  {isSuccess &&
                    data
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

export default AddDoctor;
