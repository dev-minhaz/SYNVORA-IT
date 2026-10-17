import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CommandPalette } from '../components/CommandPalette';
import { ConsultationSchedulerModal } from '../components/ConsultationSchedulerModal';
import { LiveChatWidget } from '../components/LiveChatWidget';
import { BackToTopButton } from '../components/BackToTopButton';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useToast } from '../context/ToastContext';
import { Calendar, Calculator } from 'lucide-react';
import { ConsultationBooking } from '../types';

export const RootLayout: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  const handleBookingSuccess = (booking: ConsultationBooking) => {
    addToast(
      'Consultation Scheduled in UTC',
      `Meeting reserved for ${booking.name} on ${booking.dateFormatted} at ${booking.timeSlotUtcFormatted}.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#080D22] text-[#111827] flex flex-col antialiased">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Quick Action Trigger Bar */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-[#080D22]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80">
        <Link
          to="/consultation"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-[#16C79A]/20 hover:bg-[#16C79A]/30 border border-[#16C79A]/30 transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#35D399]" />
          <span>Book Call (UTC)</span>
        </Link>
        <Link
          to="/estimator"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-[#18C6D9]" />
          <span>Cost Estimator</span>
        </Link>
      </div>

      {/* Back to Top floating button */}
      <BackToTopButton />

      {/* Global Live Chat Widget */}
      <LiveChatWidget />

      {/* Global Command Palette Search (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(serviceId) => navigate(`/services/${serviceId}`)}
        onSelectCaseStudy={(caseStudyId) => navigate(`/portfolio/${caseStudyId}`)}
        onBookCall={() => navigate('/consultation')}
        onOpenEstimator={() => navigate('/estimator')}
        onOpenLogin={() => navigate('/login')}
      />

      {/* Global Scheduler Modal */}
      <ConsultationSchedulerModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
};
