import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoDataFound from "../../components/NoDataFound";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending teacher requests
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["pendingTeachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers?status=pending");
      return res.data;
    },
  });

  // Approve teacher request
  const approveMutation = useMutation({
    mutationFn: async (teacher) => {
      // 1) Update teacher status
      await axiosSecure.patch(`/teachers/${teacher._id}`, {
        status: "approved",
      });

      // 2) Update user role
      await axiosSecure.patch(`/users/role/${teacher.email}`, {
        role: "teacher",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingTeachers"]);
      Swal.fire("Success", "Teacher approved and role updated", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve teacher", "error");
    },
  });

  // Reject teacher request
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/teachers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingTeachers"]);
      Swal.fire("Deleted", "Request has been rejected", "info");
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject request", "error");
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-base-100 dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>
      {teachers.length === 0 ? (
        <NoDataFound message="No pending teacher requests found."/>
      ) : (
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="border p-4 rounded flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <div>
                  <p>
                    <strong>Name:</strong> {teacher.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {teacher.email}
                  </p>
                  <p>
                    <strong>Institution:</strong> {teacher.institution}
                  </p>
                  <p>
                    <strong>Experience:</strong> {teacher.experience} years
                  </p>
                  <p className="flex-1">
                    <strong>Bio:</strong> {teacher.bio || "No bio provided"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Department:</strong> {teacher.department}
                  </p>
                  <p>
                    <strong>Status:</strong> {teacher.status}
                  </p>
                  <p>
                    <strong>Phone:</strong> {teacher.mobile}
                  </p>
                  <p>
                    <strong>Requested at:</strong> {new Date(teacher.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => approveMutation.mutate(teacher)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => rejectMutation.mutate(teacher._id)}
                >
                  Reject
                </button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherRequest;
