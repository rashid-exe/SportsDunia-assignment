import React, { useState, useEffect } from 'react';
import ArticleTable from './ArticleTable';
import Filters from './Filters';
import PayoutTable from './PayoutTable';
import ExportButtons from './ExportButtons';
import ArticleCharts from './ArticleCharts'; // 📊 Import chart component

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [payoutPerArticle, setPayoutPerArticle] = useState(() => localStorage.getItem('payout') || 10);
  const [isAdmin, setIsAdmin] = useState(true); // Set false to simulate regular user
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('payout', payoutPerArticle);
  }, [payoutPerArticle]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=432da7d144fc430e85d9741331f6ea89`
        );
        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error(data.message || 'News API failed');
        }

        const formatted = data.articles.map((item, idx) => ({
          id: idx,
          title: item.title || 'Untitled',
          author: item.author || 'Unknown',
          date: item.publishedAt?.split('T')[0] || 'N/A',
          type: idx % 2 === 0 ? 'news' : 'blog', // Alternate type for filter variety
        }));

        setArticles(formatted);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredArticles = articles.filter((article) => {
    return (
      (filterType === 'all' || article.type === filterType) &&
      (article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.author.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (loading) return <div className="p-4 text-blue-600">Loading articles...</div>;

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">📊 News & Blog Dashboard</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        payoutPerArticle={payoutPerArticle}
        setPayoutPerArticle={setPayoutPerArticle}
        isAdmin={isAdmin}
      />

      <ArticleTable articles={filteredArticles} />

      <ArticleCharts articles={filteredArticles} /> {/* 📈 Charts */}

      {isAdmin && (
        <PayoutTable data={filteredArticles} isAdmin={isAdmin} />
      )}

      <ExportButtons />

      <div className="mt-10 text-sm text-gray-500">
        Logged in as: {isAdmin ? 'Admin' : 'User'}
      </div>
    </div>
  );
};

export default Dashboard;
