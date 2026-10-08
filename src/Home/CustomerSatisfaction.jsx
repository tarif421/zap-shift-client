import React from "react";
import { FiBox, FiMapPin } from "react-icons/fi";

const CustomerSatisfaction = () => {
  return (
    <section className="bg-[#f3f4f6] py-16 px-4">
      <div className="max-w-6xl mx-auto bg-[#003b36] rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-xl text-white">
        {/* Background Glow / Wave Design Effect (Optional) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-[#005c53]/60 to-transparent blur-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          {/* Left Side: Content & Buttons */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. ZapShift courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-[#bbf7d0] text-[#003b36] font-bold px-8 py-3.5 rounded-full hover:bg-[#a3f4c0] transition duration-300 shadow-md">
                Become a Merchant
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-gray-400 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition duration-300">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

          {/* Right Side: Illustration / Visual Icon Group */}
          <div className="w-full lg:w-2/5 flex justify-center items-center">
            <div className="relative text-[#a3f4c0] flex flex-col items-center justify-center p-8 bg-[#004d47]/50 rounded-2xl border border-[#00665d] shadow-inner">
              {/* Stacked Box Illustration representation using React Icons */}
              <div className="text-7xl md:text-8xl mb-2 flex items-center justify-center">
                <FiBox className="transform -rotate-6" />
              </div>
              <div className="absolute top-6 right-8 text-3xl animate-bounce">
                <FiMapPin />
              </div>
              <p className="text-xs tracking-widest uppercase text-gray-300 font-semibold mt-2">
                Secure Logistics Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSatisfaction;
