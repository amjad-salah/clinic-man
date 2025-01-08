import { useGetAllTestsQuery, useDeleteTestMutation } from "./testsApiSlice.ts";
import Loader from "../../components/Loader.tsx";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TestStatus } from "../../Types/LabTests.ts";
import { useState } from "react";
import UpdateTestModal from "./UpdateTestModal.tsx";

const TestsList = () => {
  const [filter, setFilter] = useState("");

  const { data, isSuccess, isLoading, isError, error } = useGetAllTestsQuery();

  const [deleteTest] = useDeleteTestMutation();

  const handleDeleteTest = async (id: number) => {
    const deleteConfirm = confirm("هل تريد مسح هذا الفحص؟");

    if (deleteConfirm) {
      try {
        await deleteTest(id).unwrap();
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
        <h4 className="text-center mb-2">الفحوصات</h4>
        <hr className="mb-5" />
        <div className="col-md-5 mb-5">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="بحث بالمريض"
            className="form-control"
          />
        </div>
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr>
              <th>رقم الحجز</th>
              <th>الفحص</th>
              <th>المريض</th>
              <th>الحالة</th>
              <th>النتيجة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data!
              .tests!.filter((test) => {
                if (filter !== "") {
                  return test.patient!.fullName.includes(filter);
                }

                return true;
              })
              .map((test) => (
                <tr key={test.id}>
                  <td>{test.appointmentId}</td>
                  <td>{test.testName}</td>
                  <td>{test.patient.fullName}</td>
                  <td>{TestStatus[test.status]}</td>
                  <td>{test.result}</td>
                  <td>
                    <Link
                      to={`/labtests/${test.id}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      <BsInfoCircle />
                    </Link>
                    <UpdateTestModal id={test.id} />
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTest(test.id)}
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

export default TestsList;
