import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import NoDataFound from "../../../components/NoDataFound";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosLocal from "../../../hooks/useAxiosLocal";

const FeaturedClassess = () => {
  const axiosLocal = useAxiosLocal();

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
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosLocal.get("/featured-classes");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
        <h1 className="text-center text-5xl font-semibold mb-6 mt-9">Featured Classes</h1>
      {classes.length === 0 ? (
        <NoDataFound message="No classes found." />
      ) : (
        <div>
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
         <div className="w-fit mx-auto">
             <Link to="/classes" className="btn btn-primary w-fit mx-auto">
            Show all classes
          </Link>
         </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedClassess;
