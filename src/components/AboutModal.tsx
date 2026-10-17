import React, { useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Cpu, Target, HeartHandshake } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#080D22] via-[#0E1538] to-[#1A2352] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-2">
              <span>OUR COMPANY & VALUES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              About Synvora IT
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Technology that moves businesses forward.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-2 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                To help businesses solve meaningful challenges through accessible, thoughtfully
                engineered digital solutions that produce measurable operational impact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-50/60 border border-cyan-100">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0891B2] mb-2 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                To contribute to a digital future where technology helps organizations work smarter,
                serve people better, and grow sustainably without compounding technical debt.
              </p>
            </div>
          </div>

          {/* Working Principles */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
              Core Engineering Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  <span>Strict Type Discipline</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We enforce strict TypeScript schemas from API contracts down to UI components to prevent runtime defects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <HeartHandshake className="w-4 h-4 text-[#16C79A]" />
                  <span>Direct Senior Access</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You communicate directly with experienced software engineers who write the code, not intermediary layers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#18C6D9]" />
                  <span>Full IP Ownership</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All bespoke source code, documentation, and architecture assets transfer unconditionally to your organization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Target className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Pragmatic Architecture</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We don't over-engineer with fragile hype. We select battle-tested, modular technologies that can be extended easily.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Philosophy */}
          <div className="p-6 rounded-2xl bg-[#080D22] text-white border border-white/10">
            <h4 className="text-sm font-bold text-[#18C6D9] uppercase tracking-wider mb-2">
              Technology Philosophy
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Software should simplify your business, not make it brittle. We design applications
              with high test coverage, clean folder hierarchies, strict automated build checks,
              and comprehensive documentation so that your internal teams are empowered at every step.
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Let's discuss how our approach fits your technical requirements.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer w-1/2 sm:w-auto"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
