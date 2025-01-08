import {
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "./doctorApiSlice.ts";
import { useGetAllUsersQuery } from "../users/usersApiSlice.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import { FaRegEdit } from "react-icons/fa";

type UpdateDocProps = {
  id: number;
};

const UpdateDoctorModal = ({ id }: UpdateDocProps) => {
  const { data, isSuccess } = useGetDoctorByIdQuery(id);

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        id,
        userId: parseInt(userId),
        phoneNo,
        specialization,
      }).unwrap();

      toast.success("تمت تعديل الطبيب بنجاح");

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
          <Modal.Title>تعديل طبيب</Modal.Title>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateDoctor}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateDoctorModal;
