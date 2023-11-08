import { useDispatch, useSelector } from "react-redux";
import Loader from "../LOADER/loader";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useParams } from "react-router-dom";
import {
  clearUserMessage,
  newPasswordAC,
} from "../../redux/actions/users/userActions";
export default function NewPassword() {
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const token = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
  }, [success, error, dispatch]);
  const handleNewPassword = () => {
    dispatch(newPasswordAC(token, password));
  };
  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <div className="my-64 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white px-8 py-4 rounded-xl my-48  dark:bg-transparent outline-none ">
          <h1 className="text-2xl font-medium text-center">Reset password</h1>
          <p className="text-black/50 dark:text-white/70 text-md text-center">
            Enter your new password carefully.
          </p>
          <form action className="mt-2">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <input
                  type="password"
                  className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button
                className="w-full py-2 font-medium text-white bg-primary rounded-lg dark:text-black hover:shadow inline-flex space-x-2 items-center justify-center text-sm"
                onClick={handleNewPassword}
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <span>Save new password</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
