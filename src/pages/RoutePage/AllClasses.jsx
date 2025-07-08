import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoDataFound from "../../components/NoDataFound";

const subjects = ["All", "Physics", "Math", "ICT"];
const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [sub, setSub] = useState("All");

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["allClasses", sub],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?sub=${sub}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }
  function convertToEmbedUrl(url) {
    if (!url) return "";
    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname.includes("/embed/")
      ) {
        return url;
      }

      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        const search = parsedUrl.search;
        return `https://www.youtube.com/embed/${videoId}${search}`;
      }

      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname === "/watch"
      ) {
        const videoId = parsedUrl.searchParams.get("v");
        const searchParams = new URLSearchParams(parsedUrl.search);
        searchParams.delete("v");
        const extraQuery = searchParams.toString();
        return `https://www.youtube.com/embed/${videoId}${
          extraQuery ? "?" + extraQuery : ""
        }`;
      }

      return "";
    } catch {
      return "";
    }
  }

  return (
    <div>
      <h1 className="text-center font-bold text-5xl my-5">All Classes</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-6 mb-12">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSub(subject)}
            className={`px-5 py-1 rounded-full transition-colors duration-300 capitalize cursor-pointer
        ${sub === subject ? "bg-primary text-white" : "bg-gray-200 text-black"}
      `}
          >
            {subject}
          </button>
        ))}
      </div>
      {classes.length === 0 ? (
        <NoDataFound message="No classes found."/>
      ) : (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const embedUrl = convertToEmbedUrl(cls.youtubeLink);

            return (
              <div
                key={cls._id}
                className="bg-base-100 dark:bg-gray-800 shadow rounded overflow-hidden"
              >
                <div className="aspect-video">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={cls.className}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <p className="text-center p-4">Invalid video URL</p>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">{cls.className}</h3>
                  <p>
                    <strong>Teacher:</strong> {cls.teacherName}
                  </p>
                  <p className="text-sm text-gray-500">{cls.teacherEmail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
