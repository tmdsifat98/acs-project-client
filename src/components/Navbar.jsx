import React from "react";
import { IoMenu } from "react-icons/io5";
import Logo from "../assets/Logo-app.webp";
import LogoMb from "../assets/Logo-S.webp";
import { Link, NavLink } from "react-router";
import Theme from "./Theme";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
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
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-rooms">Rooms</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/myBookings">My Bookings</NavLink>
        </li>
      )}
       <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
       <li>
        <NavLink to="/gallery">Gallery</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar backdrop-blur-sm md:w-11/12 mx-auto z-50">
      <div className="navbar-start gap-3">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="cursor-pointer lg:hidden">
            <IoMenu size={27} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content dark:bg-gray-700 bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <img className="h-10 hidden md:block" src={Logo} alt="Logo" />
          <img className="md:hidden h-9" src={LogoMb} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 text-lg font-semibold">{links}</ul>
      </div>
      <div className="navbar-end gap-2 lg:gap-4 items-center">
        <Theme />
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              data-tooltip-id="navbar"
              data-tooltip-content={user?.displayName}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full z-50">
                <img id="user-photo" alt={user?.displayName} src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-500 w-44 mt-2 p-2 shadow"
            >
              <Button onclick={handleLogOut} label="Log Out"></Button>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login">
            <Button label="Login" />
          </Link>
        )}
         <Tooltip id="navbar" place="bottom" />
      </div>
    </div>
  );
};

export default Navbar;