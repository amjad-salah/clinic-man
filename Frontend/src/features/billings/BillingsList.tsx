import {
  useGetAllBillingsQuery,
  useDeleteBillingItemMutation,
} from "./billingsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";

const BillingsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetAllBillingsQuery();

  const [deleteBillingItem] = useDeleteBillingItemMutation();

  const handleDeleteBillingItem = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذه الفاتورة؟");

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
        <h4 className="text-center mb-2">الفواتير</h4>
        <hr className="mb-3" />
        <Link to="/bills/add" className="btn btn-primary mb-4">
          إضافة
        </Link>
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث برقم الفاتورة"
            className="form-control"
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>التاريخ</th>
                <th>العميل</th>
                <th>المبلغ</th>
                <th>المبلغ المدفوع</th>
                <th>المبلغ المتبقي</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.billings!.filter((billing) => {
                  if (filter !== "") {
                    return billing.id.toString().includes(filter);
                  }

                  return true;
                })
                .map((billing) => (
                  <tr key={billing.id}>
                    <td>{billing.id}</td>
                    <td>{moment(billing.date).format("YYYY/MM/DD")}</td>
                    <td>{billing.patient!.fullName}</td>
                    <td>{billing.total}</td>
                    <td>{billing.paidAmount}</td>
                    <td>{billing.remainingBalance}</td>
                    <td>
                      <Link
                        to={`/bills/${billing.id}`}
                        className="btn btn-success btn-sm me-2"
                      >
                        <BsInfoCircle />
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteBillingItem(billing.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return content;
};

export default BillingsList;
