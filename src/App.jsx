import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingIndicator from './components/LoadingIndicator';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { getUserLogged, putAccessToken } from './utils/network-data';
import localeContent from './utils/localeContent';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'id';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    async function checkAuth() {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthedUser(data);
      } else {
        setAuthedUser(null);
      }
      setInitializing(false);
    }

    checkAuth();
  }, []);

  async function onLoginSuccess() {
    const { error, data } = await getUserLogged();
    if (!error) {
      setAuthedUser(data);
    }
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
    localStorage.removeItem('accessToken');
  }

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme: () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      },
    };
  }, [theme]);

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale: () => {
        setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
      },
    };
  }, [locale]);

  const content = localeContent[locale];

  if (initializing) {
    return (
      <ThemeProvider value={themeContextValue}>
        <LocaleProvider value={localeContextValue}>
          <div className="app-container app-container--initializing" data-theme={theme}>
            <LoadingIndicator />
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={themeContextValue}>
      <LocaleProvider value={localeContextValue}>
        <div className="app-container" data-theme={theme}>
          <header>
            <h1>
              <Link to="/">{content.appTitle}</Link>
            </h1>
            <Navigation authedUser={authedUser} onLogout={onLogout} />
          </header>
          <main>
            {authedUser === null ? (
              <Routes>
                <Route
                  path="/register"
                  element={<RegisterPage />}
                />
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivesPage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
