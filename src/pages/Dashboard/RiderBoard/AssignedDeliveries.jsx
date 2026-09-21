import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assign`,
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status };
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
      <h2 className="text-4xl">Parcels Pending Pickup: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                <td>{parcel.parcelName}</td>

                {/* Confirm Column */}
                <td>
                  {parcel.deliveryStatus === "driver_assign" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black ml-3">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="badge badge-success p-3 text-white">
                      Accepted
                    </span>
                  )}
                </td>
                <td>

                {/* Other Options / Actions Column */}
            
                  {parcel.deliveryStatus === "driver_assign" && (
                    <span className="text-gray-400 italic">Accept first</span>
                  )}

                  {parcel.deliveryStatus === "rider_arriving" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-warning text-black"
                    >
                      Mark as Picked up
                    </button>
                  )}

                  {/* if picked up */}
                  {parcel.deliveryStatus === "parcel_picked_up" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-info text-white"
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {/* ৪. if delivery completed  */}
                  {parcel.deliveryStatus === "parcel_delivered" && (
                    <span className="badge badge-success p-3 text-white font-bold">
                      Parcel Delivered
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