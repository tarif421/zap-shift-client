import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { MdTaskAlt } from "react-icons/md";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    enabled: !!user?.email,
    queryFn: async () => {
      
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status, riderId: parcel.riderId };
    let message = `Parcel status updated to ${status.split("_").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Assigned Deliveries: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Action / Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{parcel.parcelName}</td>

                {/* Confirm Column */}
                <td>
                  {parcel.deliveryStatus === "driver_assign" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black btn-sm mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rejected")
                        }
                        className="btn btn-warning text-black btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="badge badge-success p-3 text-white">
                      Accepted
                    </span>
                  )}
                </td>

                {/* Other Options / Actions Column */}
                <td>
                  {parcel.deliveryStatus === "driver_assign" && (
                    <span className="text-gray-400 italic">Accept first</span>
                  )}

                  {parcel.deliveryStatus === "rider_arriving" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-warning text-black btn-sm"
                    >
                      Mark as Picked up
                    </button>
                  )}

                  {parcel.deliveryStatus === "parcel_picked_up" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-info text-white btn-sm"
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {parcel.deliveryStatus === "parcel_delivered" && (
                    <span className="badge badge-success p-3 text-white font-bold flex items-center gap-1 w-fit">
                      <MdTaskAlt className="text-lg" /> Parcel Delivered
                    </span>
                  )}

                  {parcel.deliveryStatus === "rejected" && (
                    <span className="badge badge-error p-3 text-white font-bold">
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;