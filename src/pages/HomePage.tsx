import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessSection } from '../components/ProcessSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { TechStackSection } from '../components/TechStackSection';
import { CollaborationSection } from '../components/CollaborationSection';
import { CtaSection } from '../components/CtaSection';
import { ContactSection } from '../components/ContactSection';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Synvora IT | Digital Solutions & Software Development',
    description:
      'Explore Synvora IT’s digital solutions, software development, web experiences, and technology services designed to help businesses move forward.',
  });

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleTransferEstimator = (summary: string) => {
    addToast('Estimator Scope Saved', 'Transferring your calculated scope to the project inquiry form...', 'info');
    navigate('/contact', { state: { initialScope: summary } });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <Hero
        onStartProject={() => navigate('/contact')}
        onExploreServices={() => navigate('/services')}
      />

      {/* 2. Value Proposition Strip */}
      <TrustStrip />

      {/* 3. About Us Section */}
      <AboutSection onDiscoverApproach={() => navigate('/about')} />

      {/* 4. Core Services Grid */}
      <ServicesSection onSelectService={(slug) => navigate(`/services/${slug}`)} />

      {/* 5. Why Choose Us (Dark Contrast) */}
      <WhyChooseUs />

      {/* 6. Development Process */}
      <ProcessSection />

      {/* 7. Selected Case Studies */}
      <CaseStudiesSection onSelectCaseStudy={(cs) => navigate(`/portfolio/${cs.slug}`)} />

      {/* 8. Interactive Estimator Preview Section */}
      <section className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectEstimator
            onTransferToInquiry={handleTransferEstimator}
            onBookCall={() => navigate('/consultation')}
          />
        </div>
      </section>

      {/* 9. Technology Toolkit */}
      <TechStackSection />

      {/* 10. Client Experience Standards */}
      <CollaborationSection />

      {/* 11. Pre-Contact Conversion Section */}
      <CtaSection
        onStartProject={() => navigate('/contact')}
        onExploreServices={() => navigate('/services')}
      />

      {/* 12. Lead Generation Contact Form */}
      <ContactSection onOpenPrivacy={() => navigate('/privacy')} />
    </>
  );
};
