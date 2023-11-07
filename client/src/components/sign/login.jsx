import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
  clearUserMessage,
  loginUser,
} from "../../redux/actions/users/userActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const nowLoading = useSelector((state) => state.user.isLoading);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    if (!/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!password) {
      toast.error("Please enter password");
      return;
    }
    dispatch(loginUser(email, password, navigate));
  };

  useEffect(() => {
    if (nowLoading) {
      toast.loading("Please Wait....");
      dispatch(clearUserMessage());
    }
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
  }, [success, error, nowLoading, dispatch]);

  return (
    <>
      <Toaster position="bottom-center" />
      <div
        className="bg-white dark:bg-inherit  rounded-2xl w-screen md:max-w-md lg:max-w-full md:mx-auto   md:w-1/2 xl:w-1/3  px-6 lg:px-16 xl:px-12
  flex items-center justify-center py-20 "
      >
        <div className="w-full h-100 border-1 border-neutral-200   py-12 px-8 rounded-2xl dark:border-neutral-800 max-sm:px-0 max-sm:border-none">
          <h1 className="text-xl md:text-2xl dark:text-white font-semibold text-start">
            Login your account
          </h1>
          <h1 className="text-sm text-black/50 dark:text-white/60 mt-2">
            Enter your email and password for login
          </h1>
          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="block dark:text-white text-sm">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block dark:text-white text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 text-sm py-2 text-primary/60 dark:text-white/70 dark:placeholder:text-white/60 rounded-lg bg-transparent mt-2
          dark:focus:border-white/50 focus:border-neutral-500 focus:outline-none  border-1 border-zinc-300 dark:border-neutral-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right mt-2">
              <Link
                to="/reset-password"
                className="text-sm font-semibold text-black/60 hover:text-black transition-all dark:text-white/60 dark:hover:text-white"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full block text-sm bg-primary transition-all dark:text-black text-white font-semibold rounded-lg
        px-4 py-2 mt-1"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-sm text-black/50 dark:text-white/60">
            Need an account?{" "}
            <Link
              to="/sign"
              className=" text-neutral-800 dark:text-white font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
