import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>All of my parcels : {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcels, index) => (
              <tr key={parcels.id}>
                <th>{index + 1}</th>
                <td>{parcels.parcelName}</td>
                <td>{parcels.parcelWeight}</td>
                <td>{parcels.parcelCost}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
