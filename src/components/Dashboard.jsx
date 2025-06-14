
import React, { useEffect, useState } from 'react';
import ArticleTable from './ArticleTable';
import Filters from './Filters';
import PayoutTable from './PayoutTable';
import ExportButtons from './ExportButtons';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Google Sign-In
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Persist user on reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch articles
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=432da7d144fc430e85d9741331f6ea89`
        );
        const data = await response.json();

        if (data.status !== 'ok') throw new Error(data.message || 'News API failed');

        const formatted = data.articles.map((item, idx) => ({
          id: idx,
          title: item.title || 'Untitled',
          author: item.author || 'Unknown',
          date: item.publishedAt?.split('T')[0] || 'N/A',
          type: idx % 2 === 0 ? 'news' : 'blog',
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

  const chartData = [
    { name: 'News', value: articles.filter((a) => a.type === 'news').length },
    { name: 'Blog', value: articles.filter((a) => a.type === 'blog').length },
  ];

  if (!user) {
    return (
      <div className="p-6 text-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">🧠 News Dashboard</h1>
        {authLoading ? (
          <p className="text-blue-600">Signing in...</p>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        )}
      </div>
    );
  }

  if (loading) return <div className="p-4 text-blue-600">Loading articles...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📊 News & Blog Dashboard</h1>
        <div className="text-right text-sm">
          <p>Signed in as: <strong>{user.displayName}</strong></p>
          <button
            onClick={logout}
            className="mt-1 text-blue-600 hover:underline text-xs"
          >
            Logout
          </button>
        </div>
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        payoutPerArticle={10} // safe default
        setPayoutPerArticle={() => {}}
        isAdmin={true}
      />

      <ArticleTable articles={filteredArticles} />

      <PayoutTable data={filteredArticles} isAdmin={true} />

     <ExportButtons data={filteredArticles} />


      {/* Chart Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Article Type Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
