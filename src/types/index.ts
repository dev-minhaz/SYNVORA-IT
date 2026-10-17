export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: string[];
  businessOutcomes: string[];
  workflow: { step: string; title: string; desc: string }[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
  typicalTimeline: string;
  estimatedTeam: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  badgeLabel: string;
  shortDescription: string;
  fullOverview: string;
  challenge: string;
  approach: string;
  keyFeatures: string[];
  solutionImpact: string;
  techStack: string[];
  imagePath: string;
  metrics: { label: string; value: string }[];
  architectureHighlights: string[];
  deliverablesDelivered: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ContactFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  privacyConsent: boolean;
}

export interface ContactFormErrors {
  fullName?: string;
  businessEmail?: string;
  service?: string;
  message?: string;
  privacyConsent?: string;
}

export interface ConsultationBooking {
  id?: string;
  name: string;
  email: string;
  company: string;
  timezone: string;
  date: string;
  dateFormatted: string;
  timeSlot: string;
  timeSlotUtcFormatted: string;
  isoUtcTimestamp: string;
  topic: string;
  notes?: string;
  createdAt?: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'case-studies'
  | 'case-study-detail'
  | 'estimator'
  | 'contact'
  | 'client-portal';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
