import { useUpdateTestMutation, useGetTestByIdQuery } from "./testsApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { clearCredentials } from "../users/authSlice.ts";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { TestStatus } from "../../Types/LabTests.ts";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

type UpdateTestProps = {
  id: number;
};

const UpdateTestModal = ({ id }: UpdateTestProps) => {
  const { data, isSuccess, error } = useGetTestByIdQuery(id);

  const [updateTest] = useUpdateTestMutation();

  const [testName, setTestName] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [fees, setFees] = useState(0);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTestName(data?.test!.testName);
      setStatus(data?.test!.status.toString());
      setResult(data?.test!.result);
      setDescription(data?.test!.description!);
    }
    // @ts-ignore
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [error, navigate, dispatch, data]);

  const handleUpdateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateTest({
        id: data!.test!.id,
        appointmentId: data!.test!.appointmentId,
        patientId: data!.test!.patientId,
        testName,
        status: parseInt(status),
        result,
        description,
        fees,
      }).unwrap();

      toast.success("تمت تعديل الفحص بنجاح");

      setShow(false);
    } catch (e) {
      console.log(e);

      // @ts-ignore
      if (e.status == 401 || e.status == 403) {
        dispatch(clearCredentials());
        navigate("/login");
      }
      // @ts-ignore
      toast.error(e.data!.error);
    }
  };

  return (
    <>
      <button className="btn btn-primary btn-sm me-2" onClick={handleShow}>
        <FaRegEdit />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>تعديل فحص</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="testName" className="form-label">
                إسم الفحص
              </label>
              <input
                type="text"
                id="testName"
                value={testName}
                className="form-control"
                onChange={(e) => setTestName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                وصف الفحص
              </label>
              <input
                type="text"
                id="description"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status">حالة الفحص</label>
              <select
                value={status}
                id="status"
                className="form-select"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled selected>
                  اختر الحالة
                </option>
                {(
                  Object.keys(TestStatus) as Array<keyof typeof TestStatus>
                ).map((key) => (
                  <option key={key} value={key}>
                    {TestStatus[key]}
                  </option>
                ))}
              </select>
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
            <div className="mb-3">
              <label htmlFor="result" className="form-label">
                النتيجة
              </label>
              <input
                type="text"
                id="result"
                value={result}
                className="form-control"
                onChange={(e) => setResult(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateTest}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTestModal;
