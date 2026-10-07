import React from "react";
import { FiActivity, FiShield, FiHeadphones } from "react-icons/fi";

const Process = () => {
  const steps = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      icon: <FiActivity />,
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      icon: <FiShield />,
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      icon: <FiHeadphones />,
    },
  ];

  return (
    <section className=" py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            {/* Left: Big Icon */}
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#e6f4f1] text-[#003b36] flex items-center justify-center text-5xl md:text-6xl shadow-inner">
                {step.icon}
              </div>
            </div>

            {/* Vertical Dotted Divider (Desktop View) */}
            <div className="hidden md:block h-28 border-l-2 border-dashed border-gray-300"></div>

            {/* Right: Title and Description */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[#003b36] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;