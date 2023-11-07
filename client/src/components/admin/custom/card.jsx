import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({ svg, title, linkTitle, link }) {
  return (
    <>
      <div className="lg:w-96 md:w-[90%] sm:w-[90%] max-sm:w-[99%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-gray-100 p-2 rounded w-12 flex justify-center">
          {svg}
        </div>

        <a href="#">
          <h5 className="my-2 text-lg tracking-tight text-primary dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Go to this step by step guideline process on how to certify for your
          weekly benefits.
        </p>
        <Link
          to={link}
          className="inline-flex items-center text-primary hover:underline"
        >
          {linkTitle}
          <svg
            className="w-3 h-3 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

Card.propTypes = {
  svg: PropTypes.element,
  title: PropTypes.element,
  linkTitle: PropTypes.element,
  link: PropTypes.link,
};
