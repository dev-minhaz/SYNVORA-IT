import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Wrench,
  HelpCircle,
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquireService,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#080D22] via-[#0E1538] to-[#1A2352] text-white flex items-start justify-between relative border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-3">
              <span>SERVICE SPECIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {service.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl font-normal leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-100">
          {/* Capabilities & Business Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#2563EB]" />
                <span>Core Deliverables & Capabilities</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#18C6D9] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#16C79A]" />
                <span>Business Value & Outcomes</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {service.businessOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16C79A] shrink-0 mt-2" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4-Step Typical Engagement Workflow */}
          <div className="pt-8">
            <h3 className="text-base font-bold text-slate-900 mb-5 tracking-tight">
              Standard Implementation Phases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.workflow.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                      Phase {item.step}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Toolkit */}
          <div className="pt-8">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-[#8B5CF6]" />
              <span>Recommended Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          {service.faqs.length > 0 && (
            <div className="pt-8">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#18C6D9]" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isOpen ? 'rotate-180 text-[#2563EB]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar with CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Ready to integrate this solution into your business roadmap?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => onInquireService(service.title)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer w-1/2 sm:w-auto"
            >
              <span>Discuss {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
