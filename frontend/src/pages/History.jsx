import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:5000/api/wallet/history/${email}`)
        .then((res) => setHistory(res.data))
        .catch(() => setHistory([]));
    }
  }, [email]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((txn, idx) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">{txn.type}</td>
              <td className="p-2 border">₹{txn.amount}</td>
              <td className="p-2 border">{txn.from || "-"}</td>
              <td className="p-2 border">{txn.to || "-"}</td>
              <td className="p-2 border">{new Date(txn.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
