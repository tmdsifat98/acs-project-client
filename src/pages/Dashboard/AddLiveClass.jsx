import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddLiveClass = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const liveData = {
      teacherName: user.displayName,
      teacherEmail: user.email,
      ...data,
    };
    try {
      const res = await axiosSecure.post("/live-classes", liveData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Live class created successfully.", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create Live Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Class Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. Physics Live Session"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Meeting Link</label>
          <input
            type="url"
            {...register("meetingLink", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. https://meet.google.com/..."
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
            placeholder="Brief description..."
          />
        </div>
        <button type="submit" className="w-full btn btn-primary">
          Create Live Class
        </button>
      </form>
    </div>
  );
};

export default AddLiveClass;
