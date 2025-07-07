import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../pages/Dashboard/TeacherRequest";
import BeATeacher from "../pages/Dashboard/BeATeacher";

const router = createBrowserRouter([
  { path: "/", Component: Root, children: [{ index: true, Component: Home }] },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "beATeacher",
        Component: BeATeacher,
      },
    ],
  },
]);

export default router;
