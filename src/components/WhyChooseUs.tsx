import React from 'react';
import { Target, Cpu, MessageSquare, TrendingUp } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6 text-[#18C6D9]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#2563EB]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#16C79A]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#8B5CF6]" />;
      default:
        return <Target className="w-6 h-6 text-[#18C6D9]" />;
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#080D22] relative overflow-hidden text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#18C6D9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
            <span>WHY PARTNER WITH US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight mb-5">
            Built for Clarity. Engineered for Growth.
          </h2>
          <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal">
            We operate as an extension of your technical leadership team, bringing precision
            engineering and clear accountability to every engagement.
          </p>
        </div>

        {/* 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="bg-[#0E163B]/70 hover:bg-[#0E163B] rounded-2xl border border-white/10 hover:border-white/20 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#B8C4DA] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-[#18C6D9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18C6D9]" />
                <span>Verified Standards</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
