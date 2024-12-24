import { useGetAllUsersQuery, useDeleteUserMutation } from "./usersApiSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UsersList = () => {
  // @ts-ignore
  const { data, isSuccess, isError, error, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا المستخدم؟");

    if (deleteConfirm) {
      try {
        await deleteUser(id).unwrap();
      } catch (e) {
        console.log(e);
        // @ts-ignore
        toast.error(e.data.error);
      }
    }
  };

  let content: JSX.Element = <div></div>;

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
        <h4 className="text-center mb-2">المستخدمين</h4>
        <hr className="mb-3" />
        <Link to="/users/add" className="btn btn-primary mb-4">
          إضافة
        </Link>
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr>
              <th scope="col">الإسم</th>
              <th scope="col">البريد الإلكتروني</th>
              <th scope="col">الصلاحية</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{UserRole[user.role]}</td>
                <td>
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(user.id)}
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

export default UsersList;
