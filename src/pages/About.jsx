import { Link } from "react-router-dom";
import { Heart, Users, ShieldCheck, Droplets } from "lucide-react";
import blood_donate from "../assets/images/donor-donating-blood.webp";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-red-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Mission: Saving Lives Together
          </h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            We are a community-driven blood bank platform dedicated to bridging the gap between donors and those in urgent need of life-saving blood.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Compassion</h3>
            <p className="text-gray-600">Built on the spirit of voluntary donation and helping our fellow citizens.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">Connecting thousands of donors with hospitals and patients across the country.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <ShieldCheck className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Reliability</h3>
            <p className="text-gray-600">Ensuring urgent requests reach the right donors at the right time.</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-red-100 p-2 rounded-full h-fit"><Droplets className="text-red-600 w-5 h-5"/></div>
                <div>
                  <h4 className="font-bold">Real-time Requests</h4>
                  <p className="text-gray-600">Unlike static lists, our platform updates in real-time as donors volunteer.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-red-100 p-2 rounded-full h-fit"><Droplets className="text-red-600 w-5 h-5"/></div>
                <div>
                  <h4 className="font-bold">Easy Management</h4>
                  <p className="text-gray-600">Users can post requests, manage their donations, and track fulfillment status.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-red-100 p-2 rounded-full h-fit"><Droplets className="text-red-600 w-5 h-5"/></div>
                <div>
                  <h4 className="font-bold">Trusted Network</h4>
                  <p className="text-gray-600">We verify requests and coordinate with hospitals to ensure safety.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Updated Image Container */}
          <div className="md:w-1/2 h-80 bg-gray-100 rounded-3xl border-4 border-gray-200 overflow-hidden shadow-md">
            <img
              src={blood_donate}
              alt="Donor donating blood"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/requests">
            <button className="btn bg-red-600 border-none px-8 text-white hover:bg-red-700 hover:-translate-y-1 transition-transform shadow-md w-full sm:w-auto">
              Donate Now
            </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 transition-transform shadow-md w-full sm:w-auto">
              Register as Donor
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;