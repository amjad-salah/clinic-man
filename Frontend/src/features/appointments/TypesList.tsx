import {
  useGetAllTypesQuery,
  useDeleteTypeMutation,
} from "./appointmentsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddTypeModal from "./AddTypeModal.tsx";

const TypesList = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetAllTypesQuery();

  const [deleteType] = useDeleteTypeMutation();

  const handleDeleteType = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا النوع؟");

    if (deleteConfirm) {
      try {
        await deleteType(id).unwrap();
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
        <h4 className="text-center mb-2">أنواع الحجوزات</h4>
        <hr className="mb-3" />
        <AddTypeModal />
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow">
            <thead>
              <tr>
                <th>الإسم</th>
                <th>السعر</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.appointmentTypes!.map((type) => (
                <tr key={type.id}>
                  <td>{type.name}</td>
                  <td>{type.fees}</td>
                  <td>
                    <Link
                      to={`/appointments/types/${type.id}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      <BsInfoCircle />
                    </Link>
                    {/*<Link*/}
                    {/*  to={`/appointments/edit/${appointment.id}`}*/}
                    {/*  className="btn btn-primary btn-sm me-2"*/}
                    {/*>*/}
                    {/*  <FaRegEdit />*/}
                    {/*</Link>*/}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteType(type.id)}
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

export default TypesList;
