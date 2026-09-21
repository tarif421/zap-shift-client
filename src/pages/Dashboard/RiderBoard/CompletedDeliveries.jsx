import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdCheckCircle, MdAttachMoney, MdLocalShipping } from "react-icons/md";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  /**
   * Calculates rider payout based on delivery location rules.
   * Same district delivery yields an 80% payout rate; different district yields 60%.
   */
  const calculatePayout = (parcel) => {
    const cost = Number(parcel?.cost || parcel?.price || 0);
    if (isNaN(cost) || cost <= 0) return 0;

    const senderDist = parcel?.senderDistrict?.toString().trim().toLowerCase();
    const receiverDist = parcel?.receiverDistrict?.toString().trim().toLowerCase();

    // Determine payout rate based on route scope
    const isSameDistrict = senderDist && receiverDist && senderDist === receiverDist;
    const rate = isSameDistrict ? 0.8 : 0.6;

    return Math.round(cost * rate);
  };

  // Calculate total cumulative earnings for completed deliveries
  const totalEarnings = parcels.reduce(
    (sum, parcel) => sum + calculatePayout(parcel),
    0
  );

  if (isLoading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading completed deliveries...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Completed Deliveries</h2>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="stat bg-base-100 shadow border border-primary rounded-lg p-4 flex items-center gap-4">
          <div className="stat-figure text-primary text-4xl">
            <MdLocalShipping />
          </div>
          <div>
            <div className="stat-title text-gray-500">Total Delivered</div>
            <div className="stat-value text-2xl font-bold">{parcels.length}</div>
          </div>
        </div>

        <div className="stat bg-base-100 shadow border border-primary rounded-lg p-4 flex items-center gap-4">
          <div className="stat-figure text-success text-4xl">
            <MdAttachMoney />
          </div>
          <div>
            <div className="stat-title text-gray-500">Total Earnings</div>
            <div className="stat-value text-2xl font-bold text-success">
              ৳{totalEarnings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Deliveries Data Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Sender Name</th>
              <th>Route (From ➔ To)</th>
              <th>Total Cost</th>
              <th>Rider Earning</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              const payout = calculatePayout(parcel);
              const senderDist = parcel?.senderDistrict?.toString().trim().toLowerCase();
              const receiverDist = parcel?.receiverDistrict?.toString().trim().toLowerCase();
              const isSameDistrict = senderDist && receiverDist && senderDist === receiverDist;

              return (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td className="font-semibold">{parcel.parcelName || "N/A"}</td>
                  <td>{parcel.senderName || parcel.userName || "N/A"}</td>
                  <td>
                    <span className="text-xs badge badge-ghost">
                      {parcel.senderDistrict || "N/A"} ➔ {parcel.receiverDistrict || "N/A"}
                    </span>
                  </td>
                  <td>৳{parcel.cost || parcel.price || 0}</td>
                  <td className="font-bold text-success">
                    ৳{payout}{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      ({isSameDistrict ? "80%" : "60%"})
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success p-3 text-white font-bold flex items-center gap-1 w-fit">
                      <MdCheckCircle className="text-lg" /> Delivered
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;