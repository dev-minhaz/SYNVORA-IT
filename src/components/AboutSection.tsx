import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverApproach: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscoverApproach }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Architecture Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E4EAF3] bg-white shadow-xl shadow-slate-900/5 group aspect-[4/3]">
              <img
                src="/src/assets/images/about_tech_architecture_1791812589173.jpg"
                alt="Synvora IT Layered Software Architecture and Digital Ecosystem"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Modular Enterprise Engineering
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Clean architecture principles applied across all projects
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md">
                    <span>100% Typed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#18C6D9]/15 to-[#2563EB]/15 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
              <span>ABOUT SYNVORA IT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight mb-6">
              Technology Built Around Your Business.
            </h2>

            <p className="text-base text-[#64748B] leading-relaxed mb-8">
              At Synvora IT, we focus on solving business challenges through thoughtful design,
              dependable engineering, and practical technology. Our approach combines clear
              communication, purposeful innovation, and scalable digital solutions to help
              organizations move forward with confidence.
            </p>

            {/* Three Value Statements */}
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4EAF3] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#18C6D9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Business-First Thinking</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    We start with your operational and commercial goals before deciding on frameworks or code abstractions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4EAF3] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Engineering with Purpose</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Clean, maintainable, strictly typed codebases built to stand the test of high user volumes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4EAF3] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#16C79A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Partnerships Built on Communication</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Transparent weekly milestones, working demonstrations, and rapid feedback loops with senior engineers.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onDiscoverApproach}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#111827] hover:bg-[#1E293B] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Discover Our Approach</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
