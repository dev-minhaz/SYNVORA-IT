import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SynvoraLogo } from './SynvoraLogo';
import { SERVICES_DATA } from '../data/content';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe,
  Code2,
  Smartphone,
  Palette,
  ShoppingBag,
  Cloud,
  Cpu,
  ShieldAlert,
  LogIn,
  Search,
  Calendar,
  Calculator,
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="w-5 h-5 text-[#18C6D9]" />,
  'custom-software': <Code2 className="w-5 h-5 text-[#2563EB]" />,
  'mobile-app-development': <Smartphone className="w-5 h-5 text-[#16C79A]" />,
  'ui-ux-design': <Palette className="w-5 h-5 text-[#8B5CF6]" />,
  'ecommerce-solutions': <ShoppingBag className="w-5 h-5 text-[#268BFF]" />,
  'cloud-devops': <Cloud className="w-5 h-5 text-[#18C6D9]" />,
  'ai-automation': <Cpu className="w-5 h-5 text-[#35D399]" />,
  'cybersecurity': <ShieldAlert className="w-5 h-5 text-[#B44DFF]" />,
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = location.pathname;
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close dropdowns on route changes
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-[#080D22]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18C6D9] rounded-lg transition-transform active:scale-95 cursor-pointer"
            aria-label="Synvora IT Home"
          >
            <SynvoraLogo variant="dark" size="md" />
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link
              to="/"
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 ${
                pathname === '/' ? 'text-[#18C6D9] font-bold' : ''
              }`}
            >
              Home
            </Link>

            {/* Services with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-1">
                <Link
                  to="/services"
                  className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 ${
                    pathname.startsWith('/services') ? 'text-[#18C6D9] font-bold' : ''
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="Toggle services menu"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180 text-[#18C6D9]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Desktop Services Dropdown Menu */}
              {isServicesOpen && (
                <div
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-[#0E1538]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl shadow-black/60 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {SERVICES_DATA.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#18C6D9]/15 group-hover:border-[#18C6D9]/40 transition-colors shrink-0">
                        {serviceIcons[service.id]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#18C6D9] transition-colors flex items-center justify-between">
                          <span>{service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#18C6D9]" />
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-normal">
                          {service.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <div className="col-span-2 pt-3 mt-1 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <Link
                      to="/services"
                      className="text-[#18C6D9] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Explore All 8 Service Specifications <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/estimator"
                      className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#35D399]" />
                      <span>Project Cost Estimator</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 ${
                pathname.startsWith('/portfolio') || pathname.startsWith('/case-studies')
                  ? 'text-[#18C6D9] font-bold'
                  : ''
              }`}
            >
              Case Studies
            </Link>

            <Link
              to="/about"
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 ${
                pathname === '/about' ? 'text-[#18C6D9] font-bold' : ''
              }`}
            >
              About Us
            </Link>

            <Link
              to="/estimator"
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1 ${
                pathname === '/estimator' ? 'text-[#18C6D9] font-bold' : ''
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#18C6D9]" />
              <span>Estimator</span>
            </Link>

            <Link
              to="/contact"
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer py-1 ${
                pathname === '/contact' ? 'text-[#18C6D9] font-bold' : ''
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Zone 3: Search, Client Portal & Quick Action */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Client Portal Link */}
            <Link
              to="/login"
              className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer ${
                pathname === '/login' || pathname === '/portal' ? 'text-[#18C6D9] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#18C6D9]" />
              <span>Client Portal</span>
            </Link>

            {/* Book Call Button */}
            <Link
              to="/consultation"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#16C79A]" />
              <span>Book Call (UTC)</span>
            </Link>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center px-4.5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase rounded-xl overflow-hidden group cursor-pointer shadow-md shadow-[#2563EB]/20 hover:shadow-[#18C6D9]/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18C6D9]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#18C6D9] to-[#16C79A] transition-transform duration-300 group-hover:scale-105" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/login"
              className="text-xs text-slate-300 hover:text-white px-2 py-1.5 rounded-lg border border-white/10"
              aria-label="Client Login"
            >
              Login
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18C6D9] rounded-lg cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#080D22]/98 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top duration-200 z-50">
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full text-left py-2.5 text-base font-medium text-white hover:text-[#18C6D9] border-b border-white/5"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-white/5 pb-2">
              <div className="flex items-center justify-between w-full py-2.5">
                <Link
                  to="/services"
                  className="text-base font-medium text-white hover:text-[#18C6D9]"
                >
                  Services
                </Link>
                <button
                  onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileServicesExpanded ? 'rotate-180 text-[#18C6D9]' : ''
                    }`}
                  />
                </button>
              </div>

              {isMobileServicesExpanded && (
                <div className="pl-3 py-2 space-y-2">
                  {SERVICES_DATA.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-2.5 w-full text-left py-2 text-sm text-slate-300 hover:text-[#18C6D9]"
                    >
                      <div className="shrink-0">{serviceIcons[service.id]}</div>
                      <span>{service.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className="block w-full text-left py-2.5 text-base font-medium text-white hover:text-[#18C6D9] border-b border-white/5"
            >
              Case Studies
            </Link>

            <Link
              to="/about"
              className="block w-full text-left py-2.5 text-base font-medium text-white hover:text-[#18C6D9] border-b border-white/5"
            >
              About Us
            </Link>

            <Link
              to="/estimator"
              className="block w-full text-left py-2.5 text-base font-medium text-white hover:text-[#18C6D9] border-b border-white/5"
            >
              Project Cost Estimator
            </Link>

            <Link
              to="/contact"
              className="block w-full text-left py-2.5 text-base font-medium text-white hover:text-[#18C6D9] border-b border-white/5"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
            <Link
              to="/consultation"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-200 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10"
            >
              <Calendar className="w-4 h-4 text-[#16C79A]" />
              <span>Book 30-Min Discovery Call (UTC)</span>
            </Link>

            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-200 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10"
            >
              <LogIn className="w-4 h-4 text-[#18C6D9]" />
              <span>Client Portal Login</span>
            </Link>

            <Link
              to="/contact"
              className="w-full py-3.5 text-sm font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-[#2563EB] to-[#18C6D9] rounded-xl shadow-lg shadow-[#2563EB]/25 text-center block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
