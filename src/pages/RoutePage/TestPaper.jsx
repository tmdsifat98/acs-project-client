import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TestPaperCard from "../../components/TestPaperCard";
import NoDataFound from "../../components/NoDataFound";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";

const TestPaper = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
      document.title="Test Papers"
    },[])

  const { data: papers = [], isLoading } = useQuery({
    queryKey: ["testpapers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/testpapers");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  if (papers.length === 0)
    return <NoDataFound message="No test paper at this moment"/>;

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">All Test Papers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <TestPaperCard key={paper._id} paper={paper} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestPaper;
