import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import Loader from "../LOADER/loader";
import {
  changePassword,
  clearUserMessage,
} from "../../redux/actions/users/userActions";

export default function ChangePassword() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
      setNewPassword("");
      setOldPassword("");
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
  }, [success, error, dispatch]);
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!oldPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      return toast.error("Please enter new password");
    }
    if (newPassword.length < 6) {
      return toast.warning(
        "Your password should be at least six characters long"
      );
    }
    dispatch(changePassword(oldPassword, newPassword));
  };
  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <div className="flex justify-center my-60">
          <Loader />
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white px-8 py-4 rounded-xl my-48  dark:bg-transparent outline-none ">
          <h1 className="text-2xl font-medium text-center">Change password</h1>
          <p className="text-black/50 dark:text-white/70 text-md text-center">
            Enter your new password carefully.
          </p>
          <form action className="mt-2">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <label htmlFor="email">
                  <input
                    type="password"
                    className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                    placeholder="Enter Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>
                <input
                  type="password"
                  className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <button
                className="w-full py-2 font-medium text-white bg-primary rounded-lg dark:text-black hover:shadow inline-flex space-x-2 items-center justify-center text-sm"
                onClick={handlePasswordChange}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>

                <span>Change Password</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
