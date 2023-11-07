import PropTypes from "prop-types";
export default function Hero({ details }) {
  return (
    <>
      <>
        {/* Hero */}
        <div className="max-w-[85rem] mt-24 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
            <div>
              <h1 className="block text-3xl font-[900] text-primary sm:text-4xl md:text-start sm:text-center max-sm:text-center lg:text-5xl lg:leading-tight dark:text-white lg:text-start">
                {details.title}
              </h1>
              <p className="mt-3 text-md text-black/60 dark:text-white/60 lg:text-start md:text-start  sm:text-center max-sm:text-center">
                {details.description}
              </p>
            </div>
            {/* End Col */}
            <div className="relative ml-4">
              <img className="w-full rounded-md" src={details.imageUrl} />
              <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0" />
              {/* SVG*/}
              {/* End SVG*/}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Hero */}
      </>
    </>
  );
}

Hero.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    // Add more prop types for other properties if needed
  }).isRequired,
};
