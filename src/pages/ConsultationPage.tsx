import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CONSULTATION_TOPICS } from '../data/content';
import { ConsultationBooking } from '../types';
import { bookingApi } from '../services/bookingApi';
import {
  createIcsCalendarContent,
  createGoogleCalendarUrl,
  TimeSlotOption,
  AvailableDateOption,
} from '../utils/bookingService';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../hooks/useSEO';
import {
  Calendar,
  Clock,
  Globe,
  CheckCircle2,
  Download,
  Send,
  Video,
  AlertCircle,
  ExternalLink,
  Info,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  useSEO({
    title: 'Schedule Technical Consultation (UTC) | Synvora IT',
    description:
      'Book a 30-minute one-on-one technical discovery consultation in UTC with Synvora IT senior software architects.',
  });

  const location = useLocation();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState(
    (location.state as any)?.initialTopic || CONSULTATION_TOPICS[0]
  );
  const [selectedIsoDate, setSelectedIsoDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  // Status and error management
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  // Available dates list
  const [availableDates, setAvailableDates] = useState<AvailableDateOption[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlotOption[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Load available dates on mount
  useEffect(() => {
    let isMounted = true;
    async function loadDates() {
      setIsLoadingDates(true);
      try {
        const dates = await bookingApi.getAvailableDates();
        if (isMounted) {
          setAvailableDates(dates);
          if (dates.length > 0 && !selectedIsoDate) {
            setSelectedIsoDate(dates[0].isoDate);
          }
        }
      } catch (err) {
        console.error('Failed to load dates', err);
      } finally {
        if (isMounted) setIsLoadingDates(false);
      }
    }
    loadDates();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch slots whenever selectedIsoDate changes
  useEffect(() => {
    if (!selectedIsoDate) return;
    let isMounted = true;
    async function loadSlots() {
      setIsLoadingSlots(true);
      try {
        const slots = await bookingApi.getTimeSlotsForDate(selectedIsoDate);
        if (isMounted) {
          setAvailableSlots(slots);
          const currentSlotStillValid = slots.some(
            (s) => s.time24 === selectedTimeSlot && !s.isBooked && !s.isPast
          );
          if (!currentSlotStillValid) {
            const firstValid = slots.find((s) => !s.isBooked && !s.isPast);
            setSelectedTimeSlot(firstValid ? firstValid.time24 : '');
          }
        }
      } catch (err) {
        console.error('Failed to load slots', err);
      } finally {
        if (isMounted) setIsLoadingSlots(false);
      }
    }
    loadSlots();
    return () => {
      isMounted = false;
    };
  }, [selectedIsoDate]);

  // Selected date object
  const selectedDateObj = useMemo(() => {
    return availableDates.find((d) => d.isoDate === selectedIsoDate);
  }, [availableDates, selectedIsoDate]);

  // Selected slot object
  const selectedSlotObj = useMemo(() => {
    return availableSlots.find((s) => s.time24 === selectedTimeSlot);
  }, [availableSlots, selectedTimeSlot]);

  // Client-side field validator
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Full name is required';
    if (!email.trim()) {
      errors.email = 'Work email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid email format';
    }

    if (!selectedIsoDate) errors.date = 'Please select a consultation date';
    if (!selectedTimeSlot) errors.timeSlot = 'Please select an available UTC time slot';

    if (selectedSlotObj?.isBooked) {
      errors.timeSlot = 'This time slot was recently reserved. Please choose another slot.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm() || !selectedDateObj || !selectedSlotObj) {
      return;
    }

    setIsSubmitting(true);

    try {
      const utcIsoTimestamp = `${selectedIsoDate}T${selectedTimeSlot}:00Z`;

      const bookingData: Omit<ConsultationBooking, 'createdAt'> = {
        id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || 'Undisclosed Organization',
        timezone: 'UTC',
        date: selectedIsoDate,
        dateFormatted: selectedDateObj.displayDate,
        timeSlot: selectedTimeSlot,
        timeSlotUtcFormatted: selectedSlotObj.displayLabel,
        isoUtcTimestamp: utcIsoTimestamp,
        topic,
        notes: notes.trim() || undefined,
      };

      const saved = await bookingApi.bookConsultation(bookingData);
      setConfirmedBooking(saved);
      addToast(
        'Consultation Confirmed in UTC',
        `Meeting reserved for ${saved.name} on ${saved.dateFormatted} at ${saved.timeSlotUtcFormatted}.`,
        'success'
      );
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setSubmitError(
        err.message ||
          'Failed to reserve this consultation slot. It may have just been claimed. Please choose another time.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const icsContent = createIcsCalendarContent(confirmedBooking);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synvora-consultation-${confirmedBooking.date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetForNewBooking = () => {
    setConfirmedBooking(null);
    setName('');
    setEmail('');
    setCompany('');
    setNotes('');
    setFieldErrors({});
    setSubmitError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC]">
      {/* Header Banner */}
      <section className="bg-[#080D22] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#16C79A]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16C79A]/15 border border-[#16C79A]/30 text-xs font-semibold tracking-wider text-[#35D399] uppercase mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL SCHEDULING SYSTEM &bull; UTC STANDARD</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Schedule Technical Consultation.
            </h1>
            <p className="text-base sm:text-lg text-[#B8C4DA] leading-relaxed font-normal mb-6">
              Reserve a dedicated 30-minute engineering discovery session with Synvora IT senior architects.
              We analyze your specifications, evaluate architectural tradeoffs, and outline execution roadmaps.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#18C6D9] font-medium bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl w-fit">
              <Clock className="w-4 h-4 text-[#16C79A]" />
              <span>All appointment slots are scheduled in Coordinated Universal Time (UTC).</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Scheduling Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl border border-[#E4EAF3] shadow-xl shadow-slate-900/5 overflow-hidden">
          {confirmedBooking ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#16C79A] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16C79A] bg-emerald-50 px-3 py-1 rounded-full">
                  APPOINTMENT CONFIRMED (UTC)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Technical Consultation Reserved
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Thank you, <strong>{confirmedBooking.name}</strong>. A calendar invitation has been generated.
                  We look forward to speaking with you.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#E4EAF3] text-left space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-mono font-bold text-slate-800">
                    {confirmedBooking.id || confirmedBooking.isoUtcTimestamp}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Confirmed Date</div>
                    <div className="text-sm font-bold text-slate-900">{confirmedBooking.dateFormatted}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#16C79A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Time & Timezone</div>
                    <div className="text-sm font-bold text-slate-900">
                      {confirmedBooking.timeSlotUtcFormatted}
                    </div>
                    <div className="text-[11px] text-[#2563EB] font-mono mt-0.5">
                      ISO 8601: {confirmedBooking.isoUtcTimestamp}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Discussion Scope</div>
                    <div className="text-sm font-semibold text-slate-900">{confirmedBooking.topic}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#18C6D9] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600">
                    A private Google Meet / Zoom conference link will be dispatched to <strong>{confirmedBooking.email}</strong>.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={createGoogleCalendarUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#2563EB] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS (Outlook/Apple)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                <button
                  onClick={handleResetForNewBooking}
                  className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Schedule Another Session</span>
                </button>
                <span className="text-slate-300">&bull;</span>
                <Link
                  to="/"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            /* BOOKING FORM VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Context & Guidelines */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#080D22] via-[#0E1538] to-[#121948] text-white p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#18C6D9] mb-3">
                    TECHNICAL DISCOVERY
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight mb-4">
                    What to Expect from Your Session
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-8">
                    Direct access to senior software leads, not an aggressive sales pitch. We focus on
                    architectural viability, system feasibility, and honest estimates.
                  </p>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-white/10 text-[#16C79A] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white">Architecture & Stack Evaluation</strong>
                        <p className="text-slate-300 text-xs mt-0.5 font-normal">
                          Feedback on your proposed stack (React, Next.js, Node, PostgreSQL, AWS).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-white/10 text-[#18C6D9] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white">Rough Timeline & Pod Sizing</strong>
                        <p className="text-slate-300 text-xs mt-0.5 font-normal">
                          Realistic sprint estimations and team composition recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-white/10 text-[#268BFF] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white">Risk & Security Assessment</strong>
                        <p className="text-slate-300 text-xs mt-0.5 font-normal">
                          Identification of potential security, performance, or scaling bottlenecks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#18C6D9]">
                      <Globe className="w-4 h-4" />
                      <span>One Global Time Standard: UTC</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                      We coordinate clients across North America, Europe, Asia, and Bangladesh using Coordinated Universal Time (UTC).
                      Convert easily using your calendar or search: &ldquo;14:00 UTC to my time&rdquo;.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Dropdowns & Booking Form */}
              <div className="lg:col-span-7 p-8 sm:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <strong>Reservation Error:</strong> {submitError}
                      </div>
                    </div>
                  )}

                  {/* Section 1: Date & Time in UTC */}
                  <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3] space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#2563EB]" />
                        <span>Step 1: Select Consultation Date & Time (UTC)</span>
                      </h4>
                      <span className="text-[11px] font-mono font-semibold text-[#16C79A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        UTC STANDARD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date Dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Available Date (UTC) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={selectedIsoDate}
                            onChange={(e) => setSelectedIsoDate(e.target.value)}
                            disabled={isLoadingDates}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                              fieldErrors.date ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#2563EB]'
                            } focus:outline-none appearance-none pr-9 cursor-pointer transition-colors font-medium text-slate-800`}
                          >
                            {isLoadingDates ? (
                              <option>Loading available dates...</option>
                            ) : (
                              availableDates.map((opt) => (
                                <option key={opt.isoDate} value={opt.isoDate}>
                                  {opt.fullLabel || opt.displayDate}
                                </option>
                              ))
                            )}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        {fieldErrors.date && (
                          <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.date}</p>
                        )}
                      </div>

                      {/* Time Dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Time Slot (UTC) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            disabled={isLoadingSlots || availableSlots.length === 0}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                              fieldErrors.timeSlot ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#2563EB]'
                            } focus:outline-none appearance-none pr-9 cursor-pointer transition-colors font-medium text-slate-800`}
                          >
                            {isLoadingSlots ? (
                              <option>Checking slot availability...</option>
                            ) : availableSlots.length === 0 ? (
                              <option value="">No slots available for this date</option>
                            ) : (
                              availableSlots.map((slot) => {
                                const isDisabled = slot.isBooked || slot.isPast;
                                return (
                                  <option
                                    key={slot.time24}
                                    value={slot.time24}
                                    disabled={isDisabled}
                                  >
                                    {slot.displayLabel} {slot.isBooked ? '(Already Booked)' : slot.isPast ? '(Past)' : '(Available)'}
                                  </option>
                                );
                              })
                            )}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        {fieldErrors.timeSlot && (
                          <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.timeSlot}</p>
                        )}
                      </div>
                    </div>

                    {/* Explanatory Note Required by Brief */}
                    <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 font-normal">
                      <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>
                        All consultation times are displayed in UTC to ensure a consistent global scheduling experience.
                      </span>
                    </div>
                  </div>

                  {/* Section 2: Discussion Topic */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Consultation Focus / Topic <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 focus:border-[#2563EB] focus:outline-none appearance-none pr-9 cursor-pointer transition-colors font-medium text-slate-800"
                      >
                        {CONSULTATION_TOPICS.map((t, idx) => (
                          <option key={idx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Section 3: Contact Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                      Step 2: Participant Information
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                            fieldErrors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#2563EB]'
                          } focus:outline-none transition-colors text-slate-800`}
                        />
                        {fieldErrors.name && (
                          <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                            fieldErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#2563EB]'
                          } focus:outline-none transition-colors text-slate-800`}
                        />
                        {fieldErrors.email && (
                          <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Company / Project Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Health or Early Stage Startup"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 focus:border-[#2563EB] focus:outline-none transition-colors text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Discussion Agenda / Technical Questions <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share links to wireframes, current codebase stacks, key milestones, or specific questions..."
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-slate-300 focus:border-[#2563EB] focus:outline-none transition-colors text-slate-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] hover:opacity-95 shadow-lg shadow-[#2563EB]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Reserving Slot in UTC...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm Technical Consultation (UTC)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      No commitment required. 100% confidential under mutual NDA upon request.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
