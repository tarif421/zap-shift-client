import React from "react";
import { FiCheckCircle, FiTruck, FiShield, FiClock } from "react-icons/fi";

const About = () => {
  const features = [
    {
      title: "Fastest Nationwide Delivery",
      description: "Ensuring timely delivery across every district in Bangladesh with real-time tracking.",
      icon: <FiTruck />,
    },
    {
      title: "100% Safe & Secure",
      description: "Guaranteed product safety from pick-up to doorstep drop-off with zero damage.",
      icon: <FiShield />,
    },
    {
      title: "24/7 Dedicated Support",
      description: "Always here to assist merchants and customers with any delivery updates or queries.",
      icon: <FiClock />,
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Visual / Image Container */}
        <div className="relative">
          <div className="bg-[#003b36]/10 rounded-3xl p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#003b36]/20 to-transparent pointer-events-none"></div>
            
            {/* Main Image or Illustration Representation */}
            <div className="w-full h-72 md:h-96 rounded-2xl bg-[#003b36] flex flex-col items-center justify-center text-white shadow-lg p-6 text-center">
              <span className="text-6xl md:text-7xl mb-4 text-[#bbf7d0]">📦</span>
              <h3 className="text-2xl font-bold mb-2">Zap Shift Logistics</h3>
              <p className="text-sm text-gray-300 max-w-sm">
                Your trusted partner for modern parcel management and seamless nationwide delivery solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          <span className="text-[#003b36] font-semibold text-sm uppercase tracking-wider bg-[#bbf7d0]/50 px-3 py-1 rounded-full">
            About Our Company
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b36] mt-4 mb-6 leading-tight">
            Empowering E-Commerce with Fast & Reliable Delivery Solutions
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            Zap Shift is dedicated to transforming the courier and logistics experience in Bangladesh. We bridge the gap between online merchants and their valued customers through cutting-edge technology, automated parcel tracking, and unmatched safety standards.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#003b36] text-[#bbf7d0] flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#003b36] text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;