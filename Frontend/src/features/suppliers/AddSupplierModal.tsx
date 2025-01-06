import { useAddSupplierMutation } from "./suppliersApiSlice.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";

const AddSupplierModal = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addSupplier] = useAddSupplierMutation();

  const handleAddSupplier = async () => {
    try {
      await addSupplier({
        name,
        contactInfo,
        address,
      }).unwrap();

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
      <button className="btn btn-primary mb-5" onClick={handleShow}>
        إضافة
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة مورد</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              الاسم
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="contactInfo" className="form-label">
              معلومات الإتصال
            </label>
            <input
              type="text"
              className="form-control"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
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
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleAddSupplier}>
            إضافة
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSupplierModal;
