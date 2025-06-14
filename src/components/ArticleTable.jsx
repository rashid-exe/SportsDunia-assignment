// File: src/components/ArticleTable.jsx
import React from 'react';

const ArticleTable = ({ articles }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t">
              <td className="p-2">{article.title}</td>
              <td className="p-2">{article.author}</td>
              <td className="p-2">{article.date}</td>
              <td className="p-2 capitalize">{article.type}</td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td className="p-2 text-center" colSpan="4">
                No matching articles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
