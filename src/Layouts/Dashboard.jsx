import React from "react";
import { MdLocalShipping, MdMenu } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import '../App.css';
import {
  FaArrowLeft,
  FaChalkboardTeacher,
  FaClipboardList,
  FaHome,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const Dashboard = () => {
  const { logOutUser } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log out successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: true,
        });
      });
  };

  const links = (
    <>
      <NavLink
        to="/dashboard"
        end
        className="flex gap-3 py-2 items-center pl-4"
      >
        <FaHome />
        Home
      </NavLink>
      {!roleLoading && role === "user" && (
        <>
          <NavLink
            to="/dashboard/beATeacher"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaChalkboardTeacher />
            Be a Teacher
          </NavLink>
        </>
      )}

      {!roleLoading && role === "admin" && (
        <>
          <NavLink
            to="/dashboard/teacherRequest"
            className="flex gap-3 py-2 items-center pl-4"
          >
            <FaClipboardList />
            Teacher Requests
          </NavLink>
          <NavLink
            className="flex gap-3 py-2 items-center pl-4"
            to="/dashboard/allTeachers"
          >
            <FaChalkboardTeacher />
            All Teachers
          </NavLink>
          <NavLink
            className="flex gap-3 py-2 items-center pl-4"
            to="/dashboard/allStudents"
          >
            <FaUserGraduate />
            All Students
          </NavLink>
          <NavLink
            className="flex gap-3 py-2 items-center pl-4"
            to="/dashboard/makeAdmin"
          >
            <FaUserShield />
            Make Admin
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <div className="drawer lg:drawer-open dark:bg-gray-900 dark:text-gray-200">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full dark:bg-gray-700">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <MdMenu size={25} />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-2xl font-bold">Dashboard</div>
        </div>
        <div className="px-6 py-4">
          <Outlet />
        </div>
      </div>
      <section className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-100 min-h-full w-80 p-0 dark:bg-gray-700 dark:text-gray-100">
          <Link to="/" className="bg-gray-300 py-2 px-4">
            <Logo />
          </Link>
          {links}
          <button
            onClick={handleLogout}
            className="btn fixed bottom-1 w-full  btn-primary text-black border-none"
          >
            <FaArrowLeft /> Logout
          </button>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
