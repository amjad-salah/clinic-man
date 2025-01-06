import { useGetSupplierByIdQuery } from "./suppliersApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";
import { LogType } from "../../Types/InventoryLogs.ts";

const SupplierDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useGetSupplierByIdQuery(Number(id!));

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
        <Link to="/suppliers" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="row justify-content-center mb-5">
          <div className="card card-body p-4 shadow">
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">الإسم:</span>
                {data?.supplier!.name}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">معلومات الإتصال:</span>
                {data?.supplier!.contactInfo}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span className="fw-bold me-2">العنوان:</span>
                {data?.supplier!.address}
              </p>
            </div>
          </div>
        </div>
        <h5 className="text-center mb-2">العمليات</h5>
        <hr className="mb-3" />
        <table className="table table-hover table-striped shadow">
          <thead>
            <tr>
              <th>المخزون</th>
              <th>نوع العملية</th>
              <th>الكمية</th>
            </tr>
          </thead>
          <tbody>
            {data?.supplier!.logs!.map((log) => (
              <tr key={log.id}>
                <td>{log.inventory!.name}</td>
                <td>{LogType[log.type]}</td>
                <td>{log.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return content;
};

export default SupplierDetails;
