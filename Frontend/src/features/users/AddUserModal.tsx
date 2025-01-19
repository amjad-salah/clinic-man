import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddUserMutation } from "./usersApiSlice.ts";
import { clearCredentials } from "./authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { UserRole } from "../../Types/UserType.ts";

const AddUserModal = () => {
  const [addUser] = useAddUserMutation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addUser({
        fullName,
        email,
        password,
        role: parseInt(role),
      }).unwrap();

      toast.success("تمت إضافة المستخدم بنجاح");

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
      <button className="btn btn-primary mb-3" onClick={handleShow}>
        إضافة
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>إضافة مستخدم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" selected disabled>
                  اختر الصلاحية
                </option>
                {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map(
                  (key) => (
                    <option key={key} value={key}>
                      {UserRole[parseInt(key)]}
                    </option>
                  ),
                )}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddUser}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUserModal;
