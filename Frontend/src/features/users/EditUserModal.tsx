import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useGetUserByIdQuery, useUpdateUserMutation } from "./usersApiSlice.ts";
import { clearCredentials } from "./authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { UserRole } from "../../Types/UserType.ts";
import { FaRegEdit } from "react-icons/fa";

type UpdateUserProps = {
  id: number;
};

const EditUserModal = ({ id }: UpdateUserProps) => {
  const { data, isSuccess, isLoading, error } = useGetUserByIdQuery(id);

  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        id,
        fullName,
        email,
        role,
      }).unwrap();

      toast.success("تم تعديل المستخدم بنجاح");

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
          <Modal.Title>تعديل مستخدم</Modal.Title>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateUser}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUserModal;
