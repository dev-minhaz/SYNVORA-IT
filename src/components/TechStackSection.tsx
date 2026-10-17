import React, { useState } from 'react';
import { TECH_CATEGORIES } from '../data/content';
import { Terminal, Database, Server, Layout } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend Engineering':
        return <Layout className="w-4 h-4 text-[#2563EB]" />;
      case 'Backend & APIs':
        return <Server className="w-4 h-4 text-[#18C6D9]" />;
      case 'Databases & Storage':
        return <Database className="w-4 h-4 text-[#16C79A]" />;
      case 'Cloud & Infrastructure':
        return <Terminal className="w-4 h-4 text-[#8B5CF6]" />;
      default:
        return <Server className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>OUR TECHNOLOGY TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            Modern Tools. Practical Engineering.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            We select technology stacks based on performance, ecosystem maturity, and long-term
            maintainability for your specific product roadmap.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TECH_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {getCategoryIcon(cat.category)}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Active Technology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECH_CATEGORIES[activeTab].items.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-[#E4EAF3] hover:border-[#18C6D9]/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                  {tech.name}
                </h4>
                <span className="w-2 h-2 rounded-full bg-[#18C6D9]" />
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-normal">
          Need a stack not listed here? Our engineers evaluate and support custom environments based on project scope.
        </div>
      </div>
    </section>
  );
};
