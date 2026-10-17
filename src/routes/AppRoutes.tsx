import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';

import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { CaseStudiesPage } from '../pages/CaseStudiesPage';
import { CaseStudyDetailPage } from '../pages/CaseStudyDetailPage';
import { ConsultationPage } from '../pages/ConsultationPage';
import { EstimatorPage } from '../pages/EstimatorPage';
import { ContactPage } from '../pages/ContactPage';
import { ClientPortalPage } from '../pages/ClientPortalPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Authenticated Client Portal & Login Routes */}
      <Route path="/login" element={<ClientPortalPage />} />
      <Route path="/portal" element={<ClientPortalPage />} />

      {/* Main Website Structure wrapped in RootLayout */}
      <Route element={<RootLayout />}>
        {/* 1. Home Page */}
        <Route index element={<HomePage />} />

        {/* 2. Company & About Us */}
        <Route path="about" element={<AboutPage />} />

        {/* 3. Services Directory & Dynamic Specifications */}
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />

        {/* 4. Portfolio / Case Studies Directory & Dynamic Breakdowns */}
        <Route path="portfolio" element={<CaseStudiesPage />} />
        <Route path="portfolio/:slug" element={<CaseStudyDetailPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />

        {/* 5. Technical Consultation Booking (UTC Standard) */}
        <Route path="consultation" element={<ConsultationPage />} />
        <Route path="book-call" element={<ConsultationPage />} />

        {/* 6. Interactive Scope & Cost Estimator */}
        <Route path="estimator" element={<EstimatorPage />} />

        {/* 7. Contact Us & Project Brief */}
        <Route path="contact" element={<ContactPage />} />

        {/* 8. Legal & Compliance */}
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />

        {/* 9. 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
