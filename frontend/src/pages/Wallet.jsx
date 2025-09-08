import { useState } from "react";
import axios from "axios";

export default function Wallet() {
  const [amount, setAmount] = useState("");
  const email = localStorage.getItem("email");

  const addMoney = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/add", { email, amount: Number(amount) });
      alert(`Money added. New balance: ₹${res.data.balance}`);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding money");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Money</h2>
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addMoney} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Money
      </button>
    </div>
  );
}
