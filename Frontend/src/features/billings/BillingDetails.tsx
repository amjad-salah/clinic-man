import {
  useGetBillingByIdQuery,
  useDeleteBillingItemMutation,
  useDeletePaymentMutation,
} from "./billingsApiSlice.ts";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import { BillingStatus } from "../../Types/Billings.ts";
import moment from "moment";
import AddItemModal from "./AddItemModal.tsx";
import AddDoctor from "../doctors/AddDoctor.tsx";
import AddPaymentModal from "./AddPaymentModal.tsx";

const BillingDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, error, isError } = useGetBillingByIdQuery(
    parseInt(id!),
  );

  const [deleteBillingItem] = useDeleteBillingItemMutation();
  const [deletePayment] = useDeletePaymentMutation();

  const handleDeleteBillingItem = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا العنصر؟");

    if (deleteConfirm) {
      try {
        await deleteBillingItem(id).unwrap();
      } catch (e) {
        console.log(e);
        // @ts-ignore
        toast.error(e.data.error);
      }
    }
  };

  const handleDeletePayment = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الدفع؟");

    if (deleteConfirm) {
      try {
        await deletePayment(id).unwrap();
      } catch (e) {
        console.log(e);
        // @ts-ignore
        toast.error(e.data.error);
      }
    }
  };

  let content = <div></div>;

  if (isError) {
    console.error(error);
    // @ts-ignore
    if (error?.status == 401) {
      content = <div className="alert alert-danger">الرجاء تسجيل الدخول!</div>;
    } else {
      // @ts-ignore
      if (error?.status == 403) {
        content = (
          <div className="alert alert-danger">
            ليس لديك الصلاحية لمعاينة هذه الصفحة!
          </div>
        );
      } else {
        content = <div className="alert alert-danger">{data?.error}</div>;
      }
    }
  }

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <>
        <Link to="/bills" className="btn btn-dark mb-5 d-print-none">
          <IoMdReturnRight />
        </Link>
        <div className="card card-body p-4 mb-5 shadow">
          <p className="mb-2">
            <span className="fw-bold me-2">رقم الفاتورة:</span>
            {id}
          </p>
          <p className="mb-2">
            <span className="fw-bold me-2">تاريخ الفاتورة:</span>
            {moment(data?.billing!.date).format("YYYY/MM/DD")}
          </p>
          <p className="mb-2">
            <span className="fw-bold me-2">إسم العميل:</span>
            {data?.billing!.patient?.fullName}
          </p>
          <p className="mb-2">
            <span className="fw-bold me-2">الحالة:</span>
            {BillingStatus[data?.billing!.status]}
          </p>
        </div>
        <div className="d-flex justify-content-between d-print-none">
          <AddItemModal billingId={Number(id)} />
          <AddPaymentModal billingId={Number(id)} />
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>الوصف</th>
              <th>الكمية</th>
              <th>سعر الوحدة</th>
              <th>المجموع</th>
              <th className="d-print-none"></th>
            </tr>
          </thead>
          <tbody>
            {data?.billing!.billItems.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.total}</td>
                <td className="d-print-none">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteBillingItem(item.id)}
                  >
                    مسح
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                المجوع
              </td>
              <td>{data?.billing!.subTotal}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                الضريبة
              </td>
              <td>{`${data?.billing!.tax}%`}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                الإجمالي
              </td>
              <td>{data?.billing!.total}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                المبلغ المدفوع
              </td>
              <td>{data?.billing!.paidAmount}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                المتبقي
              </td>
              <td>{data?.billing!.remainingBalance}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return content;
};

export default BillingDetails;
