import { useUsageLogMutation } from "./inventoryLogsApiSlice.ts";
import { useGetAllInventoriesQuery } from "../inventories/inventoriesApiSlice.ts";
import { useGetAllSuppliersQuery } from "../suppliers/suppliersApiSlice.ts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import Select from "react-select";
import { SelectOptions } from "../../Types/Appointments.ts";

const AddLogModal = () => {
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: inventoryData,
    isSuccess: inventorySuccess,
    error: inventoryError,
  } = useGetAllInventoriesQuery();

  const [useLog] = useUsageLogMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    // @ts-ignore
    if (
      inventoryError &&
      (inventoryError.status === 401 || inventoryError.status === 403)
    ) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [inventoryError, navigate, dispatch]);

  const handleUseLog = async () => {
    try {
      await useLog({
        inventoryId: Number(inventoryId),
        description: description,
        quantity: Number(quantity),
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

  let inventoriesOptions: SelectOptions[] = [];

  if (inventorySuccess) {
    inventoriesOptions = inventoryData?.inventories!.map((inv) => ({
      value: inv.id.toString(),
      label: inv.name,
    }));
  }

  return (
    <>
      <button className="btn btn-success mb-5" onClick={handleShow}>
        إستهلاك
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إستهلاك</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label htmlFor="inventoryId" className="form-label">
              المخزون
            </label>
            <Select
              id="inventoryId"
              options={inventoriesOptions}
              onChange={(e) => setInventoryId(e!.value)}
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
            <label htmlFor="description" className="form-label">
              الوصف
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleUseLog}>
            إضافة
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLogModal;
