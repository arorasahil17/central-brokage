import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12 mb-32 flex flex-col gap-4 items-center justify-center">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
        alt="404"
      />
      <h1 className="text-2xl text-red-600">Page not found</h1>
      <h1 className="text-black font-extrabold text-5xl dark:text-white">
        Whoops! That page doesn’t exist.
      </h1>
      <p className="text-black/50 dark:text-white/70">
        Here are some helpful links instead:
      </p>
      <div className="flex justify-center gap-4">
        <Link className="underline text-black/50 dark:text-white/70" to="/">
          Home
        </Link>
        <Link
          className="underline text-black/50 dark:text-white/70"
          to="/find-loads"
        >
          Find Loads
        </Link>
      </div>
    </div>
  );
};

export default Page404;
