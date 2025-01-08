import {
  useGetAllInventoriesQuery,
  useDeleteInventoryMutation,
} from "./inventoriesApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import AddInventoryModal from "./AddInventoryModal.tsx";
import UpdateInventoryModal from "./UpdateInventoryModal.tsx";
import { useState } from "react";

const InventoriesList = () => {
  const [filter, setFilter] = useState("");
  const { data, isSuccess, isLoading, isError, error } =
    useGetAllInventoriesQuery();

  const [deleteInventory] = useDeleteInventoryMutation();

  const handleDeleteInventory = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا المخزون؟");

    if (deleteConfirm) {
      try {
        await deleteInventory(id).unwrap();
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
        <h4 className="text-center mb-2">المخزون</h4>
        <hr className="mb-3" />
        <AddInventoryModal />
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بإسم المخزون"
            className="form-control"
          />
        </div>
        <table className="table table-hover table-responsive table-striped shadow">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الكمية</th>
              <th>الحد الأدنى</th>
              <th>تاريخ الإنتهاء</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.inventories!.filter((inventory) => {
                if (filter !== "") {
                  return inventory.name.includes(filter);
                }

                return true;
              })
              .map((inventory) => (
                <tr
                  key={inventory.id}
                  className={
                    inventory.quantity <= inventory.minQuantity
                      ? "table-warning"
                      : ""
                  }
                >
                  <td>{inventory.name}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.minQuantity}</td>
                  <td>
                    {moment(inventory.expirationDate).format("YYYY/MM/DD")}
                  </td>
                  <td>
                    <Link
                      to={`/inventories/${inventory.id}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      <BsInfoCircle />
                    </Link>
                    <UpdateInventoryModal id={inventory.id} />
                    <button
                      onClick={() => handleDeleteInventory(inventory.id)}
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

export default InventoriesList;
