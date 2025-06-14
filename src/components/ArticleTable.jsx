export default function ArticleTable({ articles }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th>Author</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-t text-sm">
              <td className="p-2">{a.title}</td>
              <td>{a.author}</td>
              <td>{a.type}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
