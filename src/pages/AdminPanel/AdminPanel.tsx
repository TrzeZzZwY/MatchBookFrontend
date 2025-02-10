'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard';
import Users from '@/components/Dashboard/Users/Users';
import Books from '@/components/Dashboard/Books/Books';
import Authors from '@/components/Dashboard/Authors/Authors';
import Reports from '@/components/Dashboard/Reports/Reports';
import BookPoint from '@/components/Dashboard/BookPoint/BookPoint';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'books':
        return <Books />;
      case 'authors':
        return <Authors />;
      case 'reports':
        return <Reports />;
      case 'bookpoints':
        return <BookPoint />;
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background md:h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex justify-between border-b p-4">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </header>
          <main className="flex-1 overflow-auto p-1 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminPanel;
