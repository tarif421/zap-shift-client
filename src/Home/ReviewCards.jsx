import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCards = ({review}) => {
    const {userName, review: testimonial, user_photoURL} = review
    return (
        <div className="max-w-md mx-auto">
      {/* Top Dotted Border */}
      <div className="border-t-2 border-dotted border-primary mb-4"></div>

      <div className="card bg-base-200 shadow-sm rounded-2xl p-8">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-primary text-4xl opacity-40 mb-4" />

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {testimonial}
        </p>

        {/* Middle Dotted Divider */}
        <div className="border-t border-dotted border-primary my-6"></div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary"><img src={user_photoURL} alt="" /></div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {userName}
            </h3>
            <p className="text-sm text-gray-500">
              Senior Product Designer
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ReviewCards;