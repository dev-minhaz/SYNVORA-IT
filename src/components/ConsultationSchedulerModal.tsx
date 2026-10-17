import React, { useState, useEffect, useMemo } from 'react';
import { CONSULTATION_TOPICS } from '../data/content';
import { ConsultationBooking } from '../types';
import {
  getAvailableConsultationDates,
  getAvailableTimeSlotsForDate,
  saveConsultationBooking,
  createIcsCalendarContent,
  createGoogleCalendarUrl,
  TimeSlotOption,
  AvailableDateOption,
} from '../utils/bookingService';
import {
  X,
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
} from 'lucide-react';

interface ConsultationSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: ConsultationBooking) => void;
}

export const ConsultationSchedulerModal: React.FC<ConsultationSchedulerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState(CONSULTATION_TOPICS[0]);
  const [selectedIsoDate, setSelectedIsoDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  // Status and error management
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  // Available dates list
  const availableDates: AvailableDateOption[] = useMemo(() => {
    return getAvailableConsultationDates(20);
  }, []);

  // Set default date when modal opens
  useEffect(() => {
    if (availableDates.length > 0 && !selectedIsoDate) {
      setSelectedIsoDate(availableDates[0].isoDate);
    }
  }, [availableDates, selectedIsoDate]);

  // Dynamic available time slots for selected date
  const availableSlots: TimeSlotOption[] = useMemo(() => {
    if (!selectedIsoDate) return [];
    return getAvailableTimeSlotsForDate(selectedIsoDate);
  }, [selectedIsoDate]);

  // Ensure selectedTimeSlot is valid for chosen date
  useEffect(() => {
    if (availableSlots.length > 0) {
      const currentSlotStillValid = availableSlots.some(
        (s) => s.time24 === selectedTimeSlot && !s.isBooked && !s.isPast
      );
      if (!currentSlotStillValid) {
        const firstValid = availableSlots.find((s) => !s.isBooked && !s.isPast);
        setSelectedTimeSlot(firstValid ? firstValid.time24 : '');
      }
    }
  }, [availableSlots, selectedTimeSlot]);

  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Selected date object
  const selectedDateObj = availableDates.find((d) => d.isoDate === selectedIsoDate);
  const selectedSlotObj = availableSlots.find((s) => s.time24 === selectedTimeSlot);

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Full name is required.';
    }

    if (!email.trim()) {
      errors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid work email address.';
    }

    if (!selectedIsoDate) {
      errors.date = 'Please select a consultation date.';
    }

    if (!selectedTimeSlot) {
      errors.timeSlot = 'Please select an available UTC time slot.';
    } else if (selectedSlotObj?.isBooked) {
      errors.timeSlot = 'The selected UTC time slot is already reserved. Please choose another slot.';
    } else if (selectedSlotObj?.isPast) {
      errors.timeSlot = 'This time slot has already passed in UTC. Please select a future time slot.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate real-time async booking registration
      await new Promise((resolve) => setTimeout(resolve, 600));

      const isoUtcTimestamp = `${selectedIsoDate}T${selectedTimeSlot}:00.000Z`;
      const dateFormatted = selectedDateObj?.displayDate || selectedIsoDate;
      const timeSlotUtcFormatted = selectedSlotObj?.displayLabel || `${selectedTimeSlot} UTC`;

      const bookingRecord = saveConsultationBooking({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || 'Undisclosed Organization',
        timezone: 'UTC',
        date: selectedIsoDate,
        dateFormatted,
        timeSlot: selectedTimeSlot,
        timeSlotUtcFormatted,
        isoUtcTimestamp,
        topic,
        notes: notes.trim(),
      });

      setConfirmedBooking(bookingRecord);
      onSuccess(bookingRecord);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Failed to complete consultation booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const icsContent = createIcsCalendarContent(confirmedBooking);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Synvora_IT_Consultation_${confirmedBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#080D22] via-[#0E1538] to-[#1A2352] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/10 text-xs font-semibold tracking-wider text-[#18C6D9] uppercase mb-1">
              <Video className="w-3.5 h-3.5" />
              <span>30-MINUTE DISCOVERY SESSION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Schedule Technical Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {confirmedBooking ? (
            /* Successful Confirmation View */
            <div className="py-4 space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Consultation Confirmed in UTC
                </h4>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your appointment has been registered in the global scheduling system. A calendar
                  invitation with secure Google Meet video conference details has been generated.
                </p>
              </div>

              {/* Confirmed Details Summary Box */}
              <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3] space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Selected Date:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {confirmedBooking.dateFormatted}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Consultation Time:</span>
                  <span className="font-bold text-[#2563EB] font-mono">
                    {confirmedBooking.timeSlotUtcFormatted}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Global Time Standard:</span>
                  <span className="font-bold text-slate-900 font-mono flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#18C6D9]" />
                    <span>UTC (Coordinated Universal Time)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">ISO 8601 UTC Timestamp:</span>
                  <span className="font-mono text-slate-800 text-xs bg-slate-200/60 px-2 py-0.5 rounded">
                    {confirmedBooking.isoUtcTimestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Attendee:</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.name} ({confirmedBooking.email})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar Event</span>
                </button>

                <a
                  href={createGoogleCalendarUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Full Name & Business Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="bookingName"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bookingName"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Alex Henderson"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      fieldErrors.name
                        ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                        : 'border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{fieldErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bookingEmail"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="bookingEmail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="e.g. alex@enterprise.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      fieldErrors.email
                        ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                        : 'border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Company & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="bookingCompany"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="bookingCompany"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Venture Group Inc"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bookingTopic"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Discussion Scope / Topic
                  </label>
                  <select
                    id="bookingTopic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] bg-white cursor-pointer"
                  >
                    {CONSULTATION_TOPICS.map((t, idx) => (
                      <option key={idx} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DATE DROPDOWN & TIME DROPDOWN SECTION */}
              <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF3] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#18C6D9]" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Global Consultation Standard: UTC Timezone
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#2563EB] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    UTC +00:00
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Date Dropdown */}
                  <div>
                    <label
                      htmlFor="consultationDateSelect"
                      className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>1. Consultation Date (UTC) *</span>
                    </label>
                    <div className="relative">
                      <select
                        id="consultationDateSelect"
                        value={selectedIsoDate}
                        onChange={(e) => {
                          setSelectedIsoDate(e.target.value);
                          if (fieldErrors.date) setFieldErrors((prev) => ({ ...prev, date: '' }));
                        }}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none cursor-pointer appearance-none pr-8 ${
                          fieldErrors.date
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        <option value="" disabled>
                          Select an available consultation date
                        </option>
                        {availableDates.map((item) => (
                          <option key={item.isoDate} value={item.isoDate}>
                            {item.fullLabel}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {fieldErrors.date && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{fieldErrors.date}</span>
                      </p>
                    )}
                  </div>

                  {/* 2. Time Dropdown */}
                  <div>
                    <label
                      htmlFor="consultationTimeSelect"
                      className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#18C6D9]" />
                      <span>2. Available Time Slot (24h UTC) *</span>
                    </label>
                    <div className="relative">
                      <select
                        id="consultationTimeSelect"
                        value={selectedTimeSlot}
                        onChange={(e) => {
                          setSelectedTimeSlot(e.target.value);
                          if (fieldErrors.timeSlot)
                            setFieldErrors((prev) => ({ ...prev, timeSlot: '' }));
                        }}
                        disabled={!selectedIsoDate}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none cursor-pointer appearance-none pr-8 disabled:bg-slate-100 disabled:cursor-not-allowed ${
                          fieldErrors.timeSlot
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        <option value="" disabled>
                          Select an available UTC time slot
                        </option>
                        {availableSlots.map((slot) => {
                          const isUnavailable = slot.isBooked || slot.isPast;
                          const suffix = slot.isBooked
                            ? ' — [Reserved / Booked]'
                            : slot.isPast
                            ? ' — [Past Slot in UTC]'
                            : '';
                          return (
                            <option
                              key={slot.time24}
                              value={slot.time24}
                              disabled={isUnavailable}
                            >
                              {slot.displayLabel} {suffix}
                            </option>
                          );
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                    {fieldErrors.timeSlot && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{fieldErrors.timeSlot}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Mandatory Worldwide User Experience Note as specified in Prompt */}
                <div className="flex items-start gap-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>All consultation times are displayed in UTC to ensure a consistent global scheduling experience.</strong>{' '}
                    Whether connecting from Bangladesh (UTC+6), the USA (UTC-4/UTC-7), Europe (UTC+1/UTC+2), or Asia, your appointment starts precisely at the confirmed UTC time.
                  </p>
                </div>
              </div>

              {/* Brief Technical Context / Objectives */}
              <div>
                <label
                  htmlFor="bookingNotes"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Brief Technical Context / Objectives (Optional)
                </label>
                <textarea
                  id="bookingNotes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Discussing system architecture, MVP roadmap, or enterprise cloud migration..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] hover:opacity-95 transition-opacity shadow-lg shadow-[#2563EB]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying UTC Availability & Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Technical Consultation (UTC)</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
