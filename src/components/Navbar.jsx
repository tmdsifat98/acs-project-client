import React from "react";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/logo.webp";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Theme from "./Theme";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";

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
        <NavLink to="/classes">Classes</NavLink>
      </li>
      <li>
        <NavLink to="/testPaper">Test Paper</NavLink>
      </li>

      <li>
        <NavLink to="/studentRoutine">Routine</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/liveClasses">Live Class</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar md:w-11/12 mx-auto z-50 py-3">
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
          <div className="hidden lg:block">
            <Logo />
          </div>
          <img className="h-10 lg:hidden" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 text-lg font-semibold">{links}</ul>
      </div>
      <div className="navbar-end gap-2 lg:gap-4 items-center">
        {user ? (
          <div className="dropdown">
            <div tabIndex={0} role="button">
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu absolute bg-white dark:bg-gray-800 bg-red items-center gap-2 rounded-box z-1 w-44 mt-2 p-2 shadow-sm right-0"
            >
              <Theme />
              <li>{user.displayName}</li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary text-black"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login">
            <button className="btn hover:bg-primary">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
