import { UserPlus, Search, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-error" />,
      title: "1. Register",
      description: "Sign up and create your donor profile in less than a minute."
    },
    {
      icon: <Search className="w-8 h-8 text-error" />,
      title: "2. Find Requests",
      description: "Browse local emergency blood requests that match your blood group."
    },
    {
      icon: <Droplets className="w-8 h-8 text-error" />,
      title: "3. Donate Blood",
      description: "Accept a request, visit the hospital, and save a life today."
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content mb-4">How You Can Help</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Becoming a hero is easier than you think. Follow these simple steps to make a real impact in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-base-200 rounded-2xl p-8 text-center border border-base-300 hover:shadow-md transition-shadow">
              <div className="bg-error/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">{step.title}</h3>
              <p className="text-base-content/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/requests" className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-md px-8 rounded-xl">
            View Urgent Requests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;