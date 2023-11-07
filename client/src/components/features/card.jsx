import PropTypes from "prop-types";

export default function Card({ title, image }) {
  return (
    <>
      <div className="lg:w-80 mb-2 bg-white rounded-lg shadow-md dark:bg-[#111114] max-sm:w-[90%] sm:w-[90%]">
        <a href="#">
          <img
            className="rounded-t-lg w-full h-64 object-cover"
            src={image}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-sm text-black/60 dark:text-white/60">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-primary dark:text-white/70"
          >
            Read More
            <svg
              className="w-2.5 h-2.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
