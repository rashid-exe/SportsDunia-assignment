export default function ExportButtons() {
  return (
    <div className="mt-6 space-x-2">
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Export as CSV
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Export as PDF
      </button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded">
        Export to Google Sheets
      </button>
    </div>
  );
}
