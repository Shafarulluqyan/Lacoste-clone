import { createBrowserRouter, redirect } from "react-router-dom";
import ProductsPage from "../views/ProductsPage.jsx";
import CategoriesPage from "../views/CategoriesPage.jsx";
import LoginPage from "../views/LoginPage.jsx";
import AddProduct from "../views/AddNewProduct.jsx";
import AddCategory from "../views/AddNewCategory.jsx";
import Layout from "../components/Layout.jsx";
import "../App.css";
import DashboardPage from "../views/DashboardPage.jsx";
import RegisterAdmin from "../views/RegisterAdmin.jsx";
import EditProduct from "../views/EditProduct.jsx";
import EditCategory from "../views/EditCategory.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },

      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "/register-admin",
        element: <RegisterAdmin />,
      },
    ],
  },
]);

export default router;


