import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/content';
import { ServiceItem } from '../types';
import { useSEO } from '../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Layers,
  Wrench,
  HelpCircle,
  ChevronDown,
  Calendar,
} from 'lucide-react';

interface ServiceDetailPageProps {
  service?: ServiceItem;
  onBackToServices?: () => void;
  onInquireService?: (serviceTitle: string) => void;
  onBookCall?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service: propService,
  onBackToServices,
  onInquireService,
  onBookCall,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Resolve service from props or route parameter
  const activeService =
    propService ||
    SERVICES_DATA.find((s) => s.slug === slug || s.id === slug) ||
    SERVICES_DATA[0];

  useSEO({
    title: `${activeService.title} | Synvora IT Specifications`,
    description: activeService.shortDescription,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleBack = () => {
    if (onBackToServices) onBackToServices();
    else navigate('/services');
  };

  const handleInquire = (title: string) => {
    if (onInquireService) onInquireService(title);
    else navigate('/contact', { state: { initialScope: title } });
  };

  const handleBook = () => {
    if (onBookCall) onBookCall();
    else navigate('/consultation', { state: { initialTopic: activeService.title } });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#080D22] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button
              onClick={handleBack}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </button>
            <span>/</span>
            <span className="text-[#18C6D9] font-medium">{activeService.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <span>SERVICE SPECIFICATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              {activeService.title}
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              {activeService.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#18C6D9]" />
                <span className="text-slate-300">
                  Standard Delivery:{' '}
                  <strong className="text-white">{activeService.typicalTimeline}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#35D399]" />
                <span className="text-slate-300">
                  Engineering Pod:{' '}
                  <strong className="text-white">{activeService.estimatedTeam}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Capabilities and Business Outcomes */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#2563EB]" />
                  <span>Core Deliverables & Engineering Scope</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  {activeService.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#18C6D9] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16C79A]" />
                  <span>Target Business Outcomes</span>
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {activeService.businessOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16C79A] shrink-0 mt-2" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4-Step Workflow */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
                Typical Implementation Workflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeService.workflow.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                        Phase {item.step}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#8B5CF6]" />
                <span>Recommended Technology Ecosystem</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                We select and combine tools based on your scalability requirements, performance goals, and existing infrastructure.
              </p>
              <div className="flex flex-wrap gap-2">
                {activeService.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {activeService.faqs.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-10 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#18C6D9]" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {activeService.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
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

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gradient-to-b from-[#080D22] via-[#0E1538] to-[#121948] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-wider text-[#18C6D9] mb-2">
                  PROJECT SCOPE INITIATION
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Discuss {activeService.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Have a specific feature set or project timeline? Submit a scoped brief or schedule a 30-minute discovery call with our team.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleInquire(activeService.title)}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Scoped Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleBook}
                    className="w-full py-3 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#16C79A]" />
                    <span>Book Discovery Call (UTC)</span>
                  </button>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#35D399]" />
                    <span>24-Hour Inbound Response Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#35D399]" />
                    <span>Mutual Non-Disclosure Agreement on Request</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#35D399]" />
                    <span>100% Client Source Code Ownership</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBack}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to All Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
