import { createBrowserRouter } from "react-router";

import RootLayout from "../layout/RootLayout";
import Home from "../Home/Home";
import Coverage from "../pages/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/shared/Auth/Login";
import Register from "../pages/shared/Auth/Register";
import Rider from "../Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },

      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("servicecenter.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("servicecenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
    ],
  },
]);
