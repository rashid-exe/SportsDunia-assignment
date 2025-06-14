export default function NewsList({ data }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Articles</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t text-sm">
              <td className="p-2">{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
              <td className="capitalize">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
