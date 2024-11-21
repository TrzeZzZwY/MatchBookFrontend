'use client';

import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard';
import Users from '@/components/Dashboard/Users/Users';
import Books from '@/components/Dashboard/Books/Books';
import Authors from '@/components/Dashboard/Authors/Authors';
import Reports from '@/components/Dashboard/Reports/Reports';
import BookPoint from '@/components/Dashboard/BookPoint/BookPoint';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
    <div className="flex h-screen overflow-hidden bg-background md:h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-1 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
