import {
  useGetAllSuppliersQuery,
  useDeleteSupplierMutation,
} from "./suppliersApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddSupplierModal from "./AddSupplierModal.tsx";
import UpdateSupplierModal from "./UpdateSupplierModal.tsx";

const SuppliersList = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetAllSuppliersQuery();

  const [deleteSupplier] = useDeleteSupplierMutation();

  const handleDeleteSupplier = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا المورد؟");

    if (deleteConfirm) {
      try {
        await deleteSupplier(id).unwrap();
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
        <h4 className="text-center mb-2">الموردون</h4>
        <hr className="mb-3" />
        <AddSupplierModal />
        <table className="table table-hover table-responsive table-striped shadow">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>معلومات الإتصال</th>
              <th>العنوان</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.suppliers?.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contactInfo}</td>
                <td>{supplier.address}</td>
                <td>
                  <Link
                    to={`/suppliers/${supplier.id}`}
                    className="btn btn-success btn-sm me-2"
                  >
                    <BsInfoCircle />
                  </Link>
                  <UpdateSupplierModal id={supplier.id} />
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
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

export default SuppliersList;
