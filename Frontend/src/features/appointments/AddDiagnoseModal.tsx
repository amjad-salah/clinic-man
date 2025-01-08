import { useAddDiagnoseMutation } from "../diganoses/diagnosesApiSlice.ts";
import { useGetAppointmentByIdQuery } from "./appointmentsApiSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const AddDiagnoseModal = () => {
  const { id } = useParams();

  const { data, error } = useGetAppointmentByIdQuery(parseInt(id!));

  const [addDiagnose] = useAddDiagnoseMutation();

  const [diagnosis, setDiagnosis] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch]);

  const handleAddDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addDiagnose({
        appointmentId: data!.appointment!.id,
        patientId: data!.appointment!.patientId,
        diagnosis,
      }).unwrap();

      toast.success("تمت إضافة التشخيص بنجاح");
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
      <button className="btn btn-primary btn-sm mb-3" onClick={handleShow}>
        إضافة
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>إضافة تشخيص</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="diagnosis" className="form-label">
                التشخيص
              </label>
              <input
                type="text"
                className="form-control"
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddDiagnose}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddDiagnoseModal;
