import { useGetInventoryByIdQuery } from "./inventoriesApiSlice.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader.tsx";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";
import { LogType } from "../../Types/InventoryLogs.ts";

const InventoryDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useGetInventoryByIdQuery(Number(id!));

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
        <Link to="/inventories" className="btn btn-dark mb-5">
          <IoMdReturnRight />
        </Link>
        <div className="row justify-content-center mb-5">
          <div className="card card-body p-4 shadow">
            <div className="col-md-3">
              <p>
                <span className="fw-bold me-2">الإسم:</span>
                {data?.inventory!.name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span className="fw-bold me-2">الكمية:</span>
                {data?.inventory!.quantity}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span className="fw-bold me-2">الحد الأدنى:</span>
                {data?.inventory!.minQuantity}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span className="fw-bold me-2">الصلاحية:</span>
                {moment(data?.inventory!.expirationDate).format("YYYY/MM/DD")}
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
              <th>المورد</th>
              <th>نوع العملية</th>
              <th>الكمية</th>
            </tr>
          </thead>
          <tbody>
            {data?.inventory!.logs!.map((log) => (
              <tr key={log.id}>
                <td>{log.inventory!.name}</td>
                <td>{log.supplier!.name}</td>
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

export default InventoryDetails;
