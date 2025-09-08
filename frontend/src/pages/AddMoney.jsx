import React, { useState } from "react";
import axios from "axios";

const AddMoney = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMoney = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/add", {
        userId,
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
        onSubmit={handleAddMoney}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Add Money</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
          className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition"
        >
          Add Money
        </button>
        {message && (
          <p className="mt-4 text-center font-medium text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddMoney;
