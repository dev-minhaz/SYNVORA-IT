import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/content';
import { CaseStudyItem } from '../types';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface CaseStudiesPageProps {
  onSelectCaseStudy?: (caseStudy: CaseStudyItem) => void;
  onStartProject?: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onSelectCaseStudy,
  onStartProject,
}) => {
  useSEO({
    title: 'Portfolio & Case Studies | Synvora IT',
    description:
      'Explore case studies and architectures shipped by Synvora IT: B2B wholesale platform, real-time analytics engine, and collaborative SaaS.',
  });

  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = CASE_STUDIES.filter((cs) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'commerce') return cs.id === 'commerce-platform';
    if (activeFilter === 'analytics') return cs.id === 'analytics-dashboard';
    if (activeFilter === 'saas') return cs.id === 'saas-productivity';
    return true;
  });

  const handleSelect = (project: CaseStudyItem) => {
    if (onSelectCaseStudy) {
      onSelectCaseStudy(project);
    } else {
      navigate(`/portfolio/${project.slug}`);
    }
  };

  const handleStart = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Header Banner */}
      <section className="bg-[#080D22] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <span>PORTFOLIO & SYSTEM PROTOTYPES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Selected Work & Architecture Showcases.
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              Explore in-depth engineering breakdowns of custom platforms, high-throughput analytics
              engines, and modern SaaS ecosystems.
            </p>

            <button
              onClick={handleStart}
              className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shadow-lg shadow-[#2563EB]/25 hover:opacity-95 transition-all cursor-pointer"
            >
              Discuss Your Project Requirements
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Projects (3)
          </button>
          <button
            onClick={() => setActiveFilter('commerce')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'commerce'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            B2B Commerce & Wholesale
          </button>
          <button
            onClick={() => setActiveFilter('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'analytics'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Enterprise Telemetry & Analytics
          </button>
          <button
            onClick={() => setActiveFilter('saas')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'saas'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            SaaS & Workflow Suites
          </button>
        </div>
      </div>

      {/* Case Studies Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {filteredProjects.map((project, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={project.id}
              onClick={() => handleSelect(project)}
              className="group bg-white rounded-3xl border border-[#E4EAF3] hover:border-[#2563EB]/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 cursor-pointer"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E4EAF3] bg-slate-900 shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#080D22]/85 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-200">
                      {project.badgeLabel}
                    </div>
                    <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <ExternalLink className="w-4 h-4 text-[#2563EB]" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] group-hover:text-[#2563EB] transition-colors tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                      {project.shortDescription}
                    </p>

                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-6">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB] group-hover:text-[#18C6D9] transition-colors">
                    <span>Inspect Case Study & Architectural Blueprint</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
