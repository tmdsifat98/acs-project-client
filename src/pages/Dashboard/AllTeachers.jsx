import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTeachers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch approved teachers
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["approvedTeachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers?status=approved");
      return res.data;
    },
  });

  // Mutation: Delete teacher and downgrade user role
  const deleteMutation = useMutation({
    mutationFn: async (teacher) => {
      await axiosSecure.delete(`/teachers/${teacher._id}`);
      await axiosSecure.patch(`/users/role/${teacher.email}`, { role: "user" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["approvedTeachers"]);
      Swal.fire("Deleted", "Teacher removed and role updated.", "info");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete teacher", "error");
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading teachers...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-base-100 dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Approved Teachers</h2>

      {teachers.length === 0 ? (
        <p>No approved teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Department</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher._id}>
                  <td>{index + 1}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.institution}</td>
                  <td>{teacher.department}</td>
                  <td>{teacher.mobile}</td>
                  <td>
                    <button
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "This will remove the teacher and revert the user role.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, Delete",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(teacher);
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

export default AllTeachers;
