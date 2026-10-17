import React from 'react';
import { SERVICES_DATA } from '../data/content';
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
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

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

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            Digital Solutions for Real-World Challenges.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            From building new digital products to improving existing systems, we help businesses
            make technology work for them.
          </p>
        </div>

        {/* Services Card Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-[#F7F9FC] hover:bg-white rounded-2xl border border-[#E4EAF3] hover:border-[#18C6D9]/40 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#18C6D9]/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-white group-hover:bg-[#18C6D9]/10 border border-[#E4EAF3] group-hover:border-[#18C6D9]/30 transition-colors shadow-sm">
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                  {service.shortDescription}
                </p>

                {/* Key Capabilities List */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-600 font-medium border-t border-slate-200/60 pt-4">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18C6D9]" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Affordance */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#2563EB] group-hover:text-[#18C6D9] transition-colors">
                <span>View Full Specifications</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
