import {
  useUpdateInventoryMutation,
  useGetInventoryByIdQuery,
} from "./inventoriesApiSlice.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { clearCredentials } from "../users/authSlice.ts";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";

type UpdateInvProps = {
  id: number;
};

const UpdateInventoryModal = ({ id }: UpdateInvProps) => {
  const { data, isSuccess, error } = useGetInventoryByIdQuery(Number(id));
  const [updateInventory] = useUpdateInventoryMutation();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [expirationData, setExpirationData] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isSuccess) {
      setName(data?.inventory!.name);
      setQuantity(data?.inventory!.quantity.toString());
      setMinQuantity(data?.inventory!.minQuantity.toString());
      setExpirationData(data?.inventory!.expirationDate);
    }

    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [isSuccess, data, error, dispatch, navigate]);

  const handleUpdateInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInventory({
        id: Number(id),
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
      <button className="btn btn-primary btn-sm me-2" onClick={handleShow}>
        <FaRegEdit />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل مخزون</Modal.Title>
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
          <button className="btn btn-primary" onClick={handleUpdateInventory}>
            حفظ
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateInventoryModal;
