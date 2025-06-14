import { useEffect, useState } from "react";

export default function PayoutTable({ data, isAdmin }) {
  const [rate, setRate] = useState(() => localStorage.getItem("rate") || 10);

  useEffect(() => {
    localStorage.setItem("rate", rate);
  }, [rate]);

  const grouped = data.reduce((acc, item) => {
    acc[item.author] = acc[item.author] ? acc[item.author] + 1 : 1;
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Payouts</h2>
      {isAdmin && (
        <div className="mb-2">
          <label className="mr-2">Rate per article:</label>
          <input
            className="border px-2 py-1 w-20"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      )}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Author</th>
            <th>Articles</th>
            <th>Total Payout</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([author, count]) => (
            <tr key={author} className="border-t text-sm">
              <td className="p-2">{author}</td>
              <td>{count}</td>
              <td>₹{count * rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
