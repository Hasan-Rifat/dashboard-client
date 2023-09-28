import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import AllUser from "../pages/AllUser";
import AddUser from "../pages/AddUser";
import Auth from "../utils/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <MainLayout />
      </Auth>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/all-user",
        element: <AllUser />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
  /*  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "blogs",
        element: <ALLBlogs />,
      },
    ],
  }, */
]);

export default router;
