import React from 'react';

const HomeStudent = () => {
    return (
        <div className="space-y-4">
          <div className="p-4 bg-base-200 dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">My Routine Today</h3>
            <ul className="list-disc pl-5">
              <li>Chemistry - 9:00 AM</li>
              <li>Biology - 11:00 AM</li>
              <li>Math - 3:00 PM</li>
            </ul>
          </div>
          <div className="p-4 bg-base-200 dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">My Courses</h3>
            <p>You are enrolled in 6 courses.</p>
          </div>
        </div>
    );
};

export default HomeStudent;