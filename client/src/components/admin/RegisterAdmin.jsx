import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { CLEAR_ADMIN, adminRegister } from "../../redux/actions/admin/admin";
import Proptypes from "prop-types";

const RegisterAdmin = ({ handleActiveTab }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const isLoading = useSelector((state) => state.admin.isLoading);
  const success = useSelector((state) => state.admin.success);
  const error = useSelector((state) => state.admin.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminRegister(formData, navigate));
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...");
    }
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_ADMIN });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ADMIN });
    }
  }, [success, error, isLoading, dispatch]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="bottom-center" />
      <div className="mt-48 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-black text-xl font-semibold mb-7">
          Create new admin account
        </h1>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <input
                type="text"
                className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                type="email"
                className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between"></div>
            <div>
              <input
                type="password"
                className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Register
            </button>
            <div className="flex justify-center">
              <button
                type="button"
                className="underline text-sm text-gray-500 float-right mt-2"
                onClick={() => handleActiveTab(1)}
              >
                Login to existing account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterAdmin.propTypes = {
  handleActiveTab: Proptypes.func,
};

export default RegisterAdmin;
