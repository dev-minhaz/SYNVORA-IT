import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onStartProject,
  onExploreServices,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#080D22] relative overflow-hidden text-white border-t border-white/10">
      {/* Ambient glowing radial effects */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#18C6D9]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#35D399]" />
          <span>START A CONVERSATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Have a Project in Mind?
        </h2>

        <p className="text-base sm:text-lg text-[#B8C4DA] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Tell us what you're building, what you're trying to improve, or where technology could
          take your business next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase rounded-xl overflow-hidden group cursor-pointer shadow-xl shadow-[#2563EB]/30 hover:shadow-[#18C6D9]/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] transition-transform duration-300 group-hover:scale-105" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Let's Talk About Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer"
          >
            Explore Our Services
          </button>
        </div>

        <p className="text-xs text-slate-400 font-normal">
          Start with a conversation. We'll help you define the next step.
        </p>
      </div>
    </section>
  );
};
