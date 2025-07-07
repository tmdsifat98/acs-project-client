import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeATeacher = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const teacherData = {
        ...data,
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const res = await axiosSecure.post("/teachers", teacherData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your request has been submitted.", "success");
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-primary">Be a Teacher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name */}
        <div className="space-y-1">
          <label className="label">Name</label>
          <input
            readOnly
            defaultValue={user?.displayName || ""}
            className="input input-bordered w-full dark:bg-gray-700"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="label">Email</label>
          <input
            readOnly
            defaultValue={user?.email || ""}
            className="input input-bordered w-full dark:bg-gray-700"
          />
        </div>

        {/* interested in */}
        <div className="space-y-1">
          <label className="label">Want to teach</label>
          <select
            {...register("interestedSubject", {
              required: "Subject is required",
            })}
            className="select select-bordered w-full dark:bg-gray-700"
          >
            <option value="">Select a subject</option>
            <option value="Physics">Physics</option>
            <option value="ICT">ICT</option>
            <option value="Math">Math</option>
          </select>
          {errors.interestedSubject && (
            <span className="text-red-500">
              {errors.interestedSubject.message}
            </span>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-1">
          <label className="label">Mobile Number</label>
          <input
            type="text"
            {...register("mobile", { required: "Mobile number is required" })}
            className="input input-bordered w-full dark:bg-gray-700"
            placeholder="Your mobile number"
          />
          {errors.mobile && (
            <span className="text-red-500">{errors.mobile.message}</span>
          )}
        </div>

        {/* Institution */}
        <div className="space-y-1">
          <label className="label">Institution</label>
          <input
            type="text"
            {...register("institution", {
              required: "Institution name is required",
            })}
            className="input input-bordered w-full dark:bg-gray-700"
            placeholder="Your institution"
          />
          {errors.institution && (
            <span className="text-red-500">{errors.institution.message}</span>
          )}
        </div>

        {/* Department / Subject */}
        <div className="space-y-1">
          <label className="label">Department / Subject</label>
          <input
            type="text"
            {...register("department", {
              required: "Department / Subject is required",
            })}
            className="input input-bordered w-full dark:bg-gray-700"
            placeholder="Your department or subject"
          />
          {errors.department && (
            <span className="text-red-500">{errors.department.message}</span>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-1">
          <label className="label">Years of Experience</label>
          <input
            type="number"
            {...register("experience", { required: "Experience is required" })}
            className="input input-bordered w-full dark:bg-gray-700"
            placeholder="Years of teaching experience"
          />
          {errors.experience && (
            <span className="text-red-500">{errors.experience.message}</span>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-1">
          <label className="label">Short Bio</label>
          <textarea
            {...register("bio")}
            className="textarea textarea-bordered w-full dark:bg-gray-700"
            placeholder="Write a few lines about yourself (optional)"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BeATeacher;
