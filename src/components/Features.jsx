import { FaHeartbeat, FaSearchLocation } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";

const Features = () => {
  const features = [
    {
      icon: <FaSearchLocation className="text-red-600 text-5xl mb-3" />,
      title: "Fast Location Search",
      description:
        "Quickly find active blood donors or emergency requests in your specific area.",
    },
    {
      icon: <MdVerifiedUser className="text-red-600 text-5xl mb-3" />,
      title: "Verified Profiles",
      description:
        "All donor and hospital accounts are verified to ensure a safe and trusted community.",
    },
    {
      icon: <FaHeartbeat className="text-red-600 text-5xl mb-3" />,
      title: "Real-Time Updates",
      description: "Live tracking of blood availability and instant notifications for critical needs.",
    },
    {
      icon: <BsShieldLock className="text-red-600 text-5xl mb-3" />,
      title: "Privacy Protected",
      description:
        "Your personal contact information and medical data are encrypted and strictly confidential.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            {feature.icon}
            <h3 className="text-xl font-bold text-gray-900 mt-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;