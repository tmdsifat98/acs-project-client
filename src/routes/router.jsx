import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";

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
]);

export default router;
