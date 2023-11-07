import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { adminLogin } from "../../redux/actions/admin/admin";
import { Toaster, toast } from "sonner";
import PropTypes from "prop-types";

export default function AdminSign({ handleActiveTab }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);
  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...");
    }
    if (error) {
      toast.error(error);
    }
  }, [isLoading, error]);
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!username) {
      return toast.error("Username cannot be empty");
    }
    if (!password) {
      return toast.error("Password cannot be empty");
    }
    dispatch(adminLogin(username, password, naviagte));
  };
  return (
    <>
      <Toaster position="bottom-center" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-48 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-black text-xl font-semibold mb-7">
            Sign in to Dashboard
          </h1>
          <form className="space-y-2" onSubmit={handleAdminLogin}>
            <div>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between"></div>
              <div className="mt-0">
                <input
                  type="password"
                  className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                Sign in
              </button>
              <button
                className="underline text-sm text-gray-500 float-left mt-2"
                onClick={() => handleActiveTab(3)}
              >
                Create New Account
              </button>
              <button
                // to="/admin/reset-password"
                className="underline text-sm text-gray-500 float-right mt-2"
                onClick={() => handleActiveTab(2)}
              >
                Forget Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

AdminSign.propTypes = {
  handleActiveTab: PropTypes.func,
};
