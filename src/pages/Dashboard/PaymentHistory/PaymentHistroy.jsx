import { useQuery,  } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentHistroy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  // delte
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await axiosSecure.delete(`/payments/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        refetch();
      } else {
        Swal.fire("Error!", "Could not delete the order.", "error");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire("Error!", "Something went wrong on the server.", "error");
    }
  };
  //  const handleDelete = async (id) => {
  //   const confirm = await Swal.fire({
  //     title: "Delete this order?",
  //     text: "This action cannot be undone!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ef4444",
  //     confirmButtonText: "Yes, Delete",
  //   });

  //   if (!confirm.isConfirmed) return;

  //   try {
  //     const res = await axiosSecure.delete(`/all-orders/${id}`);

  //     if (res.data.deletedCount > 0) {
  //       Swal.fire("Deleted!", "Order has been deleted.", "success");
  //       refetch();
  //     } else {
  //       Swal.fire("Error!", "Could not delete the order.", "error");
  //     }
  //   } catch (error) {
  //     console.error("Delete Error:", error);
  //     Swal.fire("Error!", "Something went wrong on the server.", "error");
  //   }
  // };

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
              <th>Paid Time</th>
              <th>Transaction Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.parcelName || "No Name Provided"}</td>
                <td>
                  ${payment.amount} {payment.currency.toUpperCase()}
                </td>
                <td>{payment.paidAt}</td>
                <td>{payment.transactionId}</td>
                <th>
                  {" "}
                  <button
                    onClick={() => handleDelete(payment._id)}
                    className="text-red-700 btn "
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistroy;
