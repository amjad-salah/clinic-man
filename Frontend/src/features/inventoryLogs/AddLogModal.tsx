import { useAddLogMutation } from "./inventoryLogsApiSlice.ts";
import { useGetAllInventoriesQuery } from "../inventories/inventoriesApiSlice.ts";
import { useGetAllSuppliersQuery } from "../suppliers/suppliersApiSlice.ts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";
import Select from "react-select";
import { LogType } from "../../Types/InventoryLogs.ts";
import { SelectOptions } from "../../Types/Appointments.ts";

const AddLogModal = () => {
  const [inventoryId, setInventoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: supplierData,
    isSuccess: supplierSuccess,
    error: supplierError,
  } = useGetAllSuppliersQuery();

  const {
    data: inventoryData,
    isSuccess: inventorySuccess,
    error: inventoryError,
  } = useGetAllInventoriesQuery();

  const [addLog] = useAddLogMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (supplierError) {
      // @ts-ignore
      if (supplierError.status === 401 || supplierError.status === 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }

    if (inventoryError) {
      // @ts-ignore
      if (inventoryError.status === 401 || inventoryError.status === 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }
  }, [supplierError, inventoryError, navigate, dispatch]);

  const handleAddLog = async () => {
    try {
      await addLog({
        supplierId: supplierId ? Number(supplierId) : null,
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

  let suppliersOptions: SelectOptions[] = [];
  let inventoriesOptions: SelectOptions[] = [];

  if (supplierSuccess) {
    suppliersOptions = supplierData?.suppliers!.map((sup) => ({
      value: sup.id.toString(),
      label: sup.name,
    }));
  }

  if (inventorySuccess) {
    inventoriesOptions = inventoryData?.inventories!.map((inv) => ({
      value: inv.id.toString(),
      label: inv.name,
    }));
  }

  return (
    <>
      <button className="btn btn-primary mb-5" onClick={handleShow}>
        إضافة
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة</Modal.Title>
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
            <label htmlFor="supplierId" className="form-label">
              المورد
            </label>
            <Select
              id="supplierId"
              options={suppliersOptions}
              onChange={(e) => setSupplierId(e!.value)}
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
          <button className="btn btn-primary" onClick={handleAddLog}>
            إضافة
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLogModal;
