import React from "react";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: payments = []} = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`)
        return res.data
    },
  });
  return (
    <div>
      <h2 className="text-5xl">Payment History:  {payments.length}</h2>
    </div>
  );
};

export default PaymentHistory;
