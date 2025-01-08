import {
  useGetPatientQuery,
  useUpdatePatientMutation,
} from "./patientsApiSlice.ts";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { IoMdReturnRight } from "react-icons/io";
import { Gender } from "../../Types/Patients.ts";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";

type UpdatePatProps = {
  id: number;
};

const UpdatePatientModal = ({ id }: UpdatePatProps) => {
  const { data, isSuccess, error } = useGetPatientQuery(id);

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatePatient] = useUpdatePatientMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      setFullName(data?.patient!.fullName);
      setPhoneNo(data?.patient!.phoneNo);
      setGender(data?.patient!.gender.toString());
      setAddress(data?.patient!.address);
      setDob(data?.patient!.doB);
      setEmail(data?.patient!.email!);
      setAllergies(data?.patient!.allergies);
    }

    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, isSuccess, data, dispatch, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updatePatient({
        id,
        fullName,
        phoneNo,
        address,
        gender: parseInt(gender),
        email,
        doB: moment(dob).format("YYYY-MM-DD"),
        allergies,
      }).unwrap();

      toast.success("تم تحديث بيانات المريض بنجاح");

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
          <Modal.Title>تعديل مريض</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                الاسم
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender">النوع</label>
              <select
                value={gender}
                id="gender"
                className="form-select"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled selected>
                  اختر النوع
                </option>
                {(Object.keys(Gender) as Array<keyof typeof Gender>).map(
                  (key) => (
                    <option key={key} value={key}>
                      {Gender[key]}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                العنوان
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                تاريخ الميلاد
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="allergies" className="form-label">
                أمراض مزمنة/ حساسية
              </label>
              <input
                type="text"
                className="form-control"
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePatientModal;
