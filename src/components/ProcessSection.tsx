import React from 'react';
import { PROCESS_STEPS } from '../data/content';
import { Search, Compass, Code, Rocket, CheckCircle } from 'lucide-react';

const stepIcons: Record<string, React.ReactNode> = {
  '01': <Search className="w-5 h-5 text-[#2563EB]" />,
  '02': <Compass className="w-5 h-5 text-[#18C6D9]" />,
  '03': <Code className="w-5 h-5 text-[#8B5CF6]" />,
  '04': <Rocket className="w-5 h-5 text-[#16C79A]" />,
};

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            A Clear Path From Idea to Launch.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            Every project follows a transparent, disciplined delivery rhythm designed to eliminate
            ambiguity and keep milestones predictable.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl border border-[#E4EAF3] p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {stepIcons[step.number]}
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#111827] mb-2 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Deliverables
                </div>
                <div className="space-y-1.5">
                  {step.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-[#16C79A] shrink-0" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
