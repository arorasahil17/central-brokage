import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_HERO_MESSAGE,
  getHeroDetails,
  updateHero,
} from "../../../../redux/actions/customize/customActions";
import { toast, Toaster } from "sonner";
import Loader from "../../../LOADER/loader";
const Hero = () => {
  const dispatch = useDispatch();
  const cloudinaryRef = useRef();
  const isLoading = useSelector((state) => state.hero.isLoading);
  const success = useSelector((state) => state.hero.success);
  const error = useSelector((state) => state.hero.error);
  const details = useSelector((state) => state.hero.details);
  const [title, setTitle] = useState(details.title);
  const [description, setDescription] = useState(details.description);
  const [heroImg, setHeroImg] = useState(details.imageUrl);
  const [id, setId] = useState("");

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
  }, []);

  useEffect(() => {
    setTitle(details.title);
    setDescription(details.description);
    setHeroImg(details.imageUrl);
    setId(details._id);
  }, [details]);

  useEffect(() => {
    dispatch(getHeroDetails());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: CLEAR_HERO_MESSAGE });
    }
    if (error) {
      toast.error(error);

      dispatch({ type: CLEAR_HERO_MESSAGE });
    }
  }, [success, error, dispatch]);

  const uploadImage = (e) => {
    e.preventDefault();

    const widgetRef = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcyzbfmjb",
        uploadPreset: "mnj6nb6n",
      },
      function (error, result) {
        if (result.event === "success") {
          setHeroImg(result.info.secure_url);
        }
      }
    );
    widgetRef.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHero(title, description, heroImg, id));
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
                  Hero
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
                  Customize Hero Section
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label className="block dark:text-white text-sm">
                      Hero Title
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
                      Hero Description
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
                  <div className={`sm:col-span-6 ${!heroImg && "hidden"}`}>
                    <div className="flex justify-center ">
                      <div>
                        <img
                          src={heroImg}
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

export default Hero;
