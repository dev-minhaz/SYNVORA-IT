import React from 'react';
import { ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreServices }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#080D22]"
    >
      {/* Ambient background glow & radial grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#2563EB]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#18C6D9]/12 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#8B5CF6]/10 rounded-full blur-[160px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 55% */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-[#18C6D9] uppercase mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18C6D9]" />
              <span>YOUR TECHNOLOGY PARTNER</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-2xl text-balance">
              Build Smarter.{' '}
              <span className="bg-gradient-to-r from-[#268BFF] via-[#18C6D9] to-[#35D399] bg-clip-text text-transparent">
                Grow Beyond Limits.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed max-w-xl mb-8 font-normal">
              Synvora IT helps ambitious businesses turn complex ideas into powerful digital
              experiences, scalable software, and technology solutions built for growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4">
              <button
                onClick={onStartProject}
                className="relative inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase rounded-xl overflow-hidden group cursor-pointer shadow-xl shadow-[#2563EB]/25 hover:shadow-[#18C6D9]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18C6D9]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] transition-transform duration-300 group-hover:scale-105" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18C6D9]"
              >
                Explore Our Services
              </button>
            </div>

            {/* Microcopy reassurance */}
            <p className="text-xs text-slate-400 mb-8 font-normal">
              From first idea to production-ready solutions.
            </p>

            {/* Compact Trust Indicators */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-[#18C6D9]" />
                  <span>Rapid Velocity</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Agile 2-week sprint cycles</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16C79A]" />
                  <span>Quality Assured</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Automated test suites</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Full Ownership</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">100% source code IP rights</p>
              </div>
            </div>
          </div>

          {/* Right Column: 45% - High-Tech 3D Artwork */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-[#0E163B]/60 shadow-2xl shadow-black/70 backdrop-blur-sm group">
              <img
                src="/src/assets/images/hero_tech_ecosystem_1791812579041.jpg"
                alt="Synvora IT Enterprise Cloud and Software Architecture Visualization"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Subdued overlay gradient to fuse with midnight theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080D22] via-transparent to-transparent opacity-60" />

              {/* Floating UI metric badge 1: Top Left */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#080D22]/85 backdrop-blur-md border border-white/15 shadow-lg shadow-black/50 hidden sm:block animate-pulse duration-1000">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#18C6D9]" />
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                    Cloud Core Active
                  </span>
                </div>
                <div className="text-xs font-mono text-[#35D399] mt-1 tabular-nums">
                  99.99% Availability Target
                </div>
              </div>

              {/* Floating UI metric badge 2: Bottom Right */}
              <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-[#080D22]/85 backdrop-blur-md border border-white/15 shadow-lg shadow-black/50 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#35D399]" />
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                    Full-Stack Delivery
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Engineered for Global Scale
                </div>
              </div>
            </div>

            {/* Ambient decorative glowing back-layer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#2563EB]/20 via-[#18C6D9]/20 to-[#8B5CF6]/20 rounded-3xl blur-xl -z-10 opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};
