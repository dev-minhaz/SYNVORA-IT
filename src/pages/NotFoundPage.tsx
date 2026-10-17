import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Home, Compass, Calendar, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useSEO({
    title: '404 - Page Not Found | Synvora IT',
    description: 'The requested page could not be located on the Synvora IT platform.',
  });

  return (
    <div className="pt-28 pb-24 bg-[#080D22] min-h-[80vh] text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#18C6D9] uppercase tracking-wider">
          <span>HTTP 404 &bull; ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          Page Not Located
        </h1>

        <p className="text-base text-slate-300 leading-relaxed font-normal">
          The requested page or endpoint has moved, been updated, or does not exist. Use the primary navigation links below to explore the Synvora IT platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shadow-lg shadow-[#2563EB]/25 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="px-5 py-3.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#18C6D9]" />
            <span>Browse Services</span>
          </Link>

          <Link
            to="/consultation"
            className="px-5 py-3.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#16C79A]" />
            <span>Schedule Discovery Call</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
