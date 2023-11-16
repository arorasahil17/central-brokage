import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CONTACT_MESSAGE,
  getContact,
  updateContact,
} from "../../../../redux/actions/customize/customActions";
import { toast, Toaster } from "sonner";
import Loader from "../../../LOADER/loader";

const Contact = () => {
  const isLoading = useSelector((state) => state.contact.isLoading);
  const success = useSelector((state) => state.contact.success);
  const error = useSelector((state) => state.contact.error);
  const details = useSelector((state) => state.contact.details);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_CONTACT_MESSAGE });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_CONTACT_MESSAGE });
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    setAddress(details.address);
    setEmail(details.email);
    const ogNumber = details.phone;
    console.log(details);
    const initialDigits = ogNumber.slice(1, 4);
    console.log(initialDigits);
    const lastDigits = ogNumber.slice(5, ogNumber.length);
    const correctNumber = `${initialDigits}${lastDigits}`;
    setNumber(correctNumber);
    setId(details._id);
  }, [details]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      return toast.error("Please enter address");
    }
    if (!number) {
      return toast.error("Please enter phone number");
    }
    if (number.length < 10 || number.length > 10) {
      return toast.error("Phone number should be of length 10");
    }
    if (!email) {
      return toast.error("Please enter email");
    }
    dispatch(updateContact(email, number, address, id));
  };

  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <div className="flex justify-center my-56">
          <Loader />
        </div>
      ) : (
        <div
          className="lg:px-48 sm:px-12 max-sm:px-4 md:px-24 pb-12"
          onSubmit={handleSubmit}
        >
          <form className="mt-24">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  Contact
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
                  Customize Contact Section
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label className="block dark:text-white text-sm">
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full text-sm px-4 py-2 text-primary/70 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800 capitalize"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="bblock dark:text-white text-sm">
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full text-sm px-4 py-2 text-primary/70 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800 inputfile"
                        cols="30"
                        rows="5"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label className="bblock dark:text-white text-sm">
                      Email Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full text-sm px-4 py-2 text-primary/70 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
        </div>
      )}
    </>
  );
};

export default Contact;
