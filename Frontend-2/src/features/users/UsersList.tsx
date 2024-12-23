import { useGetAllUsersQuery } from "./usersApiSlice.ts";
import { UserRole } from "../../Types/UserType.ts";
import Loader from "../../components/Loader.tsx";

const UsersList = () => {
  // @ts-ignore
  const { data, isSuccess, isError, error, isLoading } = useGetAllUsersQuery();

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
      <table className="table table-striped table-hover">
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
