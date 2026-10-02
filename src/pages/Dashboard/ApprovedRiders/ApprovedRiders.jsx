import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      // pending riders are those with status "pending"
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const updateRiderStatus = async (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    try {
      const res = await axiosSecure.patch(
        `/riders/${rider._id}/role`,
        updateInfo,
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

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">
        Riders Pending Approval ({riders.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <span
                    className={`badge ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {rider.status || "pending"}
                  </span>
                </td>
                <td>{rider.workStatus || "N/A"}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-ghost">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-sm btn-success text-white"
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
                    className="btn btn-sm btn-error text-white"
                    title="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRiders;
