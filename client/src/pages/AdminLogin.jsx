import { useState } from "react";
import AdminSign from "../components/admin/sign";
import ResetPasswordAdmin from "../components/admin/ResetPassword-admin";
// import ChangePasswordAdmin from "../components/admin/ChangePasswordAdmin";
import RegisterAdmin from "../components/admin/RegisterAdmin";

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  return (
    <>
      {activeTab === 1 && <AdminSign handleActiveTab={handleActiveTab} />}
      {activeTab === 2 && (
        <ResetPasswordAdmin handleActiveTab={handleActiveTab} />
      )}
      {activeTab === 3 && <RegisterAdmin handleActiveTab={handleActiveTab} />}
    </>
  );
};

export default AdminLogin;
