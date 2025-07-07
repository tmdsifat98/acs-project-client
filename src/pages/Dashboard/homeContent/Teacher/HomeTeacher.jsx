import React from "react";

const HomeTeacher = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-base-200 dark:bg-gray-700 rounded shadow">
        <h3 className="font-semibold text-lg mb-2">My Classes Today</h3>
        <ul className="list-disc pl-5">
          <li>Physics Class - 10:00 AM</li>
          <li>Math Class - 2:00 PM</li>
        </ul>
      </div>
      <div className="p-4 bg-base-200 dark:bg-gray-700 rounded shadow">
        <h3 className="font-semibold text-lg mb-2">Pending Assignments</h3>
        <p>You have 5 assignments to review.</p>
      </div>
    </div>
  );
};

export default HomeTeacher;
