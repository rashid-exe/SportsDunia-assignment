// File: src/components/ArticleCharts.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

const ArticleCharts = ({ articles }) => {
  // Count articles by author
  const authorData = Object.values(
    articles.reduce((acc, curr) => {
      acc[curr.author] = acc[curr.author] || { author: curr.author, count: 0 };
      acc[curr.author].count++;
      return acc;
    }, {})
  );

  // Count articles by type
  const typeData = Object.values(
    articles.reduce((acc, curr) => {
      acc[curr.type] = acc[curr.type] || { name: curr.type, value: 0 };
      acc[curr.type].value++;
      return acc;
    }, {})
  );

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">📈 Article Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart for Authors */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium mb-2">Articles per Author</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authorData}>
              <XAxis dataKey="author" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Types */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium mb-2">Articles by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {typeData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ArticleCharts;
