import { createBrowserRouter } from "react-router";

import RootLayout from "../layout/RootLayout";
import Home from "../Home/Home";
import Coverage from "../pages/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/shared/Auth/Login";
import Register from "../pages/shared/Auth/Register";

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
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("servicecenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout/>,
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
]);
