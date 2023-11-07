import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import Loader from "../LOADER/loader";
import {
  checkAuth,
  clearUserMessage,
  updateUserProfile,
} from "../../redux/actions/users/userActions";
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  });
  useEffect(() => {
    dispatch(checkAuth());
    if (success) {
      toast.success(success);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserMessage());
    }
  }, [dispatch, success, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }
    if (!/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(formData.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!formData.contactNumber) {
      toast.error("Contact Number is Required");
      return;
    }

    dispatch(updateUserProfile(formData));
  };
  return (
    <div className="lg:px-48 sm:px-12 max-sm:px-4 md:px-24">
      <Toaster position="bottom-center" />{" "}
      {isLoading ? (
        <div className="mt-48 mb-48 justify-center flex">
          <Loader />
        </div>
      ) : (
        <form className="mt-24" onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="first-name"
                    className="block dark:text-white text-sm"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800 capitalize"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="bblock dark:text-white text-sm"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full text-sm px-4 py-2 text-primary/60 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="bblock dark:text-white text-sm"
                  >
                    Contact
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
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
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-normal dark:text-black text-white shadow-sm "
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
