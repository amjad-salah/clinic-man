import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { clearCredentials } from "../features/users/authSlice.ts";
import { useNavigate } from "react-router-dom";

import { FaUsers } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  return (
    <aside id="sidebar" className="expand">
      <div className="d-flex">
        <div className="sidebar-logo">
          <FaClinicMedical className="text-white" />
          <Link to="/" className="ms-2">
            عيادة
          </Link>
        </div>
      </div>
      {user ? (
        <div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="users" className="sidebar-link">
                <FaUsers />
                <span className="ms-2">المستخدمين</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="doctors" className="sidebar-link">
                <i className="lni lni-user-4"></i>
                <span>الأطباء</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to="#"
                className="sidebar-link has-dropdown collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#auth"
                aria-expanded="false"
                aria-controls="auth"
              >
                <i className="lni lni-user-4"></i>
                <span>المستخدمين</span>
              </Link>
              <ul
                id="auth"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to="#" className="sidebar-link">
                    <i className="lni lni-user-4"></i>
                    <span>المستخدمين</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="sidebar-footer">
            <span className="text-white mx-5">{user.fullName}</span>
            <br />
            <Link to="/" className="sidebar-link" onClick={handleLogout}>
              <AiOutlineLogout />
              <span className="ms-2">خروج</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sidebar-footer">
          <Link to="/login" className="sidebar-link">
            <AiOutlineLogin />
            <span className="ms-2">دخول</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
