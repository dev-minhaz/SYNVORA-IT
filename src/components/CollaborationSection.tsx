import React from 'react';
import { COLLABORATION_PRINCIPLES } from '../data/content';
import { MessageSquare, Shield, Clock, Award } from 'lucide-react';

const icons = [
  <MessageSquare className="w-5 h-5 text-[#2563EB]" />,
  <Shield className="w-5 h-5 text-[#18C6D9]" />,
  <Clock className="w-5 h-5 text-[#16C79A]" />,
  <Award className="w-5 h-5 text-[#8B5CF6]" />,
];

export const CollaborationSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>CLIENT EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            What Collaboration Should Feel Like.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            We hold ourselves to rigorous partnership standards: direct access to senior engineers,
            uncompromising transparency, and dependable delivery cadence.
          </p>
        </div>

        {/* 4 Experience Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COLLABORATION_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3] hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-white border border-[#E4EAF3] w-fit mb-5 shadow-sm">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>Standard SLA Commitment</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
