import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 z-[50]">
      <nav className="backdrop-blur-lg bg-black/20">
        <Navbar />
      </nav>
      <div className="-z-50 min-h-[calc(100vh-400px)]">
        <Outlet />
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Root;
