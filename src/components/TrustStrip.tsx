import React from 'react';
import { Compass, Layers, ShieldCheck, Handshake } from 'lucide-react';
import { VALUE_PROPOSITIONS } from '../data/content';

export const TrustStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#2563EB]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#18C6D9]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#16C79A]" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5 text-[#8B5CF6]" />;
      default:
        return <Compass className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <div className="relative z-20 bg-gradient-to-b from-[#080D22] via-[#0E1538] to-[#F7F9FC] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E4EAF3] shadow-xl shadow-slate-900/5 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {VALUE_PROPOSITIONS.map((prop, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start ${
                  idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3.5">
                  {getIcon(prop.icon)}
                </div>
                <h3 className="text-sm font-bold text-[#111827] tracking-tight">
                  {prop.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed font-normal">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
