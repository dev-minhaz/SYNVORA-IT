import React, { useState, useEffect, useRef } from 'react';
import { SERVICES_DATA, CASE_STUDIES } from '../data/content';
import {
  Search,
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
  FolderGit2,
  Calendar,
  Calculator,
  LogIn,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectCaseStudy: (caseStudyId: string) => void;
  onBookCall: () => void;
  onOpenEstimator: () => void;
  onOpenLogin: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectCaseStudy,
  onBookCall,
  onOpenEstimator,
  onOpenLogin,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items
  const cleanQ = query.toLowerCase().trim();

  const serviceResults = SERVICES_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQ) ||
      s.shortDescription.toLowerCase().includes(cleanQ) ||
      s.technologies.some((t) => t.toLowerCase().includes(cleanQ))
  );

  const caseStudyResults = CASE_STUDIES.filter(
    (cs) =>
      cs.title.toLowerCase().includes(cleanQ) ||
      cs.category.toLowerCase().includes(cleanQ) ||
      cs.shortDescription.toLowerCase().includes(cleanQ)
  );

  const quickActions = [
    {
      id: 'book-call',
      title: 'Schedule Technical Discovery Call',
      category: 'Action',
      icon: <Calendar className="w-4 h-4 text-[#16C79A]" />,
      action: () => {
        onClose();
        onBookCall();
      },
    },
    {
      id: 'estimator',
      title: 'Open Interactive Project Cost Estimator',
      category: 'Action',
      icon: <Calculator className="w-4 h-4 text-[#18C6D9]" />,
      action: () => {
        onClose();
        onOpenEstimator();
      },
    },
    {
      id: 'login',
      title: 'Client Workspace Login Portal',
      category: 'Action',
      icon: <LogIn className="w-4 h-4 text-[#2563EB]" />,
      action: () => {
        onClose();
        onOpenLogin();
      },
    },
  ].filter((a) => a.title.toLowerCase().includes(cleanQ));

  const totalResults = [
    ...quickActions.map((a) => ({ ...a, type: 'action' })),
    ...serviceResults.map((s) => ({
      id: s.id,
      title: s.title,
      category: 'Service',
      icon: <Globe className="w-4 h-4 text-[#2563EB]" />,
      type: 'service',
      action: () => {
        onClose();
        onSelectService(s.id);
      },
    })),
    ...caseStudyResults.map((cs) => ({
      id: cs.id,
      title: cs.title,
      category: 'Case Study',
      icon: <FolderGit2 className="w-4 h-4 text-[#8B5CF6]" />,
      type: 'case-study',
      action: () => {
        onClose();
        onSelectCaseStudy(cs.id);
      },
    })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0E1538] border border-white/15 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-[#080D22]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, case studies, technologies, or actions..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-white/5 space-y-1">
          {totalResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              No matching specifications or resources found for "{query}".
            </div>
          ) : (
            totalResults.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer group ${
                  idx === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#18C6D9]/15 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#18C6D9] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 font-normal">
                      {item.category}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#18C6D9] group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 bg-[#080D22] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigation Shortcut:</span>
            <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
              ⌘K
            </span>
          </div>
          <span className="text-slate-500">Synvora IT Global Registry</span>
        </div>
      </div>
    </div>
  );
};
