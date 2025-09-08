import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💳 Payment App Dashboard
        </h1>
        <div className="space-y-4">
          <Link
            to="/add-money"
            className="block bg-green-500 text-white py-3 rounded-xl shadow hover:bg-green-600 transition"
          >
            Add Money
          </Link>
          <Link
            to="/transfer-money"
            className="block bg-blue-500 text-white py-3 rounded-xl shadow hover:bg-blue-600 transition"
          >
            Transfer Money
          </Link>
          <Link
            to="/transactions"
            className="block bg-purple-500 text-white py-3 rounded-xl shadow hover:bg-purple-600 transition"
          >
            Transaction History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;