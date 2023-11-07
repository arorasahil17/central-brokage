import { useDispatch, useSelector } from "react-redux";
import Loader from "../LOADER/loader";
import { useState } from "react";
import { forgetPassword } from "../../redux/actions/users/userActions";

export default function ResetPassword() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(forgetPassword(email));
  }
  return (
    <>
      {isLoading ? (
        <div className="my-52 flex justify-center">
          <Loader />
        </div>
      ) : success ? (
        <div className="flex justify-center my-52">
          <div id="" className="">
            <div className="relative p-4 w-[600px] h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-transparent sm:p-5">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-indigo-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>

                  {/* <span className="text-black dark:text-white">Email Sent</span> */}
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {success}
                </p>
                {/* <button
                data-modal-toggle="successModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                
              </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
