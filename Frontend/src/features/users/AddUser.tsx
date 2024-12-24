import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddUserMutation } from "./usersApiSlice.ts";
import { clearCredentials } from "./authSlice.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import { UserRole } from "../../Types/UserType.ts";

const AddUser = () => {
  const [addUser] = useAddUserMutation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addUser({
        fullName,
        email,
        password,
        role,
      }).unwrap();

      toast.success("تمت إضافة المستخدم بنجاح");
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
            <h4 className="mb-2">إضافة مستخدم</h4>
            <hr className="mb-3" />
            <form onSubmit={handleAddUser}>
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
                <label htmlFor="password" className="form-label">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
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

export default AddUser;
