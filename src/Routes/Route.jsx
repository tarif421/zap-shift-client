import { createBrowserRouter } from "react-router";

import RootLayout from "../layout/RootLayout";
import Home from "../Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home
      },
    ],
  },
]);
