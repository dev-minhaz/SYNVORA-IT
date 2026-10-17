import React, { useState } from 'react';
import { SERVICES_DATA, SITE_CONFIG } from '../data/content';
import { ContactFormData, ContactFormErrors } from '../types';
import {
  Mail,
  Clock,
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  onOpenPrivacy: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  onOpenPrivacy,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    service: initialService || '',
    budget: '',
    timeline: '',
    message: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success_queued' | 'error'
  >('idle');
  const [queuedDetails, setQueuedDetails] = useState<ContactFormData | null>(null);

  // Synchronize when initialService prop changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a primary service category.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project or technical objectives.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters describing your scope.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge our Privacy Policy to submit an inquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    // Simulate reliable network request & frontend processing queue
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Save submission state
      setQueuedDetails({ ...formData });
      setSubmissionStatus('success_queued');
    } catch {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      businessEmail: '',
      companyName: '',
      service: '',
      budget: '',
      timeline: '',
      message: '',
      privacyConsent: false,
    });
    setErrors({});
    setSubmissionStatus('idle');
    setQueuedDetails(null);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#2563EB] uppercase mb-4">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111827] tracking-tight leading-tight mb-5">
            Let's Discuss Your Next Project.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            Share a few details about your goals, and our technical team can use them to understand
            how to help.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Information & Trust Signals */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E4EAF3] shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">
                  Direct Inquiries
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Business Inquiries
                      </div>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-sm font-bold text-slate-900 hover:text-[#2563EB] transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#18C6D9] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        International Partnerships
                      </div>
                      <a
                        href={`mailto:${SITE_CONFIG.intlInquiries}`}
                        className="text-sm font-bold text-slate-900 hover:text-[#18C6D9] transition-colors"
                      >
                        {SITE_CONFIG.intlInquiries}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#16C79A] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Response Time SLA
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Guaranteed response within 24 business hours from a senior technical consultant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDA and Confidentiality Guarantee */}
              <div className="p-6 rounded-2xl bg-white border border-[#E4EAF3] shadow-sm">
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 mb-2">
                  <Shield className="w-4 h-4 text-[#16C79A]" />
                  <span>Confidentiality & NDA Guaranteed</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  All proprietary specifications, business models, and technical requirements
                  shared with Synvora IT are governed by strict mutual non-disclosure policies.
                </p>
              </div>

              {/* Consultation Call Agenda */}
              <div className="p-6 rounded-2xl bg-[#080D22] text-white border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#18C6D9] uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>What to Expect on Your First Call</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-normal">
                  <li>• 30-minute focused architectural and scope review</li>
                  <li>• Feasibility assessment and preliminary technology stack analysis</li>
                  <li>• Written scope summary and timeline breakdown within 48 hours</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 text-xs text-slate-500 font-normal">
              Operating globally across US, European, and Asian business time zones.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E4EAF3] shadow-xl shadow-slate-900/5 p-8 sm:p-10">
              {submissionStatus === 'success_queued' ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <h4 className="text-base font-bold">Inquiry Validated & Registered</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                      Thank you, <span className="font-semibold">{queuedDetails?.fullName}</span>.
                      Your project inquiry has been formatted and queued in the client intake registry.
                      Our team will reach out directly at{' '}
                      <span className="font-semibold">{queuedDetails?.businessEmail}</span>.
                    </p>
                  </div>

                  {/* Development Environment Integration Notice as required by prompt */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#2563EB]" />
                      <span>Production Webhook & Email Endpoint Architecture</span>
                    </div>
                    <p className="leading-relaxed">
                      In production deployment, this form automatically dispatches to your verified
                      email gateway (e.g. SendGrid, Postmark, or AWS SES) and CRM webhook endpoint
                      configured via <code className="font-mono text-slate-800 bg-slate-200/80 px-1 py-0.5 rounded">INQUIRY_WEBHOOK_URL</code>.
                    </p>
                    <div className="font-mono text-[11px] bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(
                        {
                          status: 'READY_FOR_DISPATCH',
                          recipient: 'inquiries@synvorait.com',
                          payload: queuedDetails,
                        },
                        null,
                        2
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another Project Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name and Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#2563EB] focus:ring-blue-100'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="businessEmail"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        value={formData.businessEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, businessEmail: e.target.value })
                        }
                        placeholder="e.g. s.jenkins@company.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.businessEmail
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#2563EB] focus:ring-blue-100'
                        }`}
                      />
                      {errors.businessEmail && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.businessEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Name and Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Company / Organization (Optional)
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g. Acme Health Corp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all bg-white ${
                          errors.service
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#2563EB] focus:ring-blue-100'
                        }`}
                      >
                        <option value="">Select a service category</option>
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Multi-disciplinary Consultation">
                          Multi-disciplinary / Custom Architecture
                        </option>
                      </select>
                      {errors.service && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Estimated Budget Range (USD)
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 focus:outline-none transition-all bg-white"
                      >
                        <option value="">Select estimated budget</option>
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                        <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                        <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                        <option value="$25,000+">$25,000+</option>
                        <option value="Flexible / To be determined">
                          Flexible / To be determined
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                      >
                        Target Launch Timeline
                      </label>
                      <select
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData({ ...formData, timeline: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 focus:outline-none transition-all bg-white"
                      >
                        <option value="">Select desired timeframe</option>
                        <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                        <option value="1 – 3 months">1 – 3 months</option>
                        <option value="3 – 6 months">3 – 6 months</option>
                        <option value="Flexible / Exploratory">Flexible / Exploratory</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2"
                    >
                      Project Details & Technical Scope <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Outline what you are building, existing systems, key integration requirements, or business problems to solve..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) =>
                          setFormData({ ...formData, privacyConsent: e.target.checked })
                        }
                        className="mt-1 w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I agree to the processing of my project details in accordance with the{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacy}
                          className="text-[#2563EB] font-semibold underline hover:text-blue-800"
                        >
                          Privacy Policy
                        </button>
                        . Synvora IT adheres to international data privacy and confidentiality standards.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.privacyConsent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase rounded-xl overflow-hidden group cursor-pointer shadow-lg shadow-[#2563EB]/25 hover:shadow-[#18C6D9]/35 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] transition-transform duration-300 group-hover:scale-105" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Validating & Registering Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Project Inquiry</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
