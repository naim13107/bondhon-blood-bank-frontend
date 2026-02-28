import { Link } from 'react-router-dom';
import bloodDonorDayImage from "../assets/images/world-blood-donor-day-illustration.webp"; 

const WorldBloodDonorDaySection = () => {
  return (
    <section className="bg-red-50 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-6">
            Celebrate World Blood Donor Day
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            "Every year on June 14th, we celebrate the life-saving impact of voluntary blood donors. But keeping a safe, reliable blood supply flowing requires resources. Your financial contribution funds the urgent logistics, secure storage, and platform operations that connect donors with patients in critical need. Fuel our mission—support our operations and help us save lives today!"
          </p>
          <Link to={'/fundraising'}>
            <button className="btn bg-red-600 border-none px-8 text-white hover:bg-red-700 shadow-md transition-transform hover:-translate-y-1 text-lg">
              Donate Funds
            </button>
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <img
              src={bloodDonorDayImage}
              alt="World Blood Donor Day Illustration with blood bag, hearts, and clipboard"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldBloodDonorDaySection;