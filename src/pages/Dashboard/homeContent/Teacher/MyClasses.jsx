import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import NoDataFound from "../../../../components/NoDataFound";

const MyClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["myClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes?email=${user?.email}`);
      return res.data;
    },
  });
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    className: "",
    youtubeLink: "",
  });

  const updateMutation = useMutation({
    mutationFn: async (updated) => {
      const res = await axiosSecure.patch(`/classes/${updated._id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses"]);
      setEditingClass(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/classes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses"]);
    },
  });

  const handleEdit = (cls) => {
    setEditingClass(cls._id);
    setFormData({
      className: cls.className,
      youtubeLink: cls.youtubeLink,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (email) => {
    updateMutation.mutate({ _id: editingClass, email, ...formData });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Something went wrong.", "error");
          },
        });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (classes.length === 0) {
    return <NoDataFound message="No classes found right now" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Classes</h2>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 border">Class Name</th>
            <th className="p-2 border">Teacher Name</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <React.Fragment key={cls._id}>
              {editingClass === cls._id ? (
                <tr>
                  <td className="p-2 border">
                    <input
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                    <input
                      name="youtubeLink"
                      value={formData.youtubeLink}
                      onChange={handleChange}
                      className="w-full border p-1 mt-1"
                      placeholder="YouTube Link"
                    />
                  </td>
                  <td className="p-2 border">{cls.teacherName}</td>
                  <td className="p-2 border">
                    {new Date(cls.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleUpdate(cls.teacherEmail)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingClass(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="p-2 border">{cls.className}</td>
                  <td className="p-2 border">{cls.teacherName}</td>
                  <td className="p-2 border">
                    {new Date(cls.createdAt).toLocaleString()}
                  </td>

                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(cls)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(cls._id)}
                      className="bg-red-500 btn btn-sm text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyClasses;
