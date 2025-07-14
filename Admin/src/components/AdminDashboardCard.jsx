import React from 'react'

const AdminDashboardCard = ({ title, count, icon, bg }) => {
  return (
    <div className={`bg-white shadow rounded-xl p-6 flex items-center gap-4 ${bg}`}>
      <div className="bg-green-100 p-3 rounded-full text-green-600">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{count}</p>
      </div>
    </div>
  );
};

export default AdminDashboardCard;