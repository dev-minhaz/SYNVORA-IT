import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ContactSection } from '../components/ContactSection';
import { useSEO } from '../hooks/useSEO';
import {
  Calendar,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Mail,
  Clock,
} from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
  onOpenPrivacy?: () => void;
  onBookCall?: () => void;
  onOpenEstimator?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService: propInitialService,
  onOpenPrivacy,
  onBookCall,
  onOpenEstimator,
}) => {
  useSEO({
    title: 'Contact Us & Project Inquiry | Synvora IT',
    description:
      'Submit a detailed software engineering project brief, request an architecture proposal, or start an international development partnership.',
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Pick up initialScope from navigation state or prop
  const effectiveInitialService =
    propInitialService || (location.state as any)?.initialScope || '';

  const handleBook = () => {
    if (onBookCall) onBookCall();
    else navigate('/consultation');
  };

  const handleEstimator = () => {
    if (onOpenEstimator) onOpenEstimator();
    else navigate('/estimator');
  };

  const handlePrivacy = () => {
    if (onOpenPrivacy) onOpenPrivacy();
    else navigate('/privacy');
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Header Banner */}
      <section className="bg-[#080D22] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-4">
              <span>GET IN TOUCH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Start Your Project Conversation.
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-8">
              Whether you need to scale an existing engineering team, build a new product MVP from
              scratch, or audit enterprise cloud infrastructure, our senior consultants are ready to assist.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBook}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 bg-[#16C79A] hover:bg-[#35D399] shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a 30-Minute Discovery Call (UTC)</span>
              </button>
              <button
                onClick={handleEstimator}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#18C6D9]" />
                <span>Calculate Estimated Budget</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Contact Section with form handling */}
      <ContactSection
        initialService={effectiveInitialService}
        onOpenPrivacy={handlePrivacy}
      />
    </div>
  );
};
