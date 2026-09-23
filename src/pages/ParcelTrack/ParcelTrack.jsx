import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  FaSearch,
  FaBoxOpen,
  FaTruckLoading,
  FaMotorcycle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ParcelTrack = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  
  
  const initialTrackingId = searchParams.get("trackingId") || "";
  const [searchInput, setSearchInput] = useState(initialTrackingId);
  const [activeTrackingId, setActiveTrackingId] = useState(initialTrackingId);

  // TanStack useQuery 
  const {
    data: trackingLogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tracking", activeTrackingId],
    enabled: !!activeTrackingId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${activeTrackingId}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedId = searchInput.trim();
    if (!trimmedId) return;
    
    setActiveTrackingId(trimmedId);
    setSearchParams({ trackingId: trimmedId });
  };

  // according to status icon and badge color....
  const getStatusConfig = (status) => {
    switch (status) {
      case "pending-pickup":
        return {
          title: "Order Placed & Pending Pickup",
          badgeClass: "badge-warning",
          icon: <FaBoxOpen className="text-warning text-xl" />,
          color: "border-warning bg-warning/10",
        };
      case "driver_assign":
        return {
          title: "Rider Assigned",
          badgeClass: "badge-info",
          icon: <FaMotorcycle className="text-info text-xl" />,
          color: "border-info bg-info/10",
        };
      case "rider_arriving":
        return {
          title: "Rider On The Way For Pickup",
          badgeClass: "badge-primary",
          icon: <FaTruckLoading className="text-primary text-xl" />,
          color: "border-primary bg-primary/10",
        };
      case "parcel_picked_up":
        return {
          title: "Parcel Picked Up",
          badgeClass: "badge-accent",
          icon: <FaMotorcycle className="text-accent text-xl" />,
          color: "border-accent bg-accent/10",
        };
      case "parcel_delivered":
        return {
          title: "Parcel Successfully Delivered",
          badgeClass: "badge-success",
          icon: <FaCheckCircle className="text-success text-xl" />,
          color: "border-success bg-success/10",
        };
      case "rejected":
        return {
          title: "Delivery Rejected/Cancelled",
          badgeClass: "badge-error",
          icon: <FaTimesCircle className="text-error text-xl" />,
          color: "border-error bg-error/10",
        };
      default:
        return {
          title: status?.replace(/_/g, " ").toUpperCase() || "Status Updated",
          badgeClass: "badge-ghost",
          icon: <FaClock className="text-gray-500 text-xl" />,
          color: "border-gray-300 bg-gray-50",
        };
    }
  };

  const latestStatus = trackingLogs.length > 0 ? trackingLogs[trackingLogs.length - 1] : null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 my-8">
      {/* Search Header */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 mb-8 border border-base-200">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Track Your Parcel
        </h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          Enter your Zap Shift tracking ID to get real-time delivery status updates.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. ZAP-2026-A1B2C3"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button type="submit" className="btn btn-primary text-black px-8">
            Track Parcel
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 bg-base-100 rounded-2xl shadow">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-gray-500 font-medium">Fetching tracking status...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="alert alert-error shadow-lg my-4">
          <FaTimesCircle className="text-2xl" />
          <span>Failed to load tracking data: {error?.message || "Something went wrong!"}</span>
        </div>
      )}

      {/* Not Found State */}
      {!isLoading && !isError && activeTrackingId && trackingLogs.length === 0 && (
        <div className="text-center p-10 bg-base-100 rounded-2xl shadow border border-dashed border-gray-300">
          <FaBoxOpen className="text-5xl text-gray-300 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-700 mb-1">No Tracking History Found</h3>
          <p className="text-gray-500 text-sm">
            We couldn't find any details for tracking ID: <span className="font-semibold">{activeTrackingId}</span>
          </p>
        </div>
      )}

      {/* Tracking Results Area */}
      {!isLoading && trackingLogs.length > 0 && (
        <div className="space-y-6">
          {/* Current Status Overview Card */}
          <div className="bg-base-100 shadow-md rounded-2xl p-6 border-l-8 border-primary flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Tracking ID
              </span>
              <h2 className="text-2xl font-extrabold text-primary">{activeTrackingId}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <FaClock />
                <span>
                  Last Updated: {latestStatus?.createdAt ? new Date(latestStatus.createdAt).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`badge ${getStatusConfig(latestStatus?.status).badgeClass} badge-lg p-4 font-bold text-white uppercase`}>
                {latestStatus?.status?.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b pb-3">
              <FaMapMarkerAlt className="text-primary" /> Delivery Journey History
            </h3>

            <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-8 my-2">
              {trackingLogs.map((log, index) => {
                const config = getStatusConfig(log.status);
                const isLatest = index === trackingLogs.length - 1;

                return (
                  <div key={log._id || index} className="relative pl-6 md:pl-8 group">
                    {/* Circle Dot / Icon */}
                    <div
                      className={`absolute -left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-base-100 ${
                        isLatest ? `${config.color} ring-4 ring-primary/20 scale-110` : "border-gray-300"
                      } transition-all`}
                    >
                      {config.icon}
                    </div>

                    {/* Step Details */}
                    <div className="bg-base-200/50 p-4 rounded-xl hover:bg-base-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="font-bold text-base text-gray-800 flex items-center gap-2">
                          {config.title}
                          {isLatest && (
                            <span className="badge badge-xs badge-primary animate-pulse">Current</span>
                          )}
                        </h4>
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {log.details || `Parcel status changed to ${log.status}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelTrack;