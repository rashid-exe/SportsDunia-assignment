export default function Sidebar() {
  return (
    <div className="w-1/5 bg-gray-100 p-4 hidden md:block">
      <ul className="space-y-4 text-lg">
        <li>Dashboard</li>
        <li>News</li>
        <li>Payouts</li>
        <li>Export</li>
      </ul>
    </div>
  );
}
