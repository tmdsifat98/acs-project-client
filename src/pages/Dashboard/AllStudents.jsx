import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllStudents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load all users with role: "user"
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["allStudents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=user");
      return res.data;
    },
  });

  // Mutation to delete user
  const deleteMutation = useMutation({
    mutationFn: async (user) => {
      // Delete from DB
      await axiosSecure.delete(`/users/${user._id}`);
      // Delete from Firebase
      await axiosSecure.delete(`/users/firebase/${user.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allStudents"]);
      Swal.fire("Deleted!", "Student has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete student.", "error");
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading students...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-base-100 dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.lastLogIn).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "This will remove the student permanently.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, delete",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(user);
                          }
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
