import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const effectRan = useRef(false);

  useEffect(() => {
    if (!sessionId || effectRan.current === true) return;

    effectRan.current = true;

    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Payment Verifying... Please Wait.
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl">Payment Success</h1>
      <p>Your TransictionId: {paymentInfo.transactionId}</p>
      <p>Your TrackingId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
