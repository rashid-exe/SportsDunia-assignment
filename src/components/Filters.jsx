export default function Filters({ filterType, setFilterType }) {
  return (
    <div className="mb-4 flex gap-4">
      <select
        className="border px-2 py-1"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="news">News</option>
        <option value="blog">Blog</option>
      </select>
    </div>
  );
}
