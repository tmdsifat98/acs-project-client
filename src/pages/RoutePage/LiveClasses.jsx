import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const LiveClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["liveClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/live-classes");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (classes.length === 0) {
    return <p className="text-center mt-10">No live classes found.</p>;
  }

  return (
   <div>
    <h1 className="text-center text-5xl font-semibold my-9">Live Clases</h1>
     <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {classes.map((cls) => (
        <div
          key={cls._id}
          className="bg-white shadow rounded p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">{cls.title}</h3>
            <p className="mb-2">by <strong>{cls.teacherName}</strong></p>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(cls.dateTime).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-3">{cls.description}</p>
          </div>
          <a
            href={cls.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Join Class
          </a>
        </div>
      ))}
    </div>
   </div>
  );
};

export default LiveClasses;
