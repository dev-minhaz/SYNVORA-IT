import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 right-6 z-30 p-2.5 rounded-xl bg-[#0e1638]/90 hover:bg-[#182654] text-slate-300 hover:text-white border border-white/15 shadow-lg backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer animate-in fade-in"
    >
      <ArrowUp className="w-4 h-4 text-[#18C6D9]" />
    </button>
  );
};
