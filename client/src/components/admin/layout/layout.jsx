import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../navbar/sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminAuth } from "../../../redux/actions/admin/admin";

export default function Layout() {
  const location = useLocation();
  const isSign = location.pathname.includes("/admin/sign");
  const isResetPasswordPage = location.pathname === "/admin/reset-password";
  const isRegisterPage = location.pathname === "/admin/register-admin";
  const isChangePasswordPage = location.pathname === "/admin/password-change";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(adminAuth(navigate));
  }, [dispatch, navigate]);

  return (
    <>
      <div className="text-white">
        {!isSign &
          !isResetPasswordPage &
          !isRegisterPage &
          !isChangePasswordPage && <Sidebar />}
        <Outlet />
      </div>
    </>
  );
}
