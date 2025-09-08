import React, { useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/history/${userId}`
      );
      setTransactions(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error fetching history");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Transaction History
        </h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-grow border p-3 rounded-xl"
          />
          <button
            onClick={fetchHistory}
            className="bg-purple-500 text-white px-6 rounded-xl hover:bg-purple-600 transition"
          >
            Fetch
          </button>
        </div>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((txn) => (
              <li
                key={txn._id}
                className="p-4 border rounded-xl shadow-sm flex justify-between"
              >
                <span>
                  {txn.type === "add" ? "➕ Added" : "🔁 Transferred"} ₹
                  {txn.amount}
                  {txn.toUser ? ` to ${txn.toUser.name}` : ""}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(txn.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
