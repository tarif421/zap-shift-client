import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-50">
        
        {/* Warning/Cancel Yellow Icon */}
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        {/* Cancellation Messages */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          The transaction was cancelled, and **no charges were made** to your account. If this was a mistake, you can safely try paying again.
        </p>

        {/* Decorative Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-100"
          >
            Review Parcels
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm px-6 py-3 rounded-xl transition-all border border-gray-200"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancel;