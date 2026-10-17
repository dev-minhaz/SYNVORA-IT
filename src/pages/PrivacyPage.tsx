import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, ArrowLeft, Mail, Lock, Calendar } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  useSEO({
    title: 'Privacy Policy | Synvora IT',
    description:
      'Synvora IT data protection principles, client privacy commitments, and confidentiality standards.',
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#35D399] uppercase tracking-wider mb-2">
            <Lock className="w-3 h-3" />
            <span>DATA INTEGRITY & PRIVACY STANDARDS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Effective Date: January 1, 2026 &bull; Last Revised: October 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-[#E4EAF3] p-8 sm:p-12 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Commitment to Client Confidentiality</h2>
            <p>
              At Synvora IT, we treat client information, business plans, proprietary architectural concepts, and engineering repositories with the highest standard of international confidentiality. We adhere to strict data-minimization practices across all client interactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
            <p>We collect only the information strictly necessary to provide consultation and software engineering services:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Inquiry & Consultation Details:</strong> Name, work email address, company name, project brief, and discussion topics provided via our contact or consultation booking forms.</li>
              <li><strong>Scheduling Timestamps:</strong> Stored strictly in Coordinated Universal Time (UTC) using ISO 8601 formatting to ensure unambiguous international coordination.</li>
              <li><strong>Technical Logs:</strong> Server logs that record IP addresses, browser user-agent, and request times to protect against denial-of-service attacks and abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Mutual Non-Disclosure & IP Ownership</h2>
            <p>
              We routinely execute formal bilateral Non-Disclosure Agreements (NDAs) prior to inspecting client repositories, database schemas, or proprietary algorithms. All intellectual property, code artifacts, and system designs produced under custom contracts belong 100% to the client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Third-Party Sharing & Telemetry</h2>
            <p>
              We never sell, rent, or trade client personal or commercial data to third-party data brokers or marketing services. Data is shared exclusively with certified cloud service infrastructure providers (such as hosting providers, secure transactional email systems, and calendar synchronization APIs) solely as needed to execute service delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Information & Data Requests</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request data deletion or an executed NDA, please reach out directly to our privacy officer:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
              Email: inquiries@synvorait.com<br />
              Subject: Privacy & Data Protection Officer &bull; Synvora IT
            </div>
          </section>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/terms"
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Read Terms of Service &rarr;
            </Link>
            <Link
              to="/consultation"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#16C79A]" />
              <span>Schedule Technical Consultation (UTC)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
