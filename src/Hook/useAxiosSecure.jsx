import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../Hook/useAuth"; // আপনার Auth Hook-এর ফাইল পাথ

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-psi-three.vercel.app", // আপনার ব্যাকএন্ড URL
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Request Interceptor: প্রতি রিকোয়েস্টে ফ্রেশ টোকেন পাঠানো
  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        // Firebase থেকে তাজা আইডি টোকেন জেনারেট করা
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response Interceptor: ৪০১ বা ৪০৩ এরর আসলে অটো লগআউট
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/auth/login");
      }
      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
