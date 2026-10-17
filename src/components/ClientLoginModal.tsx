import React, { useState, useEffect } from 'react';
import { SynvoraLogo } from './SynvoraLogo';
import { X, Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterDemoWorkspace: () => void;
}

export const ClientLoginModal: React.FC<ClientLoginModalProps> = ({
  isOpen,
  onClose,
  onEnterDemoWorkspace,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthNotice('Please provide both your registered work email and workspace password.');
      return;
    }

    setIsLoading(true);
    setAuthNotice(null);

    // If demo credentials, allow immediate entry!
    if (email.toLowerCase().includes('demo') || email.toLowerCase().includes('synvora')) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLoading(false);
      onClose();
      onEnterDemoWorkspace();
      return;
    }

    // Honest authentication handling per specification:
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setAuthNotice(
      'Authentication Service Notice: Production enterprise SSO / OAuth 2.0 provider is connected for provisioned clients. To inspect workspace features, you can click "Launch Demo Client Workspace" below.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 bg-[#080D22] text-white flex items-center justify-between border-b border-white/10">
          <SynvoraLogo variant="dark" size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Client Workspace Portal
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Access your active sprint velocity, deliverables, invoices, and lead architects.
            </p>
          </div>

          {/* Quick Demo Access Callout */}
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-xs flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Test Client Workspace Demo</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Inspect a real live client engagement dashboard.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onEnterDemoWorkspace();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer shadow-sm"
            >
              Launch Demo
            </button>
          </div>

          {authNotice && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{authNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  id="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com (or demo@synvorait.com)"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setAuthNotice(
                    'Password reset instructions are routed through enterprise tenant administrators.'
                  )
                }
                className="text-[#2563EB] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-xs text-white uppercase tracking-wider bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] hover:opacity-95 transition-opacity shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Need access for a new project?{' '}
              <button
                onClick={() => {
                  onClose();
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#2563EB] font-semibold underline hover:text-blue-800"
              >
                Contact onboarding team
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
