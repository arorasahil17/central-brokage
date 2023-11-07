import PropTypes from "prop-types";
const Features = ({ details }) => {
  return (
    <section className="pt-20 mt-20 pb-12 lg:pt-[120px] lg:px-24 lg:pb-[90px] ">
      <div className="container overflow-hidden">
        <div className="flex flex-wrap justify-center gap-12 -mt-7">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 items-center justify-center flex-col">
              <img
                className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                alt="hero"
                src={details.imageUrl}
              />
              <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-slate-700 dark:text-white">
                  {details.title}
                </h1>
                <p className="mb-8 leading-relaxed text-black/70 dark:text-white/60">
                  {details.description}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

Features.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    // Add more prop types for other properties if needed
  }).isRequired,
};

export default Features;
