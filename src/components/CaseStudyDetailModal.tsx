import React, { useEffect } from 'react';
import { CaseStudyItem } from '../types';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Target, Layers } from 'lucide-react';

interface CaseStudyDetailModalProps {
  project: CaseStudyItem | null;
  onClose: () => void;
  onDiscussProject: (projectTitle: string) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  project,
  onClose,
  onDiscussProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-[#080D22] via-[#0E1538] to-[#1A2352] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-[#18C6D9] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-[11px] text-slate-300 font-mono">
                {project.badgeLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Visual Mockup */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={project.imagePath}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Metric Bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#F7F9FC] border border-[#E4EAF3]">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-lg sm:text-2xl font-black font-mono text-[#2563EB] tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>Project Overview</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {project.fullOverview}
            </p>
          </div>

          {/* Challenge & Approach 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/60">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span>The Core Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/60">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Our Proposed Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed font-normal">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16C79A]" />
              <span>Key Architectural Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18C6D9] shrink-0 mt-2" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Technology Stack Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Interested in building a platform with similar technical requirements?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => onDiscussProject(project.title)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer w-1/2 sm:w-auto"
            >
              <span>Discuss a Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
