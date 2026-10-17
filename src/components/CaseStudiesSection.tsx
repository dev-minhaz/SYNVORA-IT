import React from 'react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudyItem } from '../types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudyItem) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onSelectCaseStudy,
}) => {
  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>SELECTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            Solutions Designed to Make an Impact.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            Explore examples of the digital experiences, platforms, and software solutions we can build.
          </p>
        </div>

        {/* 3 Large Showcase Project Cards */}
        <div className="space-y-12 lg:space-y-16">
          {CASE_STUDIES.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={project.id}
                onClick={() => onSelectCaseStudy(project)}
                className="group bg-[#F7F9FC] hover:bg-white rounded-3xl border border-[#E4EAF3] hover:border-[#2563EB]/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 cursor-pointer"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Media Visual Column: 7 cols */}
                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E4EAF3] bg-slate-900 shadow-md group-hover:shadow-xl transition-shadow">
                      <img
                        src={project.imagePath}
                        alt={`${project.title} Interface Mockup`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Illustrative Concept Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#080D22]/85 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-200">
                        {project.badgeLabel}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <ExternalLink className="w-4 h-4 text-[#2563EB]" />
                      </div>
                    </div>
                  </div>

                  {/* Information Column: 5 cols */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      {/* Category */}
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
                        {project.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] group-hover:text-[#2563EB] transition-colors tracking-tight mb-4 leading-snug">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6 font-normal">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Key Performance Indicators */}
                      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-slate-200/80 mb-6">
                        {project.metrics.map((metric, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono tabular-nums">
                              {metric.value}
                            </div>
                            <div className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Action */}
                    <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB] group-hover:text-[#18C6D9] transition-colors">
                      <span>Explore Full Architecture & Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
