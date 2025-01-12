import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import { useAddTypeMutation } from "./appointmentsApiSlice.ts";
import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { AppointmentStatus } from "../../Types/Appointments.ts";

const AddTypeModal = () => {
  const [name, setName] = useState("");
  const [fees, setFees] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addType] = useAddTypeMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addType({ name, fees }).unwrap();

      toast.success("تمت الإضافة بنجاح");
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
          <Modal.Title>إضافة نوع حجز</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                الإسم
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fees" className="form-label">
                السعر
              </label>
              <input
                type="number"
                id="fees"
                value={fees}
                className="form-control"
                onChange={(e) => setFees(Number(e.target.value))}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddType}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTypeModal;
