import { Link } from 'react-router-dom';

const CarouselSlide = ({ image, title, subtitle, buttonText = "Donate Now", buttonLink = "/register" }) => {
  return (
    <div className="w-full bg-base-200 h-[600px] flex items-center justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
            {title}
          </h1>
          <p className="text-base-content/60 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            {subtitle}
          </p>

          <Link to={buttonLink}>
            <button className="btn bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full shadow-md text-white font-bold text-lg hover:-translate-y-1 border-none">
              {buttonText}
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={image}
            alt="Blood Donation"
            className="max-w-full h-auto max-h-[400px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>
    </div>
  );
};

export default CarouselSlide;