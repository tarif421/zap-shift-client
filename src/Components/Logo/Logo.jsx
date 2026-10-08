import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center sm:items-end">
      <img
        src={logo}
        alt="ZapShift Logo"
        className="w-6 sm:w-8 md:w-9 h-auto object-contain shrink-0 z-10"
      />

      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#003b36] tracking-tight -ms-2 sm:-ms-2.5">
        zapShift
      </h3>
    </div>
  );
};

export default Logo;
