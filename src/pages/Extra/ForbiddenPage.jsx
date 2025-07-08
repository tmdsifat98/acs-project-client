import React from "react";
import { Link } from "react-router";
const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-3xl font-semibold mb-2">Access Forbidden</h2>
      <p className="text-gray-600 mb-6">
        Sorry, you don't have permission to view this page.
      </p>
      <Link
        to="/dashboard"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
