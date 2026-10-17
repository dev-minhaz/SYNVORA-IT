import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AppRoutes } from './routes/AppRoutes';

/**
 * Handles smooth transition for legacy hash links (#about, #services, #estimator, etc.)
 * redirecting them automatically into their dedicated React Router routes.
 */
function HashRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) return;

      if (hash === 'about') {
        navigate('/about', { replace: true });
      } else if (hash === 'services') {
        navigate('/services', { replace: true });
      } else if (hash.startsWith('service/')) {
        const sId = hash.replace('service/', '');
        navigate(`/services/${sId}`, { replace: true });
      } else if (hash === 'portfolio' || hash === 'case-studies') {
        navigate('/portfolio', { replace: true });
      } else if (hash.startsWith('case-study/')) {
        const cId = hash.replace('case-study/', '');
        navigate(`/portfolio/${cId}`, { replace: true });
      } else if (hash === 'consultation' || hash === 'book-call') {
        navigate('/consultation', { replace: true });
      } else if (hash === 'estimator') {
        navigate('/estimator', { replace: true });
      } else if (hash === 'contact') {
        navigate('/contact', { replace: true });
      } else if (hash === 'portal' || hash === 'dashboard' || hash === 'login') {
        navigate('/login', { replace: true });
      } else if (hash === 'privacy') {
        navigate('/privacy', { replace: true });
      } else if (hash === 'terms') {
        navigate('/terms', { replace: true });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <HashRedirectHandler />
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}
