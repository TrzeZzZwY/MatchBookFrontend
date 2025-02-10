'use client';

import { useState, useEffect } from 'react';
import {
  Book,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  Library,
  LogOut,
  Users,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, label: 'Panel', id: 'dashboard' },
  { icon: Book, label: 'Książki', id: 'books' },
  { icon: Users, label: 'Użytkownicy', id: 'users' },
  { icon: FileText, label: 'Autorzy', id: 'authors' },
  { icon: BookOpen, label: 'Wypożyczenia', id: 'rentals' },
  { icon: AlertTriangle, label: 'Zgłoszenia', id: 'reports' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsSidebarCollapsed(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-muted text-muted-foreground transition-all duration-300 ease-in-out',
        isSidebarCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="flex h-14 items-center justify-between p-4">
        <a className="flex items-center" href="/">
          <Library className="mr-2 h-8 w-8" />
          <h1
            className={cn(
              'text-xl font-bold transition-opacity duration-300',
              isSidebarCollapsed && 'opacity-0',
            )}
          >
            MatchBook
          </h1>
        </a>
        <ThemeToggle />
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isSidebarCollapsed && 'justify-center px-0',
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon
                    className={cn('h-5 w-5', !isSidebarCollapsed && 'mr-2')}
                  />
                  <span
                    className={cn(
                      'transition-opacity duration-300',
                      isSidebarCollapsed && 'sr-only',
                    )}
                  >
                    {item.label}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <Button
        variant="ghost"
        className={cn(
          'mb-4 mt-auto transition-all duration-300',
          isSidebarCollapsed && 'justify-center px-0',
        )}
        onClick={handleLogout}
      >
        <LogOut className={cn('h-5 w-5', !isSidebarCollapsed && 'mr-2')} />
        <span
          className={cn(
            'transition-opacity duration-300',
            isSidebarCollapsed && 'sr-only',
          )}
        >
          Logout
        </span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'absolute -right-3 top-1/2 -translate-y-1/2 transform rounded-full border border-border bg-muted',
          isSmallScreen && 'right-0 -translate-x-1/2',
        )}
        onClick={toggleSidebar}
        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
}
