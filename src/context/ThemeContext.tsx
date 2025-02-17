'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type React from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(
      'theme',
      JSON.stringify({ value: newTheme, timestamp: Date.now() }),
    );
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      const { value, timestamp } = JSON.parse(storedTheme);

      if (Date.now() - timestamp < 12 * 60 * 60 * 1000) {
        setThemeState(value);
        return;
      } else {
        localStorage.removeItem('theme');
      }
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setThemeState(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
