import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff, IoLockOpenOutline } from "react-icons/io5";
import { Link } from "react-router";
import loginAnimation from "../../assets/loginLotie.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { MdOutlineEmail } from "react-icons/md";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };
  useEffect(() => {
    document.title = "All Event | Login";
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-center md:gap-20 items-center min-h-[calc(100vh-64px)]">
      <div className="z-10 w-11/12 backdrop-blur-sm p-8 rounded shadow-2xl md:max-w-md transition-colors duration-500">
        <h2 className="text-3xl font-bold font-playfair text-center  dark:text-white mb-6">
          Please Log in!
        </h2>

        <form className="space-y-2" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-semibold text-gray-600 dark:text-gray-300">
              Email
            </label>
            <div className="w-full flex gap-2 justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none">
              <MdOutlineEmail />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 border-0 outline-0"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="w-full flex gap-2 justify-between items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none">
              <IoLockOpenOutline />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-1 border-0 outline-0"
                required
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IoEyeOff size={19} /> : <IoEye size={19} />}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button className="w-full btn btn-primary">Log In</button>
          </div>
        </form>
        <p className="mt-4 dark:text-gray-200">
          Don't have any account? Please{" "}
          <Link className="text-blue-700 hover:underline" to="/auth/signup">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="hidden md:block">
        <Lottie animationData={loginAnimation} />
      </div>
    </div>
  );
};

export default Login;
