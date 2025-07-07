import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
