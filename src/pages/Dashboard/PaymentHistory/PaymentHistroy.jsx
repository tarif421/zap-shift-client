import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentHistroy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-5xl">Payment History: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment , index) =>    <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.parcelName || "No Name Provided"}</td>
              <td>${payment.amount} {payment.currency.toUpperCase()}</td>
              <td>{payment.
transactionId}</td>
              <td>Blue</td>
            </tr> )
            }
         
          
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistroy;
