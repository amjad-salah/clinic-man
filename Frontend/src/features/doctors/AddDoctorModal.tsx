import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { useAddDoctorMutation } from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { UserRole } from "../../Types/UserType.ts";

const AddDoctorModal = () => {
  const [userId, setUserId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>إضافة طبيب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddDoctor}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddDoctorModal;
