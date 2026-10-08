import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaBox,
  FaHistory,
  FaMotorcycle,
  FaTasks,
  FaUserCheck,
  FaUsersCog,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import { MdTaskAlt } from "react-icons/md";
import useRole from "../Hook/useRole";
import useAuth from "../Hook/useAuth"; // ১. আপনার অথ হুকটি ইম্পোর্ট করুন (পাথ আপনার প্রজেক্ট অনুযায়ী ঠিক করে নিতে পারেন)
import Logo from "../Components/Logo/Logo";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const { user, logOut } = useAuth(); // ২. ইউজারের তথ্য আনুন (যেমন: photoURL, displayName, email)
const handleLogout = () => {
    logOut()
      .then(() => {
        // সফলভাবে লগআউট হলে হোমপেজে বা লগইন পেজে পাঠিয়ে দিন
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-[#003b36]"></span>
      </div>
    );
  }

  // NavLink এর জন্য কমন অ্যাক্টিভ ক্লাস ফাংশন
  const getNavClass = ({ isActive }) =>
    `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-between gap-3 py-3 px-4 rounded-xl transition-all duration-200 relative ${
      isActive
        ? "bg-[#003b36] text-white font-semibold shadow-sm"
        : "text-base-content hover:bg-base-300 font-medium"
    }`;

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto shadow-2xl rounded-2xl overflow-hidden my-4 border border-base-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col bg-base-100">
        {/* Top Navbar */}
       <header className="navbar w-full bg-base-300 border-b border-base-200 px-4 shadow-sm flex justify-between items-center">
  {/* Left Side: Toggle Drawer Button & Brand/Logo */}
  <div className="flex items-center gap-3">
    <label
      htmlFor="my-drawer-4"
      aria-label="open sidebar"
      className="btn btn-square btn-ghost lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="inline-block size-5"
      >
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
        <path d="M9 4v16"></path>
        <path d="M14 10l2 2l-2 2"></path>
      </svg>
    </label>

    <div className="flex items-center gap-2.5">
      <Logo />
      <span className="text-[10px] sm:text-xs font-semibold uppercase bg-[#bbf7d0] text-[#003b36] px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
        Dashboard
      </span>
    </div>
  </div>

  {/* Right Side: User Profile, Notifications */}
  <div className="flex items-center gap-4">
    {/* নোটিফিকেশন আইকন */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#003b36]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs bg-[#003b36] text-white indicator-item border-none">3</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow-lg border border-base-200"
      >
        <div className="card-body">
          <span className="font-bold text-lg text-[#003b36]">3 Notifications</span>
          <span className="text-xs text-gray-500">New parcel assigned & updates</span>
          <div className="card-actions">
            <button className="btn btn-sm bg-[#003b36] hover:bg-[#002824] text-white w-full">View all</button>
          </div>
        </div>
      </div>
    </div>

    {/* বাস্তব ইউজার প্রফাইল অ্যাভাটার ও ড্রপডাউন */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-[#003b36] ring-offset-base-100 ring-offset-2">
          <img
            alt={user?.displayName || "User Profile"}
            src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
      >
        <li>
          <div className="flex flex-col items-start gap-0.5 px-2 py-1">
            <span className="font-bold text-[#003b36] truncate max-w-full">
              {user?.displayName || "User"}
            </span>
            <span className="text-[11px] text-gray-500 truncate max-w-full">
              {user?.email || ""}
            </span>
          </div>
        </li>
        <div className="divider my-1"></div>
        <li>
          <span className="font-bold text-[#003b36] justify-between">
            Role
            <span className="badge badge-sm bg-[#bbf7d0] text-[#003b36] border-none uppercase">{role || "user"}</span>
          </span>
        </li>
        <li><a>Settings</a></li>
        <li><button onClick={handleLogout} className="text-error">Logout</button></li>
      </ul>
    </div>
  </div>
</header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 bg-base-100 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side is-drawer-close:overflow-visible z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <aside className="flex min-h-full flex-col items-start bg-base-200 border-r border-base-300 is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
          
          {/* Brand Logo / Title Section in Sidebar */}
          <div className="p-4 w-full flex items-center gap-3 border-b border-base-300">
            <div className="w-8 h-8 rounded-lg bg-[#003b36] text-[#bbf7d0] flex items-center justify-center font-bold shrink-0">
              ZS
            </div>
            <span className="font-extrabold text-[#003b36] text-base is-drawer-close:hidden tracking-wider">
              ZAP SHIFT
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="menu w-full grow p-2 space-y-1">
            {/* Homepage Link */}
            <li>
              <NavLink
                to="/"
                className={getNavClass}
                data-tip="Homepage"
              >
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="inline-block size-5 shrink-0"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden font-medium">Homepage</span>
                </div>
              </NavLink>
            </li>

            <div className="divider my-1 is-drawer-close:hidden"></div>

            {/* General User Links (My Parcels) */}
            {(!role || role === "user") && (
              <>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 py-1 is-drawer-close:hidden">
                  User Dashboard
                </div>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="My Parcels"
                    to="/dashboard/my-parcels"
                  >
                    <div className="flex items-center gap-3">
                      <FaBox className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">My Parcels</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 py-1 is-drawer-close:hidden">
                  Admin Control
                </div>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="Approved Riders"
                    to="/dashboard/approved-riders"
                  >
                    <div className="flex items-center gap-3">
                      <FaMotorcycle className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">Approved Riders</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="Manage Users"
                    to="/dashboard/manage-users"
                  >
                    <div className="flex items-center gap-3">
                      <FaUsersCog className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">Manage Users</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="Assign Riders"
                    to="/dashboard/assign-riders"
                  >
                    <div className="flex items-center gap-3">
                      <FaUserCheck className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">Assign Riders</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            {/* Rider Links */}
            {role === "rider" && (
              <>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 py-1 is-drawer-close:hidden">
                  Rider Panel
                </div>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="Assigned Deliveries"
                    to="/dashboard/assigned-deliveries"
                  >
                    <div className="flex items-center gap-3">
                      <FaTasks className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">Assigned Deliveries</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={getNavClass}
                    data-tip="Completed Deliveries"
                    to="/dashboard/Completed-deliveries"
                  >
                    <div className="flex items-center gap-3">
                      <MdTaskAlt className="text-xl shrink-0" />
                      <span className="is-drawer-close:hidden font-medium">Completed Deliveries</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider my-1 is-drawer-close:hidden"></div>

            {/* Settings Item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 py-3 px-4 w-full text-left rounded-xl hover:bg-base-300 transition-all text-base-content font-medium"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="inline-block size-5 shrink-0"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden font-medium">Settings</span>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;