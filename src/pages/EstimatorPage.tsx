import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import { Calculator, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const EstimatorPage: React.FC = () => {
  useSEO({
    title: 'Project Scope & Cost Estimator | Synvora IT',
    description:
      'Configure platform options, key capabilities, and sprint velocity to generate estimated engineering budgets and delivery timelines.',
  });

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleTransferToInquiry = (summary: string) => {
    addToast(
      'Estimate Attached to Inquiry',
      'Your configuration has been transferred to the project inquiry form.',
      'success'
    );
    navigate('/contact', { state: { initialScope: summary } });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Header Banner */}
      <section className="bg-[#080D22] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <Calculator className="w-3.5 h-3.5" />
              <span>TRANSPARENT ENGINEERING SCOPING</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Interactive Scope & Cost Estimator.
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              Select your platform type, architectural modules, and delivery timeline to inspect realistic
              budget allocations and engineering team squad compositions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/consultation"
                className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 bg-[#16C79A] hover:bg-[#35D399] shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Validate Scope with an Architect (UTC)</span>
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Direct RFP Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#18C6D9]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estimator Interactive Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <ProjectEstimator
          onTransferToInquiry={handleTransferToInquiry}
          onBookCall={() => navigate('/consultation')}
        />
      </div>

      {/* Explanatory Trust Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E4EAF3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16C79A] shrink-0" />
            <span>
              All estimates include dedicated code ownership, automated CI/CD pipeline setup, and post-launch warranty support.
            </span>
          </div>
          <Link
            to="/services"
            className="text-[#2563EB] font-bold hover:underline shrink-0 flex items-center gap-1"
          >
            <span>Review Full Service Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
