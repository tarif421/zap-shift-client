import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const updateRiderStatus = async (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    try {
      const res = await axiosSecure.patch(
        `/riders/${rider._id}/role`,
        updateInfo
      );
      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status has been set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating rider status:", error);
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  // Delete Rider Handler with Confirmation
  const handleDelete = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${rider.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003b36",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/riders/${rider._id}`);
          if (res.data.deletedCount > 0 || res.data.acknowledged) {
            refetch();
            Swal.fire("Deleted!", "Rider has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: error.response?.data?.message || "Could not delete rider.",
          });
        }
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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003b36]">
          Riders Pending Approval
        </h2>
        <span className="bg-[#bbf7d0] text-[#003b36] font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
          Total: {riders.length}
        </span>
      </div>

      {riders.length === 0 ? (
        <div className="text-center py-16 bg-base-200/50 rounded-xl border border-dashed border-base-300">
          <p className="text-gray-500 font-medium text-sm sm:text-base">
            No pending rider applications found!
          </p>
        </div>
      ) : (
        <>
          {/* Desktop & Tablet Table View (Hidden on extra small mobile screens) */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-base-200 shadow-sm">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-200 text-base-content font-semibold">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>District</th>
                  <th>Status</th>
                  <th>Work Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id} className="hover">
                    <th>{index + 1}</th>
                    <td className="font-medium">{rider.name}</td>
                    <td className="text-gray-600">{rider.email}</td>
                    <td>{rider.district}</td>
                    <td>
                      <span
                        className={`badge font-medium uppercase text-[10px] ${
                          rider.status === "approved"
                            ? "badge-success text-white"
                            : rider.status === "rejected"
                            ? "badge-error text-white"
                            : "badge-warning text-white"
                        }`}
                      >
                        {rider.status || "pending"}
                      </span>
                    </td>
                    <td>{rider.workStatus || "N/A"}</td>
                    <td>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          className="btn btn-sm btn-ghost hover:bg-base-300"
                          title="View Details"
                        >
                          <FaEye className="text-base" />
                        </button>
                        <button
                          onClick={() => handleApproval(rider)}
                          className="btn btn-sm bg-[#003b36] hover:bg-[#002824] text-white"
                          title="Approve"
                        >
                          <FaUserCheck />
                        </button>
                        <button
                          onClick={() => handleRejection(rider)}
                          className="btn btn-sm btn-warning text-white"
                          title="Reject"
                        >
                          <IoPersonRemove />
                        </button>
                        <button
                          onClick={() => handleDelete(rider)}
                          className="btn btn-sm btn-error text-white"
                          title="Delete"
                        >
                          <FaTrashCan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Visible only on small mobile screens) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {riders.map((rider, index) => (
              <div
                key={rider._id}
                className="bg-base-200/60 border border-base-300 rounded-xl p-4 shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold">#{index + 1}</span>
                    <h3 className="font-bold text-base text-[#003b36]">{rider.name}</h3>
                    <p className="text-xs text-gray-500 break-all">{rider.email}</p>
                  </div>
                  <span
                    className={`badge font-medium uppercase text-[10px] ${
                      rider.status === "approved"
                        ? "badge-success text-white"
                        : rider.status === "rejected"
                        ? "badge-error text-white"
                        : "badge-warning text-white"
                    }`}
                  >
                    {rider.status || "pending"}
                  </span>
                </div>

                <div className="text-xs text-gray-600 flex justify-between border-t border-base-300 pt-2">
                  <span><strong>District:</strong> {rider.district}</span>
                  <span><strong>Work:</strong> {rider.workStatus || "N/A"}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-base-300">
                  <button
                    className="btn btn-xs btn-ghost border border-base-300"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-xs bg-[#003b36] hover:bg-[#002824] text-white"
                    title="Approve"
                  >
                    <FaUserCheck /> Approve
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-xs btn-warning text-white"
                    title="Reject"
                  >
                    <IoPersonRemove /> Reject
                  </button>
                  <button
                    onClick={() => handleDelete(rider)}
                    className="btn btn-xs btn-error text-white"
                    title="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovedRiders;