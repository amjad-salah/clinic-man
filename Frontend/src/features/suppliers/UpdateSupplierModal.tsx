import {
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
} from "./suppliersApiSlice.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";

type UpdateSuppProps = {
  id: number;
};

const UpdateSupplierModal = ({ id }: UpdateSuppProps) => {
  const { data, isSuccess, error } = useGetSupplierByIdQuery(id);
  const [updateSupplier] = useUpdateSupplierMutation();

  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isSuccess) {
      setName(data?.supplier!.name);
      setAddress(data?.supplier!.address);
      setContactInfo(data?.supplier!.contactInfo);
    }

    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [isSuccess, data, error, dispatch, navigate]);

  const handleUpdateSupplier = async () => {
    try {
      await updateSupplier({
        id,
        name,
        address,
        contactInfo,
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
      <button className="btn btn-primary btn-sm me-2" onClick={handleShow}>
        <FaRegEdit />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل مورد</Modal.Title>
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
          <button className="btn btn-primary" onClick={handleUpdateSupplier}>
            حفظ
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateSupplierModal;
