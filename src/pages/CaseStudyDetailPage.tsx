import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/content';
import { CaseStudyItem } from '../types';
import { useSEO } from '../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  ShieldCheck,
  Layers,
  Wrench,
  Calendar,
} from 'lucide-react';

interface CaseStudyDetailPageProps {
  project?: CaseStudyItem;
  onBackToCaseStudies?: () => void;
  onDiscussProject?: (projectTitle: string) => void;
  onBookCall?: () => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  project: propProject,
  onBackToCaseStudies,
  onDiscussProject,
  onBookCall,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const activeProject =
    propProject ||
    CASE_STUDIES.find((c) => c.slug === slug || c.id === slug) ||
    CASE_STUDIES[0];

  useSEO({
    title: `${activeProject.title} Case Study | Synvora IT`,
    description: activeProject.shortDescription,
  });

  const handleBack = () => {
    if (onBackToCaseStudies) onBackToCaseStudies();
    else navigate('/portfolio');
  };

  const handleDiscuss = (title: string) => {
    if (onDiscussProject) onDiscussProject(title);
    else navigate('/contact', { state: { initialScope: `Architecture inspired by ${title}` } });
  };

  const handleBook = () => {
    if (onBookCall) onBookCall();
    else navigate('/consultation', { state: { initialTopic: activeProject.title } });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#080D22] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button
              onClick={handleBack}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Case Studies</span>
            </button>
            <span>/</span>
            <span className="text-[#18C6D9] font-medium">{activeProject.title}</span>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase">
                {activeProject.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeProject.badgeLabel}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              {activeProject.title}
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              {activeProject.shortDescription}
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xl">
              {activeProject.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#35D399]">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* High-res Interface Display */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-4 sm:p-6 shadow-sm overflow-hidden">
              <img
                src={activeProject.imagePath}
                alt={activeProject.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl border border-slate-100"
              />
            </div>

            {/* Overview */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#2563EB]" />
                <span>Executive Overview</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {activeProject.fullOverview}
              </p>
            </div>

            {/* Challenge & Proposed Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-8 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>The Challenge</span>
                </div>
                <p className="text-sm text-amber-900 leading-relaxed font-normal">
                  {activeProject.challenge}
                </p>
              </div>

              <div className="bg-blue-50/60 rounded-3xl border border-blue-200/80 p-8 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-900 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>Our Approach</span>
                </div>
                <p className="text-sm text-blue-900 leading-relaxed font-normal">
                  {activeProject.approach}
                </p>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#8B5CF6]" />
                <span>Deep Architectural Highlights</span>
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {activeProject.architectureHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-2" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#16C79A]" />
                <span>Implemented Platform Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProject.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#16C79A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gradient-to-b from-[#080D22] via-[#0E1538] to-[#121948] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-wider text-[#18C6D9] mb-2">
                  CUSTOM SCOPE INQUIRY
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Build a Similar System
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Interested in deploying an architecture inspired by this case study? Our senior engineers can draft a tailored milestone plan.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleDiscuss(activeProject.title)}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Similar Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleBook}
                    className="w-full py-3 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#16C79A]" />
                    <span>Schedule Discovery Call (UTC)</span>
                  </button>
                </div>

                {/* Tech Tags */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-300 bg-white/10 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleBack}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to All Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
