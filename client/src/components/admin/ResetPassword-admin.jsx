import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import {
  CLEAR_ADMIN,
  forgetPasswordAdmin,
} from "../../redux/actions/admin/admin";
import PropTypes from "prop-types";

const ResetPasswordAdmin = ({ handleActiveTab }) => {
  const [email, setEmail] = useState("");
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);
  const success = useSelector((state) => state.admin.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...");
      dispatch({ type: CLEAR_ADMIN });
    }
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_ADMIN });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ADMIN });
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPasswordAdmin(email, navigate));
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="bottom-center" />
      <div className="mt-48 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-black mb-6 text-xl">Reset Password</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <input
                type="text"
                className="block w-full bg-transparent rounded-md outline-none px-4 py-1.5 text-gray-500 shadow-sm border-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Reset Password
            </button>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="text-gray-500 underline text-md mt-2"
                onClick={() => handleActiveTab(1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ResetPasswordAdmin.propTypes = {
  handleActiveTab: PropTypes.func,
};

export default ResetPasswordAdmin;
