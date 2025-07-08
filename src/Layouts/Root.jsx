import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 z-[50]">
      <nav className="backdrop-blur-lg bg-black/20">
        <Navbar />
      </nav>
      <div className="-z-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
