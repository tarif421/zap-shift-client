import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading) {
  return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-2">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
      <p className="text-gray-400 text-xs font-semibold">Please wait</p>
    </div>
  )
  }
  return <div><h2>Please Pay : {parcel.parcelName}</h2></div>;
};

export default Payment;
