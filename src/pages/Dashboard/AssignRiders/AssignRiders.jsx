import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  const { data: parcels = [], refetch: parcelsRefetch, isLoading: parcelsLoading } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&available&district=${selectedParcel?.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider has been assigned successfully!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to assign",
          text: "Something went wrong!",
        });
      });
  };

  if (parcelsLoading) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#003b36]">
          Assign Riders
        </h2>
        <span className="bg-[#bbf7d0] text-[#003b36] font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
          Pending Parcels: {parcels.length}
        </span>
      </div>

      {parcels.length === 0 ? (
        <div className="text-center py-16 bg-base-200/50 rounded-xl border border-dashed border-base-300">
          <p className="text-gray-500 font-medium text-sm sm:text-base">
            No parcels pending pickup found!
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
                  <th>Parcel Name</th>
                  <th>Cost</th>
                  <th>Created At</th>
                  <th>Pickup District</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover">
                    <th>{index + 1}</th>
                    <td className="font-medium text-[#003b36]">{parcel.parcelName}</td>
                    <td>৳{parcel.cost}</td>
                    <td className="text-gray-500">
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="badge badge-ghost font-medium">
                        {parcel.senderDistrict}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => openAssignRiderModal(parcel)}
                        className="btn btn-sm bg-[#003b36] hover:bg-[#002824] text-white"
                      >
                        <FaUserCheck className="text-base" />
                        Find Riders
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {parcels.map((parcel, index) => (
              <div
                key={parcel._id}
                className="bg-base-200/60 border border-base-300 rounded-xl p-4 shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold">#{index + 1}</span>
                    <h3 className="font-bold text-base text-[#003b36]">
                      {parcel.parcelName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(parcel.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="badge badge-success text-white font-semibold">
                    ৳{parcel.cost}
                  </span>
                </div>

                <div className="text-xs text-gray-600 flex justify-between border-t border-base-300 pt-2">
                  <span><strong>District:</strong> {parcel.senderDistrict}</span>
                </div>

                <div className="flex justify-end pt-2 border-t border-base-300">
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-sm bg-[#003b36] hover:bg-[#002824] text-white w-full"
                  >
                    <FaUserCheck className="text-base" />
                    Find Riders
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for Riders List */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl bg-base-100 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4 border-b border-base-200 pb-3">
            <h3 className="font-bold text-lg text-[#003b36]">
              Available Riders ({riders.length})
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              District: {selectedParcel?.senderDistrict}
            </span>
          </div>

          {ridersLoading ? (
            <div className="flex justify-center items-center py-10">
              <span className="loading loading-spinner loading-md text-[#003b36]"></span>
            </div>
          ) : riders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium text-sm">
              No available approved riders found in this district!
            </div>
          ) : (
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-200 sticky top-0">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, i) => (
                    <tr key={rider._id}>
                      <th>{i + 1}</th>
                      <td className="font-medium">{rider.name}</td>
                      <td className="text-gray-500">{rider.email}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-xs sm:btn-sm bg-[#003b36] hover:bg-[#002824] text-white"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action mt-4 border-t border-base-200 pt-3">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost border border-base-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;