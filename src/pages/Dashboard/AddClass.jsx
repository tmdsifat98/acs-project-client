import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const classData = {
      className: data.className,
      subjectName: data.subjectName.toLowerCase(),
      youtubeLink: data.youtubeLink,
      teacherName: user.displayName,
      teacherEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Class added successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add class", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-base-100 dark:bg-gray-800 p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Class Name */}
        <div>
          <label className="label">Class Name</label>
          <input
            type="text"
            {...register("className", { required: "Class name is required" })}
            placeholder="Enter class name"
            className="input input-bordered w-full dark:bg-gray-700"
          />
          {errors.className && (
            <span className="text-red-500">{errors.className.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <label className="label">Subject Name</label>
          <select
            {...register("subjectName", {
              required: "Subject is required",
            })}
            className="select select-bordered w-full dark:bg-gray-700"
          >
            <option value="">Select a subject</option>
            <option value="physics">Physics</option>
            <option value="ict">ICT</option>
            <option value="math">Math</option>
          </select>
          {errors.interestedSubject && (
            <span className="text-red-500">
              {errors.interestedSubject.message}
            </span>
          )}
        </div>

        {/* YouTube Link */}
        <div>
          <label className="label">YouTube Video Link</label>
          <input
            type="text"
            {...register("youtubeLink", {
              required: "YouTube link is required",
            })}
            placeholder="https://youtube.com/..."
            className="input input-bordered w-full dark:bg-gray-700"
          />
          {errors.youtubeLink && (
            <span className="text-red-500">{errors.youtubeLink.message}</span>
          )}
        </div>

        {/* Teacher Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Teacher Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label">Teacher Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
