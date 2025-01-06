import {
  useGetAllLogsQuery,
  useDeleteLogMutation,
} from "./inventoryLogsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import AddInventoryModal from "../inventories/AddInventoryModal.tsx";
import UpdateInventoryModal from "../inventories/UpdateInventoryModal.tsx";
import { LogType } from "../../Types/InventoryLogs.ts";

const LogsList = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAllLogsQuery();

  const [deleteLog] = useDeleteLogMutation();

  const handleDeleteLog = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذه العملية؟");

    if (deleteConfirm) {
      try {
        await deleteLog(id).unwrap();
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
        <h4 className="text-center mb-2">العمليات</h4>
        <hr className="mb-3" />
        {/*<AddInventoryModal/>*/}
        <table className="table table-hover table-responsive table-striped shadow">
          <thead>
            <tr>
              <th>المخزون</th>
              <th>المورد</th>
              <th>الكمية</th>
              <th>نوع العملية</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.logs?.map((log) => (
              <tr key={log.id}>
                <td>{log.inventory!.name}</td>
                <td>{log.supplier!.name}</td>
                <td>{log.quantity}</td>
                <td>{LogType[log.type]}</td>
                <td>
                  <Link
                    to={`/inventories/${log.id}`}
                    className="btn btn-success btn-sm me-2"
                  >
                    <BsInfoCircle />
                  </Link>
                  {/*<UpdateInventoryModal id={log.id}/>*/}
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return content;
};

export default LogsList;
