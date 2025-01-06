import { useAddInventoryMutation } from "./inventoriesApiSlice.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";

const AddInventoryModal = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [expirationData, setExpirationData] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addInventory] = useAddInventoryMutation();

  const handleAddInventory = async () => {
    try {
      await addInventory({
        name,
        quantity: Number(quantity),
        minQuantity: Number(minQuantity),
        expirationDate: moment(expirationData).format("YYYY-MM-DD"),
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
          <Modal.Title>إضافة مخزون</Modal.Title>
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
            <label htmlFor="quantity" className="form-label">
              الكمية
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="minQuantity" className="form-label">
              الحد الأدنى
            </label>
            <input
              type="number"
              className="form-control"
              id="minQuantity"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate" className="form-label">
              تاريخ الانتهاء
            </label>
            <input
              type="date"
              className="form-control"
              id="expirationDate"
              value={expirationData}
              onChange={(e) => setExpirationData(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleAddInventory}>
            إضافة
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddInventoryModal;
