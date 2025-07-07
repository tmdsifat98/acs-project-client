// src/pages/dashboard/DashboardHome.jsx
import React from "react";
import HomeAdmin from "./homeContent/Admin/HomeAdmin";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";
import HomeStudent from "./homeContent/Student/HomeStudent";
import HomeTeacher from "./homeContent/Teacher/HomeTeacher";

const DashboardHome = () => {
  const { user } = useAuth();
  const {role, roleLoading} = useUserRole();

  if (roleLoading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-primary">
        Welcome, {user?.displayName || "User"}!
      </h2>

      {/* Admin View */}
      {role === "admin" && <HomeAdmin />}

      {/* Teacher View */}
      {role === "teacher" && (
       <HomeTeacher/>
      )}

      {/* Student View */}
      {role === "user" && (
        <HomeStudent/>
      )}
    </div>
  );
};

export default DashboardHome;
