import React, { useState } from "react";
import axios from "axios";

const TransferMoney = () => {
  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/transfer", {
        fromUserId,
        toUserId,
        amount: Number(amount),
      });
      setMessage(`✅ ${res.data.message}, New Balance: ₹${res.data.balance}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleTransfer}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Transfer Money</h2>
        <input
          type="text"
          placeholder="From User ID"
          value={fromUserId}
          onChange={(e) => setFromUserId(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
          required
        />
        <input
          type="text"
          placeholder="To User ID"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Transfer
        </button>
        {message && (
          <p className="mt-4 text-center font-medium text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default TransferMoney;
