import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";

import { useLoginMutation } from "./usersApiSlice.ts";
import { setCredentials } from "./authSlice.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const [login] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          fullName: res.fullName,
          role: res.role,
          token: res.token,
        }),
      );

      navigate("/");
    } catch (e) {
      console.error(e);
      // @ts-ignore
      toast.error(e.data.error);
    }
  };

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-md-5">
        <div className="card card-body p-4 shadow">
          <h4 className="mb-2">تسجيل الدخول</h4>
          <hr className="mb-3" />
          <form onSubmit={loginHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              دخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
