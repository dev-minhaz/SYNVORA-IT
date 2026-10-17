import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClientDashboard } from '../components/ClientDashboard';
import { SynvoraLogo } from '../components/SynvoraLogo';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

export const ClientPortalPage: React.FC = () => {
  useSEO({
    title: 'Client Workspace Portal | Synvora IT',
    description:
      'Secure client workspace portal for Synvora IT partner accounts to monitor sprint velocity, staging deployments, and deliverable sign-offs.',
  });

  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthNotice('Please provide both your registered work email and workspace password.');
      return;
    }

    setIsLoading(true);
    setAuthNotice(null);

    // If demo credentials or any email, allow immediate entry with simulated token
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    setIsAuthenticated(true);
    addToast(
      'Client Workspace Loaded',
      'Welcome to the Synvora IT live workspace for Acme Global Corp.',
      'success'
    );
  };

  const handleEnterDemo = () => {
    setIsAuthenticated(true);
    addToast(
      'Demo Workspace Active',
      'Now previewing the live sprint board, deliverables, and architecture telemetry.',
      'success'
    );
  };

  if (isAuthenticated) {
    return (
      <ClientDashboard
        onBackToSite={() => navigate('/')}
        onLogout={() => {
          setIsAuthenticated(false);
          addToast('Session Ended', 'Logged out of client workspace portal.', 'info');
        }}
      />
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#080D22] min-h-screen text-white relative overflow-hidden flex items-center justify-center">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#18C6D9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10">
        <div className="bg-[#0E1538]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4 focus:outline-none">
              <SynvoraLogo variant="dark" size="md" />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#18C6D9] uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3" />
              <span>SECURE WORKSPACE PORTAL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Client Project Access</h1>
            <p className="text-xs text-slate-400 mt-1">
              Sprint velocity, staging builds, deliverables, and team communication.
            </p>
          </div>

          {/* Quick Demo Access Callout */}
          <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-[#2563EB]/20 via-[#18C6D9]/15 to-transparent border border-[#18C6D9]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-[#35D399] shrink-0" />
              <span className="text-slate-200">
                Evaluating Synvora? Inspect the live client experience:
              </span>
            </div>
            <button
              onClick={handleEnterDemo}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] hover:opacity-95 shadow-sm transition-opacity shrink-0 cursor-pointer"
            >
              Demo Portal
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authNotice && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {authNotice}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/15 focus:border-[#18C6D9] focus:outline-none transition-colors text-white pl-10"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setAuthNotice(
                      'For password reset requests, please email inquiries@synvorait.com with your client account ID.'
                    )
                  }
                  className="text-[11px] text-[#18C6D9] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/15 focus:border-[#18C6D9] focus:outline-none transition-colors text-white pl-10 pr-10"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-[#2563EB] focus:ring-0"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] hover:opacity-95 shadow-lg shadow-[#2563EB]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security details & Return link */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#35D399]" />
                <span>256-Bit TLS Encryption</span>
              </span>
              <span>SSO / Okta Ready</span>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Synvora IT Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
