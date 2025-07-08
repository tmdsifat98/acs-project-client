import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UploadTestPaper = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/api/testpapers", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Test paper added successfully!", "success");
      reset();
      queryClient.invalidateQueries(["testpapers"]);
    },
    onError: (err) => {
      console.log(err);
      Swal.fire("Error", "Failed to add class", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Test Paper</h2>

      {/* Image URL */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Image URL</label>
        <input
          placeholder="Upload image Url"
          type="text"
          {...register("image", {
            required: "Image URL is required",
          })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Name</label>
        <input
          placeholder="Test paper name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Subject</label>
        <input
          placeholder="Enter subject name"
          type="text"
          {...register("subject", { required: "Subject is required" })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}
      </div>

      {/* Publication */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Publication</label>
        <input
          placeholder="Test paper publications"
          type="text"
          {...register("publication", { required: "Publication is required" })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.publication && (
          <p className="text-red-500 text-sm">{errors.publication.message}</p>
        )}
      </div>

      {/* Published Year */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Published Year</label>
        <input
          placeholder="Published year"
          type="number"
          {...register("publishedYear", {
            required: "Published year is required",
            min: { value: 1900, message: "Year must be >= 1900" },
            max: { value: new Date().getFullYear(), message: "Invalid year" },
          })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.publishedYear && (
          <p className="text-red-500 text-sm">{errors.publishedYear.message}</p>
        )}
      </div>

      {/* Pages */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Pages</label>
        <input
          placeholder="Number of pages"
          type="number"
          {...register("pages", { required: "Pages are required" })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.pages && (
          <p className="text-red-500 text-sm">{errors.pages.message}</p>
        )}
      </div>

      {/* File Size */}
      <div className="mb-6">
        <label className="font-medium">File Size</label>
        <input
          placeholder="Total file size"
          type="text"
          {...register("fileSize", { required: "File size is required" })}
          className="input input-bordered w-full dark:bg-gray-600"
        />
        {errors.fileSize && (
          <p className="text-red-500 text-sm">{errors.fileSize.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-primary w-full"
      >
        {mutation.isPending ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadTestPaper;
