import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { FileText, ArrowLeft, ShieldCheck, Calendar } from 'lucide-react';

export const TermsPage: React.FC = () => {
  useSEO({
    title: 'Terms of Service | Synvora IT',
    description:
      'Standard terms of service, engagement models, and engineering warranties for Synvora IT clients.',
  });

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      <section className="bg-[#080D22] text-white py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#18C6D9] hover:underline mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#18C6D9] uppercase tracking-wider mb-2">
            <FileText className="w-3 h-3" />
            <span>CONTRACTUAL ENGAGEMENT FRAMEWORK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Effective Date: January 1, 2026 &bull; Last Revised: October 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-12 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing the Synvora IT website, submitting a project brief, scheduling a technical consultation in UTC, or contracting custom development services, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Consulting & Engineering Services</h2>
            <p>
              Synvora IT provides custom software design, full-stack web and mobile application engineering, cloud infrastructure architecture, and security consulting. All formal project engagements are governed by an executed Statement of Work (SOW) specifying milestone deliverables, acceptance criteria, and timelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
            <p>
              Unless otherwise mutually stated in writing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Upon complete payment of project milestone fees, all bespoke code, custom database schemas, API implementations, and digital assets developed specifically for the client belong 100% to the client.</li>
              <li>Synvora IT retains ownership of its underlying general pre-existing development tooling, boilerplate utilities, and open-source libraries incorporated under permissive licenses (e.g., MIT, Apache 2.0).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Consultation Scheduling & Cancellations</h2>
            <p>
              Technical discovery consultations are scheduled in Coordinated Universal Time (UTC) to provide an unambiguous global reference. Clients may reschedule or cancel scheduled sessions at any time without penalty by replying to the calendar invitation or contacting team coordinators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability & Warranty</h2>
            <p>
              While Synvora IT utilizes rigorous automated unit testing, static linting, and continuous integration audits to achieve premium code quality, software is provided subject to the warranties expressly defined within your signed Statement of Work.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/privacy"
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              &larr; Read Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Contact Legal & Operations Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
