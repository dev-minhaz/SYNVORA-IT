import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/content';
import { useSEO } from '../hooks/useSEO';
import {
  Globe,
  Code2,
  Smartphone,
  Palette,
  ShoppingBag,
  Cloud,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Clock,
  Users,
} from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="w-6 h-6 text-[#18C6D9]" />,
  'custom-software': <Code2 className="w-6 h-6 text-[#2563EB]" />,
  'mobile-app-development': <Smartphone className="w-6 h-6 text-[#16C79A]" />,
  'ui-ux-design': <Palette className="w-6 h-6 text-[#8B5CF6]" />,
  'ecommerce-solutions': <ShoppingBag className="w-6 h-6 text-[#268BFF]" />,
  'cloud-devops': <Cloud className="w-6 h-6 text-[#18C6D9]" />,
  'ai-automation': <Cpu className="w-6 h-6 text-[#35D399]" />,
  'cybersecurity': <ShieldAlert className="w-6 h-6 text-[#B44DFF]" />,
};

export const ServicesPage: React.FC = () => {
  useSEO({
    title: 'Technology Services & Digital Solutions | Synvora IT',
    description:
      'Explore Synvora IT’s 8 core software services: Web, Custom Software, Mobile Apps, UI/UX, E-commerce, Cloud & DevOps, AI Automation, and Cybersecurity.',
  });

  const [filter, setFilter] = useState<string>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'engineering')
      return ['web-development', 'custom-software', 'mobile-app-development'].includes(s.id);
    if (filter === 'cloud-ai')
      return ['cloud-devops', 'ai-automation', 'cybersecurity'].includes(s.id);
    if (filter === 'design-commerce')
      return ['ui-ux-design', 'ecommerce-solutions'].includes(s.id);
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Header Banner */}
      <section className="bg-[#080D22] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <span>SERVICE DIRECTORY & CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Enterprise Technology Solutions.
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              Explore our full spectrum of software development, digital platforms, cloud architecture,
              and security engineering services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/estimator"
                className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 bg-[#18C6D9] hover:bg-[#16C79A] shadow-md transition-all cursor-pointer"
              >
                Launch Project Cost Estimator
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer"
              >
                Submit Project Brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Services (8)
          </button>
          <button
            onClick={() => setFilter('engineering')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'engineering'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Core Software & Web
          </button>
          <button
            onClick={() => setFilter('cloud-ai')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'cloud-ai'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Cloud, AI & Cybersecurity
          </button>
          <button
            onClick={() => setFilter('design-commerce')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'design-commerce'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Product Design & Commerce
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group bg-white rounded-2xl border border-[#E4EAF3] hover:border-[#18C6D9]/50 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-[#F7F9FC] group-hover:bg-[#18C6D9]/10 border border-[#E4EAF3] group-hover:border-[#18C6D9]/30 transition-colors">
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors mb-2.5">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                  {service.shortDescription}
                </p>

                {/* Timeline & Squad meta */}
                <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-500 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Typical Delivery: <strong className="text-slate-800">{service.typicalTimeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#16C79A]" />
                    <span className="truncate">{service.estimatedTeam}</span>
                  </div>
                </div>

                {/* Capabilities items */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  {service.capabilities.slice(0, 3).map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18C6D9]" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:text-[#18C6D9] transition-colors">
                <span>View Full Specifications & Workflow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
