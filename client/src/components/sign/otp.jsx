import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  clearUserMessage,
  resendOtp,
  verifyOtp,
} from "../../redux/actions/users/userActions";
import { toast, Toaster } from "sonner";

export default function Otp() {
  const [timer, setTimer] = useState(true);
  const [count, setCount] = useState(30);
  const countDownRef = useRef(null);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);

  useEffect(() => {
    countDownRef.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(countDownRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      clearInterval(countDownRef.current);
      setTimer(false);
    }
  }, [count]);
  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...");
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
    }
  }, [error, dispatch, success, isLoading]);

  let email;
  const handleResendClick = () => {
    setCount(30);
    setTimer(true);

    clearInterval(countDownRef.current);
    countDownRef.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    const user = JSON.parse(localStorage.getItem("user"));
    email = user.email;
    dispatch(resendOtp(email));
  };

  const handleOtpRequest = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    email = user.email;
    dispatch(verifyOtp(email, otp, naviagte));
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="container my-24">
        <div className="flex justify-center w-screen">
          <div className="card border-1 border-zinc-300 px-12 py-12 dark:border-neutral-800 rounded-lg max-sm:border-none max-sm:px-4">
            <h1 className="font-semibold text-md dark:text-white text-center">
              Otp Verifaction Code
            </h1>
            <p className="text-black/50 text-sm dark:text-white/60 text-center">
              We have sent a verification code to your email{" "}
            </p>
            <input
              type="text"
              className="bg-transparent border-1 border-zinc-300 dark:border-neutral-800 mt-4 w-full py-1 rounded-md text-center outline-none text-black/50 dark:text-white/60"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full float-right text-sm mt-4 mb-6 bg-primary text-white dark:text-black py-1.5 rounded-md"
              onClick={handleOtpRequest}
            >
              Verify
            </button>
            <div className="text-center">
              <p className="text-black/50 text-sm  dark:text-white">
                Didn&#39;t Recieve the code?{" "}
              </p>
            </div>
            <div className="w-full mt-1 flex gap-1 justify-center text-sm">
              <button
                className="text-blue-400 underline  dark:text-white/95 disabled:text-black/50 disabled:dark:text-white/60 dark:text-blue-400"
                disabled={timer}
                onClick={handleResendClick}
              >
                Resend Otp
              </button>
              <p className="text-black/60 dark:text-white/60">
                in 00:00:{count} seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
