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
import AllTeachers from "../pages/Dashboard/AllTeachers";
import AllStudents from "../pages/Dashboard/AllStudents";
import MakeAdmin from "../pages/Dashboard/MakeAdmin";
import StudentRoutine from "../pages/RoutePage/StudentRoutine";
import TeacherRoute from "./TeacherRoute";
import AddClass from "../pages/Dashboard/AddClass";
import AllClasses from "../pages/RoutePage/AllClasses";
import MyClasses from "../pages/Dashboard/homeContent/MyClasses";
import ForbiddenPage from "../pages/Extra/ForbiddenPage";
import AddLiveClass from "../pages/Dashboard/AddLiveClass";
import LiveClasses from "../pages/RoutePage/LiveClasses";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "studentRoutine",
        element: (
          <PrivateRoute>
            <StudentRoutine />
          </PrivateRoute>
        ),
      },
      {
        path: "classes",
        element: (
          <PrivateRoute>
            <AllClasses/>
          </PrivateRoute>
        ),
      },
      {
        path: "liveClasses",
        element: (
          <PrivateRoute>
            <LiveClasses/>
          </PrivateRoute>
        ),
      },
    ],
  },
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
        path: "addClass",
        element: (
          <TeacherRoute>
            <AddClass/>
          </TeacherRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <TeacherRoute>
            <MyClasses/>
          </TeacherRoute>
        ),
      },
      {
        path: "addLiveClasses",
        element: (
          <TeacherRoute>
            <AddLiveClass/>
          </TeacherRoute>
        ),
      },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      
      {
        path: "allTeachers",
        element: (
          <AdminRoute>
            <AllTeachers />
          </AdminRoute>
        ),
      },
      {
        path: "allStudents",
        element: (
          <AdminRoute>
            <AllStudents />
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "beATeacher",
        Component: BeATeacher,
      },
    ],
  },
  {path:"/forbidden",Component:ForbiddenPage}
]);

export default router;
