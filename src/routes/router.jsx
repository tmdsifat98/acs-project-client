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
import TeacherRequest from "../pages/Dashboard/homeContent/Admin/TeacherRequest";
import BeATeacher from "../pages/Dashboard/homeContent/Student/BeATeacher";
import AllTeachers from "../pages/Dashboard/homeContent/Admin/AllTeachers";
import AllStudents from "../pages/Dashboard/homeContent/Admin/AllStudents";
import MakeAdmin from "../pages/Dashboard/homeContent/Admin/MakeAdmin";
import StudentRoutine from "../pages/RoutePage/StudentRoutine";
import TeacherRoute from "./TeacherRoute";
import AddClass from "../pages/Dashboard/homeContent/Teacher/AddClass";
import AllClasses from "../pages/RoutePage/AllClasses";
import MyClasses from "../pages/Dashboard/homeContent/Teacher/MyClasses";
import ForbiddenPage from "../pages/Extra/ForbiddenPage";
import AddLiveClass from "../pages/Dashboard/homeContent/Teacher/AddLiveClass";
import LiveClasses from "../pages/RoutePage/LiveClasses";
import UploadTestPaper from "../pages/Dashboard/homeContent/Teacher/UploadTestPaper";
import TestPaper from "../pages/RoutePage/TestPaper";

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
      {
        path: "testPaper",
        element: (
          <PrivateRoute>
            <TestPaper/>
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
        path: "uploadTestPaper",
        element: (
          <TeacherRoute>
            <UploadTestPaper/>
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
