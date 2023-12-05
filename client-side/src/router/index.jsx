import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import "../App.css";
import Home from "../views/Home";
import DetailPage from "../views/DetailPage";

const router =  createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id/detail",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router
