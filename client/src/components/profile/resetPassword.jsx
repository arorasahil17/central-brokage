import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  clearUserMessage,
  forgetPassword,
} from "../../redux/actions/users/userActions";
import { Toaster, toast } from "sonner";

export default function ResetPassword() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      console.log("loading...");
      toast.loading("Please wait...");
      console.log("loading...");
      dispatch(clearUserMessage());
    }
    if (success) {
      toast.success(success);
      console.log("success", success);
      dispatch(clearUserMessage());
    }
  }, [success, isLoading, dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(forgetPassword(email));
  }
  return (
    <>
      <Toaster position="bottom-center" />
      <div className="max-w-lg mx-auto my-48 bg-white px-8 py-4 rounded-xl  dark:bg-transparent outline-none ">
        <h1 className="text-2xl font-medium text-center">Reset password</h1>
        <p className="text-black/50 dark:text-white/70 text-md text-center">
          Enter your email to get reset link
        </p>
        <form action className="mt-2">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <input
                type="email"
                className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button
              className="w-full py-2 font-medium text-white bg-primary rounded-lg dark:text-black hover:shadow inline-flex space-x-2 items-center justify-center"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <span>Reset password</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
