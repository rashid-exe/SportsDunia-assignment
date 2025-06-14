import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExportButtons({ data }) {
  const rate = localStorage.getItem("rate") || 10;

  const grouped = Object.entries(
    data.reduce((acc, item) => {
      acc[item.author] = acc[item.author] ? acc[item.author] + 1 : 1;
      return acc;
    }, {})
  );

  const exportCSV = () => {
    const headers = ["Author", "Articles", "Total Payout"];
    const rows = grouped.map(([author, count]) => [author, count, `₹${count * rate}`]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "payout_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["Author", "Articles", "Total Payout"]],
      body: grouped.map(([author, count]) => [
        author,
        count,
        `₹${count * rate}`,
      ]),
    });
    doc.save("payout_report.pdf");
  };

  const exportToGoogleSheets = () => {
    alert("Google Sheets export requires OAuth and Google Sheets API setup. Not implemented yet.");
  };

  return (
    <div className="mt-4 space-x-2">
      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
      >
        Export CSV
      </button>
      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
      >
        Export PDF
      </button>
      <button
        onClick={exportToGoogleSheets}
        className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700"
      >
        Export to Google Sheets
      </button>
    </div>
  );
}
