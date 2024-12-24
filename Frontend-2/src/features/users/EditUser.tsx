import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useGetUserByIdQuery, useUpdateUserMutation } from "./usersApiSlice.ts";
import { clearCredentials } from "./authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { UserRole } from "../../Types/UserType.ts";

const EditUser = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, error } = useGetUserByIdQuery(
    parseInt(id!),
  );

  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      setFullName(data.user!.fullName);
      setEmail(data.user!.email);
      setRole(data.user!.role);
    }
  }, [isSuccess, data]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id: parseInt(id!),
        fullName,
        email,
        role,
      }).unwrap();

      toast.success("تم تعديل المستخدم بنجاح");
      navigate("/users");
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
      <Link to="/users" className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="mb-2">تعديل مستخدم</h4>
            <hr className="mb-3" />
            <form onSubmit={handleUpdateUser}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  الإسم
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  className="form-control"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  الصلاحية
                </label>
                <select
                  value={role}
                  id="role"
                  className="form-select"
                  onChange={(e) => setRole(parseInt(e.target.value))}
                >
                  {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map(
                    (key) => (
                      <option key={key} value={key}>
                        {UserRole[parseInt(key)]}
                      </option>
                    ),
                  )}
                </select>
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

export default EditUser;
