import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserMinus, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };

    axiosSecure
      .patch(`/users/${user._id}/role`, roleInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || "User"} has been promoted to Admin!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName || "User"} has been removed from Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-[#003b36]"></span>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-base-100 min-h-screen rounded-2xl shadow-sm border border-base-200">
      {/* Header & Search Bar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003b36]">
            Manage Users
          </h2>
          <span className="bg-[#bbf7d0] text-[#003b36] font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
            Total: {users.length}
          </span>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-auto">
          <label className="input input-bordered flex items-center gap-2 bg-base-200 border-base-300 focus-within:border-[#003b36] focus-within:bg-base-100 transition-all rounded-xl shadow-sm w-full sm:w-72">
            <svg
              className="h-[1.2em] w-[1.2em] opacity-50 text-base-content"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              className="grow bg-transparent border-none outline-none focus:outline-none text-sm"
              placeholder="Search users..."
            />
          </label>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16 bg-base-200/50 rounded-xl border border-dashed border-base-300">
          <p className="text-gray-500 font-medium text-sm sm:text-base">
            No users found!
          </p>
        </div>
      ) : (
        <>
          {/* Desktop & Tablet Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-base-200 shadow-sm">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-200 text-base-content font-semibold">
                <tr>
                  <th>#</th>
                  <th>User Profile</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Admin Actions</th>
                  <th className="text-center">Other Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="hover">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10 bg-base-300">
                            <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-[#003b36]">
                            {user.displayName || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-600">{user.email}</td>
                    <td>
                      <span
                        className={`badge font-medium uppercase text-[10px] ${
                          user.role === "admin"
                            ? "badge-success text-white"
                            : "badge-ghost"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm btn-ghost hover:bg-success/20 text-success"
                          title="Make Admin"
                        >
                          <FaUserShield className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-sm btn-ghost hover:bg-error/20 text-error"
                          title="Remove Admin"
                        >
                          <FaUserMinus className="text-lg" />
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-ghost btn-xs border border-base-300">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="bg-base-200/60 border border-base-300 rounded-xl p-4 shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 bg-base-300">
                        <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-semibold">#{index + 1}</span>
                      <h3 className="font-bold text-base text-[#003b36]">
                        {user.displayName || "N/A"}
                      </h3>
                      <p className="text-xs text-gray-500 break-all">{user.email}</p>
                    </div>
                  </div>
                  <span
                    className={`badge font-medium uppercase text-[10px] ${
                      user.role === "admin"
                        ? "badge-success text-white"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-base-300">
                  <button className="btn btn-xs btn-ghost border border-base-300">
                    Details
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-xs bg-success text-white"
                      title="Make Admin"
                    >
                      <FaUserShield /> Admin
                    </button>
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-xs bg-error text-white"
                      title="Remove Admin"
                    >
                      <FaUserMinus /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUser;