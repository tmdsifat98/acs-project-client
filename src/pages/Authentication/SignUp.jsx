import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import signUpAnimation from "../../assets/signuplottie.json";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { IoEye, IoEyeOff, IoLockOpenOutline } from "react-icons/io5";
import Lottie from "lottie-react";

const SignUp = () => {
  const { createUser } = useAuth();
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const { email, password, name } = data;
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
          photoURL: imageUrl || "https://i.ibb.co/Rk2y0f77/default.webp",
        }).then(() => {
          axiosLocal.post("/users", { email,name }).then((res) => {
            if (res.data.insertedId) {
              navigate("/");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account has been created successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          draggable: true,
        });
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formData
      );
      setImageUrl(res.data.data.display_url);
    } catch (err) {
      console.error("Image Upload Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:gap-20 mt-12 md:mt-0 items-center min-h-[calc(100vh-72px)]">
      {/* Left Side - Form */}
      <div className="z-10 w-11/12 backdrop-blur-sm p-8 rounded shadow-2xl md:max-w-md transition-colors duration-500">
                <h1 className="text-center text-black dark:text-white font-semibold text-3xl mb-3">Please Sign Up!</h1>
        <div className="flex justify-center mb-2">
          <div className="relative w-24 h-24 tooltip" data-tip="Upload image">
            {loading ? (
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-400 animate-spin"></div>
            ) : (
              <img
                src={imageUrl || "https://i.ibb.co/Rk2y0f77/default.webp"}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border dark:border-gray-600"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded dark:text-gray-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2 rounded dark:text-gray-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <div className="w-full flex gap-2 justify-between items-center px-2 py-2 border  rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full focus:outline-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IoEyeOff size={19} /> : <IoEye size={19} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="w-full flex gap-2 justify-between items-center px-2 py-2 border  rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none">
              <input
                type={showConfirmPass ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full focus:outline-none"
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <IoEyeOff size={19} /> : <IoEye size={19} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full text-black">
            Sign Up
          </button>
        </form>
        <p className="mt-2 dark:text-gray-200">
          Already have an account? Please{" "}
          <Link className="text-blue-700 hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
        <div className="divider dark:text-white">OR</div>
        <SocialLogin />
      </div>

      {/* Right Side - Image */}
      <div>
        <Lottie animationData={signUpAnimation} className="" />
      </div>
    </div>
  );
};
export default SignUp;