import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
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

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#080D22] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#18C6D9]" />
            <h3 className="text-xl font-bold">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
            Note: This document reflects Synvora IT standard operational and client confidentiality principles. Company legal counsel can customize specific clauses before public production deployment.
          </div>

          {type === 'privacy' ? (
            <>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Information We Collect</h4>
                <p>
                  When you submit an inquiry through our website, we collect contact information
                  including your name, business email address, company name, project parameters,
                  and technical scope requirements solely for communicating regarding your prospective engagement.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Non-Disclosure & Confidentiality</h4>
                <p>
                  All proprietary specifications, technical blueprints, and commercial plans shared
                  with Synvora IT are treated as confidential. We never sell, rent, or distribute
                  client project briefs or personal contact information to any third party.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Data Security & Storage</h4>
                <p>
                  Inquiry submissions and client workspace credentials are protected using industry-standard
                  transport layer security (TLS 1.3) and encrypted databases. Access is restricted to
                  authorized engineering leads.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Your Rights</h4>
                <p>
                  You have the right to request access to, correction of, or deletion of your project
                  inquiry records at any time by contacting{' '}
                  <span className="font-semibold text-slate-900">privacy@synvorait.com</span>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Nature of Services</h4>
                <p>
                  Synvora IT provides custom software engineering, digital product development,
                  technical consulting, and cloud infrastructure integration services under
                  formally executed Statements of Work (SOW).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Intellectual Property Rights</h4>
                <p>
                  Unless otherwise specified in a custom Master Services Agreement, 100% of all bespoke
                  code, architectural models, and design assets developed for a client transfer
                  to the client upon receipt of milestone compensation.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Project Estimates & Scoping</h4>
                <p>
                  Inquiry forms and preliminary budget discussions on this site are non-binding estimates.
                  Binding timelines and commercial terms are established exclusively through formal
                  written agreements.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Limitation of Liability</h4>
                <p>
                  While we adhere to professional software engineering and security practices,
                  website informational content is provided "as is" without implied warranty.
                </p>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Last updated: October {currentYear} · Synvora IT
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
