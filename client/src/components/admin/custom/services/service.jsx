import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import Loader from "../../../LOADER/loader";
import {
  CLEAR_SERVICE_MESSAGE,
  getService,
  updateService,
} from "../../../../redux/actions/customize/customActions";

const Services = () => {
  const cloudinaryRef = useRef();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.service.details);
  const isLoading = useSelector((state) => state.service.isLoading);
  const success = useSelector((state) => state.service.success);
  const error = useSelector((state) => state.service.success);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceImg, setServiceImg] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
  }, []);

  useEffect(() => {
    setTitle(details.title);
    setDescription(details.description);
    setServiceImg(details.imageUrl);
    setId(details._id);
  }, [details]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_SERVICE_MESSAGE });
    }
    if (error) {
      toast.success(error);
      dispatch({ type: CLEAR_SERVICE_MESSAGE });
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Please enter a title");
    }
    if (!description) {
      return toast.error("Please enter description");
    }
    if (!serviceImg) {
      return toast.error("Please upload an image");
    }
    dispatch(updateService(title, description, serviceImg, id));
  };

  const uploadImage = (e) => {
    e.preventDefault();

    const widgetRef = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dgn9a3ev1",
        uploadPreset: "moehyyjo",
      },
      function (error, result) {
        if (result.event === "success") {
          setServiceImg(result.info.secure_url);
        }
      }
    );
    widgetRef.open();
  };

  return (
    <>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <div className="flex justify-center my-56">
          <Loader />
        </div>
      ) : (
        <div className="lg:px-48 py-12 sm:px-12 max-sm:px-4 md:px-24">
          <form className="mt-24" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  Service
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
                  Customize Service Section
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label className="block dark:text-white text-sm">
                      Service Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full text-sm px-4 py-2 text-primary/70 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800 capitalize"
                        value={title}
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="bblock dark:text-white text-sm">
                      Service Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        className="w-full text-sm px-4 py-2 text-primary/70 bg-transparent dark:text-white/70 dark:placeholder:text-white/60 rounded-lg mt-2 focus:border-neutral-500 dark:focus:border-white/50 focus:outline-none border-1 border-zinc-300 dark:border-neutral-800 inputfile"
                        cols="30"
                        rows="5"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="mt-2">
                      <button
                        onClick={uploadImage}
                        className="w-full bg-gray-100 px-4 py-2 rounded"
                        type="button"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <div className={`sm:col-span-6 ${!serviceImg && "hidden"}`}>
                    <div className="flex justify-center ">
                      <div>
                        <img
                          src={serviceImg}
                          className="object-cover lg:w-[800px] lg:h-[400px] sm:w-[90%]"
                          alt=""
                        />
                      </div>
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

export default Services;
