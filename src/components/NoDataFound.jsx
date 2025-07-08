import { useNavigate } from "react-router";


const NoDataFound = ({ message = "No data found.", redirectTo = "/" }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{message}</h2>
      <button
        onClick={handleRedirect}
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NoDataFound;
