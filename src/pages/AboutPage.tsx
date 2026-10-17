import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import {
  ShieldCheck,
  Cpu,
  Target,
  HeartHandshake,
  Globe2,
  Award,
  Users,
  ArrowRight,
  Calendar,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Us | Synvora IT',
    description:
      'Learn about Synvora IT’s mission, vision, international remote engineering model, and dedication to delivering scalable software.',
  });

  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Hero Banner */}
      <section className="bg-[#080D22] text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <span>COMPANY & CULTURE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Engineering with Purpose.{' '}
              <span className="bg-gradient-to-r from-[#268BFF] via-[#18C6D9] to-[#35D399] bg-clip-text text-transparent">
                Partnering for Growth.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              Synvora IT is an international technology solutions firm dedicated to turning complex
              commercial visions into robust, maintainable, and high-performance digital systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shadow-lg shadow-[#2563EB]/30 hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Initiate Project Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/consultation"
                className="px-6 py-3.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#16C79A]" />
                <span>Schedule Technical Discovery Call</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-[#E4EAF3] shadow-xl shadow-slate-900/5">
            <div className="p-3 rounded-xl bg-blue-50 text-[#2563EB] w-fit mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              To solve intricate business hurdles by providing dependable software engineering,
              uncompromising code quality, and clear architectural roadmaps.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E4EAF3] shadow-xl shadow-slate-900/5">
            <div className="p-3 rounded-xl bg-cyan-50 text-[#0891B2] w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              To cultivate an international standard of remote engineering excellence where client
              organizations expand seamlessly without the drag of technical debt.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E4EAF3] shadow-xl shadow-slate-900/5">
            <div className="p-3 rounded-xl bg-emerald-50 text-[#16C79A] w-fit mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Promise</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              100% intellectual property ownership, zero proprietary vendor lock-in, and direct
              collaboration with senior engineering leads on every sprint.
            </p>
          </div>
        </div>
      </section>

      {/* Global Operating Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2">
              HOW WE OPERATE
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Truly International Engineering Model
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              We operate across North American, European, and Asian business hours, ensuring rapid
              synchronous feedback and uninterrupted delivery momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3]">
              <Globe2 className="w-5 h-5 text-[#2563EB] mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Follow-The-Sun Coverage</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Async pull request reviews and continuous build automation that keep development cycles moving around the clock.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3]">
              <Award className="w-5 h-5 text-[#18C6D9] mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Standardized QA Audits</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Zero code merges without automated test passes, dependency security audits, and strict lint compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3]">
              <Users className="w-5 h-5 text-[#16C79A] mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Senior Pod Allocation</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Projects are staffed with proven senior developers who have shipped production systems at scale.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3]">
              <Cpu className="w-5 h-5 text-[#8B5CF6] mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Pragmatic Tech Selection</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We select tools with mature ecosystems and wide hiring pools, preventing long-term framework lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#080D22] to-[#121948] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Ready to explore an engagement?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Start with a 30-minute discovery consultation in UTC to analyze your technical requirements.
            </p>
          </div>
          <Link
            to="/consultation"
            className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] shrink-0 shadow-lg cursor-pointer flex items-center gap-2"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
