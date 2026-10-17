import React from 'react';
import { Link } from 'react-router-dom';
import { SynvoraLogo } from './SynvoraLogo';
import { SERVICES_DATA, SITE_CONFIG } from '../data/content';
import {
  Mail,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Calculator,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: SITE_CONFIG.socialLinks?.facebook || 'https://facebook.com/synvorait',
      icon: Facebook,
      hoverClass: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/40',
      label: 'Visit Synvora IT on Facebook (opens in new tab)',
    },
    {
      name: 'Instagram',
      href: SITE_CONFIG.socialLinks?.instagram || 'https://instagram.com/synvorait',
      icon: Instagram,
      hoverClass: 'hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:border-[#E4405F]/40',
      label: 'Visit Synvora IT on Instagram (opens in new tab)',
    },
    {
      name: 'LinkedIn',
      href: SITE_CONFIG.socialLinks?.linkedin || 'https://linkedin.com/company/synvorait',
      icon: Linkedin,
      hoverClass: 'hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
      label: 'Visit Synvora IT on LinkedIn (opens in new tab)',
    },
  ];

  return (
    <footer className="bg-[#080D22] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block text-left focus:outline-none cursor-pointer"
              aria-label="Synvora IT Home"
            >
              <SynvoraLogo variant="dark" size="md" />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              Building thoughtful digital experiences, robust architectures, and practical technology
              solutions for growing businesses worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#18C6D9] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-[#35D399]" />
              <span>International Engineering & Remote Consulting</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 transform hover:-translate-y-0.5 ${item.hoverClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/estimator"
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Project Estimator</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#18C6D9]/15 text-[#18C6D9] font-semibold">Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Specialized Services
            </div>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="hover:text-white transition-colors block truncate cursor-pointer"
                    title={service.title}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Inquiries & Actions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Inquiries
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Have an active RFP, architecture question, or project brief?
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-xs font-semibold text-white hover:text-[#18C6D9] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#18C6D9]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="text-[11px] text-slate-400">
                Response guaranteed within 24 business hours.
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                to="/consultation"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#16C79A]/15 hover:bg-[#16C79A]/25 text-[#35D399] text-xs font-semibold border border-[#16C79A]/30 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 30-Min Discovery Call (UTC)</span>
              </Link>

              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
              >
                <span>Submit Project Brief</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#18C6D9]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal">
          <div>
            © {currentYear} {SITE_CONFIG.companyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
