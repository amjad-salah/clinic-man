import { useAddBillingMutation } from "./billingsApiSlice.ts";
import { clearCredentials } from "../users/authSlice.ts";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";
import { AppointmentStatus } from "../../Types/Appointments.ts";
const AddBilling = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [date, setDate] = useState("");
  const [tax, setTax] = useState("");

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
      navigate(`/bills/${res.billing!.id}`);
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
      <Link to="/billings" className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="card card-body shadow">
            <h4 className="mb-2">إضافة فاتورة</h4>
            <hr className="mb-3" />
            <form onSubmit={handleAddBilling}>
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
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBilling;
