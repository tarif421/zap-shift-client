import React from "react";
import { FiBox } from "react-icons/fi"; 

const OurService = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlighted: false,
    },
    {
      title: "Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlighted: true, 
    },
    {
      title: "Fulfillment Solution",
      description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlighted: false,
    },
    {
      title: "Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlighted: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description: "Customized corporate services which includes warehouse and inventory management support.",
      highlighted: false,
    },
    {
      title: "Parcel Return",
      description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlighted: false,
    },
  ];

  return (
    <section className="bg-[#003b36] py-16 rounded-4xl p-8 ">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl shadow-md flex flex-col items-center text-center transition-all duration-300 ${
              service.highlighted
                ? "bg-[#bbf7d0] text-[#003b36]"  
                : "bg-white text-gray-800"     
            }`}
          >
            {/* Icon Wrapper */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 text-2xl ${
                service.highlighted
                  ? "bg-white/70 text-[#003b36]"
                  : "bg-gray-100 text-[#003b36]"
              }`}
            >
              <FiBox />
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-xl mb-3">{service.title}</h3>
            <p
              className={`text-sm leading-relaxed ${
                service.highlighted ? "text-gray-700" : "text-gray-500"
              }`}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurService;