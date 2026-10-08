import React from "react";
import Logo from "../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hook/useAuth";
import useRole from "../../Hook/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();

  const handleLogout = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  // NavLink এর অ্যাক্টিভ স্টাইল হ্যান্ডেল করার জন্য
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#003b36] font-bold bg-[#bbf7d0]/40 rounded-lg px-3 py-2"
      : "text-base-content hover:text-[#003b36] font-medium px-3 py-2";

  const links = (
    <>
      <li>
        <NavLink to="" className={navLinkClass}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navLinkClass}>
          Coverage Areas
        </NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel" className={navLinkClass}>
          Send Parcel
        </NavLink>
      </li>

      {/* {user && !roleLoading && (
        <li>
          <NavLink
            to={role === "admin" ? "/dashboard/admin-home" : "/dashboard/my-parcels"}
            className={navLinkClass}
          >
            {role === "admin" ? "Dashboard" : "My Parcels"}
          </NavLink>
        </li>
      )} */}

      <li>
        <NavLink to="/tracking-parcel" className={navLinkClass}>
          Track Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sm:px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b border-base-200">
      <div className="navbar-start">
        {/* Mobile Dropdown Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#003b36]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-52 p-3 shadow-xl border border-base-200 gap-2"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Be a Rider Button */}
        <Link
          className="hidden sm:inline-flex btn btn-sm bg-[#bbf7d0] hover:bg-[#86efac] text-[#003b36] border-none font-bold shadow-sm"
          to="/rider"
        >
          Be a Rider
        </Link>

        {/* User Authentication & Profile Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-[#003b36] ring-offset-base-100 ring-offset-2"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200 gap-1.5"
            >
              <li className="px-2 py-1">
                <span className="font-bold text-[#003b36] text-sm truncate">
                  {user?.displayName || "User"}
                </span>
                <span className="text-xs text-gray-400 truncate">{user?.email}</span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/dashboard/my-parcels" className="font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-medium hover:bg-error/10"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            className="btn btn-sm bg-[#003b36] hover:bg-[#002824] text-white px-5 rounded-lg shadow-sm"
            to="/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;