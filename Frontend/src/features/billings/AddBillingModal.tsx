import { useAddBillingMutation } from "./billingsApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
const AddBillingModal = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [date, setDate] = useState("");
  const [tax, setTax] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addBilling] = useAddBillingMutation();

  const handleAddBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addBilling({
        appointmentId: Number(appointmentId),
        date: moment(date).format("YYYY-MM-DD"),
        tax: Number(tax),
      }).unwrap();

      toast.success("تمت إضافة الفاتورة بنجاح");

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
          <Modal.Title>إضافة فاتورة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                التاريخ
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="appointmentId" className="form-label">
                رقم الحجز
              </label>
              <input
                type="text"
                id="appointmentId"
                value={appointmentId}
                className="form-control"
                onChange={(e) => setAppointmentId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tax" className="form-label">
                الضريبة
              </label>
              <input
                type="number"
                id="tax"
                value={tax}
                className="form-control"
                onChange={(e) => setTax(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddBilling}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBillingModal;
