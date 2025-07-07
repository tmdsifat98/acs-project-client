import React from 'react';

const HomeAdmin = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-lime-100 dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold text-lg">Total Students</h3>
            <p className="text-2xl font-bold">124</p>
          </div>
          <div className="p-4 bg-orange-100 dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold text-lg">Total Teachers</h3>
            <p className="text-2xl font-bold">15</p>
          </div>
          <div className="p-4 bg-sky-100 dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold text-lg">Pending Requests</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="col-span-1 md:col-span-3 bg-base-200 dark:bg-gray-700 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Revenue Summary</h3>
            <p>This month revenue: <strong>৳ 25,000</strong></p>
          </div>
        </div>
    );
};

export default HomeAdmin;