import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
  clearUserMessage,
  regitserUser,
} from "../../redux/actions/users/userActions";

export default function Register() {
  const disptach = useDispatch();
  const blankUser = {
    mcHash: "",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
  };
  const [formData, setFormData] = useState(blankUser);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const error = user.error;
  useEffect(() => {
    if (error) {
      toast.error(error);
      disptach(clearUserMessage());
    }
  }, [error, disptach]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mcHash) {
      toast.error("MC Reference Number is required");
      return;
    }
    if (!formData.name) {
      toast.error("Name field cannot be empty!");
      return;
    }
    if (!formData.email) {
      toast.error("Email address is required");
      return;
    } else if (!/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(formData.email)) {
      toast.error("Invalid Email Address");
      return;
    }
    if (!formData.contactNumber) {
      toast.error("Contact number is required");
      return;
    }
    if (formData.contactNumber.length !== 10) {
      toast.error("Please enter a valid 10 digit phone number");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must contain at least six characters!");
      return;
    }
    const userData = {
      ...formData,
      contactNumber: parseInt(formData.contactNumber),
    };
    disptach(regitserUser(userData, navigate));
  };
  return (
    <>
      <Toaster position="bottom-center" />
      <div
        className="bg-white dark:bg-inherit  rounded-2xl w-screen md:max-w-md lg:max-w-full md:mx-auto   md:w-1/2 xl:w-1/3 lg:px-16 xl:px-0
  flex items-center justify-center py-20 "
      >
        <div className="w-full h-100 border-1 border-neutral-200   py-12 px-8 rounded-2xl dark:border-neutral-800 max-sm:px-6 max-sm:border-none">
          <h1 className="text-xl md:text-2xl dark:text-white font-semibold text-start">
            Create your account
          </h1>
          <h1 className="text-sm text-black/50 dark:text-white/60 mt-2">
            Fill all the details carefully and register new account
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex gap-2 max-sm:flex-col">
              <div className="mt-4">
                <label className="block dark:text-white text-sm">MC#</label>
                <input
                  type="text"
                  placeholder="Enter MC#"
                  className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                  value={formData.mcHash}
                  onChange={(e) =>
                    setFormData({ ...formData, mcHash: e.target.value })
                  }
                />
              </div>
              <div className="mt-4">
                <label className="block dark:text-white text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block dark:text-white text-sm">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block dark:text-white text-sm">Contact</label>
              <input
                type="number"
                placeholder="Enter Contact Number"
                className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block dark:text-white text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 text-sm py-2 text-primary/60 dark:text-white/70 dark:placeholder:text-white/60 rounded-lg bg-transparent mt-2
          dark:focus:border-white/50 focus:border-neutral-500 focus:outline-none  border-1 border-zinc-300 dark:border-neutral-800"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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
              Register
            </button>
          </form>

          <p className="mt-8 text-sm text-black/50 dark:text-white/60">
            Already have an account?
            <Link
              to="/login"
              className=" text-neutral-800 dark:text-white font-semibold mx-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
