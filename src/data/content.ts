import { ServiceItem, CaseStudyItem, ProcessStep } from '../types';

export const SITE_CONFIG = {
  companyName: 'Synvora IT',
  tagline: 'Technology that moves businesses forward.',
  email: 'inquiries@synvorait.com',
  intlInquiries: 'international@synvorait.com',
  workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM (UTC / EST response teams)',
  phone: '+1 (800) 592-7489',
  address: 'Global Technology Services & Remote Consulting',
  primaryCtaText: 'Start Your Project',
  secondaryCtaText: 'Explore Our Services',
  socialLinks: {
    facebook: 'https://facebook.com/synvorait',
    instagram: 'https://instagram.com/synvorait',
    linkedin: 'https://linkedin.com/company/synvorait',
  },
};

export const VALUE_PROPOSITIONS = [
  {
    title: 'Strategy-Led Development',
    description: 'We align technical architectures with tangible commercial milestones from day one.',
    icon: 'Compass',
  },
  {
    title: 'Scalable Solutions',
    description: 'Engineered modularly to adapt as traffic, transactions, and user volumes multiply.',
    icon: 'Layers',
  },
  {
    title: 'Quality-Focused Delivery',
    description: 'Rigorous automated testing, strict linting, and continuous code quality reviews.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Long-Term Partnership',
    description: 'Dedicated lifecycle maintenance, architecture iteration, and clear accountability.',
    icon: 'Handshake',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    shortDescription: 'Fast, responsive, accessible websites and web applications designed to turn visitors into customers.',
    fullDescription: 'We build high-performance web applications and corporate digital platforms engineered with modern frontend frameworks and robust backend architectures. Every application is optimized for search engines, international accessibility, and rapid loading speeds.',
    iconName: 'Globe',
    typicalTimeline: '4 – 8 weeks',
    estimatedTeam: 'Lead Full-Stack Engineer, UI/UX Designer, QA Specialist',
    capabilities: [
      'Corporate websites & portals',
      'High-throughput web applications',
      'Modern frontend engineering (React, Next.js, TypeScript)',
      'Secure backend API integrations',
      'Core Web Vitals performance tuning',
      'Server-side rendering (SSR) & edge caching',
    ],
    businessOutcomes: [
      'Sub-second page load speeds increasing conversion rates',
      'Flawless cross-browser and mobile responsive fidelity',
      'Maintainable component systems that accelerate future feature releases',
    ],
    workflow: [
      { step: '01', title: 'Architecture Planning', desc: 'Analyzing target personas, user journeys, data contracts, and component boundaries.' },
      { step: '02', title: 'Interface Engineering', desc: 'Crafting responsive, accessible UI modules with strict design token discipline.' },
      { step: '03', title: 'Full-Stack Integration', desc: 'Wiring performant REST/GraphQL endpoints, security headers, and SSR caching.' },
      { step: '04', title: 'Deployment & Monitoring', desc: 'Staging validation, automated testing, Lighthouse checks, and CDN-edge rollout.' },
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Vite', 'GraphQL'],
    faqs: [
      {
        question: 'How do you ensure web performance and accessibility?',
        answer: 'We enforce automated Lighthouse CI budgets, WCAG AA compliance checks, semantic markup, and optimized media compression so sites load instantaneously across all geographies.'
      },
      {
        question: 'Can you migrate legacy web platforms to modern stacks?',
        answer: 'Yes. We specialize in phased migration roadmaps that preserve existing SEO authority, redirect structures, and database records without downtime.'
      },
      {
        question: 'Do you provide responsive cross-browser testing?',
        answer: 'All web applications are validated against modern Chromium, WebKit (Safari), and Firefox browsers across desktop, tablet, and mobile breakpoints.'
      }
    ]
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Custom Software Development',
    shortDescription: 'Purpose-built software that simplifies operations, connects workflows, and supports your business goals.',
    fullDescription: 'Off-the-shelf software rarely fits intricate operational nuances. We engineer tailored enterprise systems, internal management portals, and automated business engines built around your exact operational workflows.',
    iconName: 'Code2',
    typicalTimeline: '8 – 16 weeks',
    estimatedTeam: 'Senior System Architect, 2 Backend Engineers, Frontend Engineer, QA Lead',
    capabilities: [
      'Bespoke business operating systems',
      'Internal management & KPI dashboards',
      'High-reliability API services & microservices',
      'Workflow orchestration & task pipelines',
      'Relational and document database architectures',
      'Role-based access control (RBAC) & audit logging',
    ],
    businessOutcomes: [
      'Elimination of manual spreadsheets and fragmented software tools',
      'Unified enterprise data visibility for executive decision-making',
      'Scalable foundations that grow smoothly without recurring seat-license inflation',
    ],
    workflow: [
      { step: '01', title: 'System Analysis', desc: 'Mapping operational data models, role hierarchies, and workflow handoffs.' },
      { step: '02', title: 'Domain Modeling', desc: 'Designing clean database schemas and secure API interfaces.' },
      { step: '03', title: 'Agile Sprints', desc: 'Iterative two-week delivery cycles with working feature demos.' },
      { step: '04', title: 'Production Cutover', desc: 'Zero-data-loss migration, team onboarding, and operational telemetry.' },
    ],
    technologies: ['Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'NestJS'],
    faqs: [
      {
        question: 'How do you handle intellectual property and source code ownership?',
        answer: 'Full IP ownership of all bespoke source code, documentation, and architecture assets transfers unconditionally to your company upon milestone completion.'
      },
      {
        question: 'How do we maintain and extend the software later?',
        answer: 'We write clean, strictly typed, self-documenting code with comprehensive unit/integration test coverage and clear API documentation.'
      }
    ]
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'Mobile experiences designed around usability, performance, and the needs of modern users.',
    fullDescription: 'We deliver intuitive, high-performance mobile applications across iOS and Android. Combining native device capabilities with streamlined cross-platform architectures, we produce frictionless mobile workflows that retain users.',
    iconName: 'Smartphone',
    typicalTimeline: '6 – 12 weeks',
    estimatedTeam: 'Lead Mobile Engineer, UI/UX Designer, Backend API Specialist',
    capabilities: [
      'iOS and Android mobile platforms',
      'Cross-platform development (React Native & Flutter)',
      'Offline-first data synchronization',
      'Native hardware API integrations (Biometrics, Camera, GPS)',
      'App Store and Google Play compliance & deployment',
      'Push notification automation & in-app telemetry',
    ],
    businessOutcomes: [
      'Direct mobile engagement channels with push notification capabilities',
      'Consistent 60fps gesture fluidness and native touch response',
      'Single codebase maintenance saving up to 40% in ongoing maintenance overhead',
    ],
    workflow: [
      { step: '01', title: 'Mobile UX Journey', desc: 'Wireframing touch zones, navigation models, and offline fallback states.' },
      { step: '02', title: 'Client Architecture', desc: 'Building responsive layouts and deterministic local state caches.' },
      { step: '03', title: 'Device Testing', desc: 'Validating across physical iOS and Android form factors and OS versions.' },
      { step: '04', title: 'Store Certification', desc: 'Managing app review submissions, security reviews, and release flags.' },
    ],
    technologies: ['React Native', 'TypeScript', 'iOS / Swift', 'Android / Kotlin', 'REST / GraphQL', 'SQLite'],
    faqs: [
      {
        question: 'Do you build native or cross-platform apps?',
        answer: 'We evaluate your performance targets and budget. React Native is ideal for most commercial apps to maximize delivery speed, while native Swift/Kotlin is utilized for low-level hardware control.'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription: 'Intuitive digital experiences that make products easier to understand, navigate, and use.',
    fullDescription: 'Great interface design eliminates confusion and guides decision-making. We conduct user research, craft comprehensive design systems, and build clickable high-fidelity prototypes that balance visual beauty with operational clarity.',
    iconName: 'Palette',
    typicalTimeline: '3 – 6 weeks',
    estimatedTeam: 'Lead Product Designer, Design Systems Architect, User Researcher',
    capabilities: [
      'User journey mapping & friction audits',
      'Interactive Figma prototypes & wireframes',
      'Scalable design systems & token libraries',
      'B2B SaaS dashboard information architecture',
      'Conversion rate optimization (CRO) redesigns',
      'WCAG AA accessible color & contrast audits',
    ],
    businessOutcomes: [
      'Lower onboarding friction and reduced customer support inquiries',
      'Higher trial-to-paid conversion rates across product touchpoints',
      'A cohesive, premium brand aesthetic that builds immediate enterprise credibility',
    ],
    workflow: [
      { step: '01', title: 'Discovery & Empathy', desc: 'Interviews, competitor teardowns, and task complexity analysis.' },
      { step: '02', title: 'Structural Wireframes', desc: 'Low-fidelity layout blueprints establishing clear information hierarchy.' },
      { step: '03', title: 'Visual Systems', desc: 'Crafting pixel-perfect design tokens, typography, and interactive components.' },
      { step: '04', title: 'Developer Handoff', desc: 'Documented component specs, export assets, and interactive motion guides.' },
    ],
    technologies: ['Figma', 'Design Tokens', 'Tailwind Systems', 'Prototyping', 'Accessibility (WCAG)'],
    faqs: [
      {
        question: 'Do you deliver assets ready for engineering teams?',
        answer: 'Yes. We deliver structured Figma libraries with design tokens, responsive auto-layouts, micro-interaction states, and zero-ambiguity design specifications.'
      }
    ]
  },
  {
    id: 'ecommerce-solutions',
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    shortDescription: 'Flexible online shopping experiences built to simplify product discovery and improve purchasing journeys.',
    fullDescription: 'We design and engineer bespoke commerce platforms and headless store architectures that deliver seamless checkout flows, real-time inventory management, and smooth international currency handling.',
    iconName: 'ShoppingBag',
    typicalTimeline: '6 – 12 weeks',
    estimatedTeam: 'Commerce Solution Architect, Full-Stack Engineer, Integration Specialist',
    capabilities: [
      'High-conversion online storefronts',
      'Headless commerce architectures',
      'Payment gateway & multi-currency integration',
      'Inventory, order & shipping workflows',
      'B2B wholesale catalog & tier-pricing systems',
      'Automated invoice generation & tax reconciliation',
    ],
    businessOutcomes: [
      'Frictionless multi-step or single-page checkouts minimizing cart abandonment',
      'Lightning-fast catalog search and facet filtering',
      'Global payment readiness with localized tax, VAT, and shipping calculations',
    ],
    workflow: [
      { step: '01', title: 'Commerce Scope', desc: 'Catalog taxonomy, checkout gates, and ERP/CRM integration points.' },
      { step: '02', title: 'Experience Prototyping', desc: 'Optimizing product detail layouts, cart drawers, and upsell modules.' },
      { step: '03', title: 'Payment Engineering', desc: 'Implementing PCI-compliant checkout flows with Stripe, PayPal, and regional gateways.' },
      { step: '04', title: 'Load & Security Validation', desc: 'Stress-testing peak traffic spikes and failover pathways.' },
    ],
    technologies: ['Next.js Commerce', 'Shopify Plus / Headless', 'Stripe API', 'PostgreSQL', 'Algolia', 'Redis'],
    faqs: [
      {
        question: 'Can you handle multi-currency and international shipping?',
        answer: 'Yes. We build localized pricing tables, automated currency conversions, and automated duty/tax calculation integrations for international buyers.'
      }
    ]
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortDescription: 'Modern infrastructure, deployment workflows, and cloud architecture designed for reliable growth.',
    fullDescription: 'We build resilient cloud environments that eliminate manual deployments and prevent downtime. Through Infrastructure as Code (IaC), automated CI/CD pipelines, and proactive observability, your systems remain fast and secure 24/7.',
    iconName: 'Cloud',
    typicalTimeline: '3 – 8 weeks',
    estimatedTeam: 'Senior DevOps Architect, Cloud Reliability Engineer',
    capabilities: [
      'Multi-cloud architecture (AWS, GCP, Azure)',
      'Automated CI/CD pipelines with GitHub Actions',
      'Containerization & orchestration (Docker, Kubernetes)',
      'Real-time infrastructure telemetry & alerting',
      'Cost optimization & auto-scaling policies',
      'Zero-downtime deployment strategies',
    ],
    businessOutcomes: [
      'Zero-downtime blue/green deployments and instant rollbacks',
      'Up to 35% reduction in unneeded cloud resource waste',
      'Robust disaster recovery and automated snapshot backups',
    ],
    workflow: [
      { step: '01', title: 'Infrastructure Audit', desc: 'Reviewing existing server footprints, bottlenecks, and security gaps.' },
      { step: '02', title: 'IaC Definition', desc: 'Templating repeatable cloud topology using modern provisioning standards.' },
      { step: '03', title: 'Pipeline Automation', desc: 'Building automated lint, build, test, and container push actions.' },
      { step: '04', title: 'Observability Setup', desc: 'Deploying structured logging, health checks, and alerting thresholds.' },
    ],
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Terraform', 'GitHub Actions', 'Prometheus'],
    faqs: [
      {
        question: 'Can you help reduce our existing AWS or GCP monthly bill?',
        answer: 'Yes. We conduct thorough infrastructure audits to right-size instances, configure smart autoscaling, and eliminate idle resources.'
      }
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    shortDescription: 'Practical automation and intelligent integrations that help teams reduce repetitive work and improve efficiency.',
    fullDescription: 'We cut through artificial intelligence hype to deliver practical, value-generating automations: intelligent document parsing, natural language customer routing, automated data reconciliation, and tailored API integrations.',
    iconName: 'Cpu',
    typicalTimeline: '4 – 10 weeks',
    estimatedTeam: 'Machine Learning / AI Engineer, Python Backend Architect',
    capabilities: [
      'Business process workflow automation',
      'Intelligent data extraction & document processing',
      'Custom LLM API orchestration & semantic search',
      'Automated CRM and marketing handoffs',
      'Data pipeline cleanup and normalization',
      'Vector database embeddings & RAG architectures',
    ],
    businessOutcomes: [
      'Drastic reduction in manual data entry and human error',
      'Instantaneous turnaround for routine customer and operational inquiries',
      'Measurable hours saved weekly across operations and support personnel',
    ],
    workflow: [
      { step: '01', title: 'Workflow Discovery', desc: 'Identifying high-volume repetitive bottlenecks with quantifiable manual hours.' },
      { step: '02', title: 'Pipeline Prototyping', desc: 'Developing targeted automation scripts and model prompts with guardrails.' },
      { step: '03', title: 'System Orchestration', desc: 'Integrating with your existing ERP, CRM, and communication tools.' },
      { step: '04', title: 'Accuracy Monitoring', desc: 'Continuous evaluation of output precision, confidence scoring, and fallbacks.' },
    ],
    technologies: ['Python', 'LangChain', 'OpenAI / Gemini SDK', 'PostgreSQL pgvector', 'Zapier / n8n', 'Node.js', 'FastAPI'],
    faqs: [
      {
        question: 'Is our sensitive company data protected when using AI APIs?',
        answer: 'Yes. We enforce enterprise-grade data privacy practices: zero-training API agreements, data sanitization before external calls, and local encryption.'
      }
    ]
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity & IT Consulting',
    shortDescription: 'Technology guidance and security-focused improvements that help organizations build and operate more responsibly.',
    fullDescription: 'We provide pragmatic architectural guidance, security vulnerability assessments, and technology roadmapping to ensure your infrastructure and code adhere to modern security hygiene and international standards.',
    iconName: 'ShieldAlert',
    typicalTimeline: '2 – 6 weeks',
    estimatedTeam: 'Principal Security Consultant, Cloud Infrastructure Auditor',
    capabilities: [
      'Web application vulnerability reviews',
      'Security-first development best practices',
      'Cloud access control & IAM hardening',
      'Technical roadmap consulting for executives',
      'Third-party dependency risk assessments',
      'OWASP Top 10 remediation blueprints',
    ],
    businessOutcomes: [
      'Proactive mitigation of data leakage risks and OWASP Top 10 vulnerabilities',
      'Alignment with modern client security questionnaire standards',
      'Clear, actionable technology roadmaps aligned with executive growth targets',
    ],
    workflow: [
      { step: '01', title: 'Posture Assessment', desc: 'Static code analysis, IAM privilege review, and network surface inspection.' },
      { step: '02', title: 'Risk Prioritization', desc: 'Generating structured vulnerability remediation matrices with severity tiers.' },
      { step: '03', title: 'Hardening Execution', desc: 'Patching dependencies, tightening CORS/CSP policies, and rotating keys.' },
      { step: '04', title: 'Governance Guidelines', desc: 'Drafting internal security engineering checklists for ongoing releases.' },
    ],
    technologies: ['OWASP Standards', 'OAuth 2.0 / OIDC', 'SonarQube', 'IAM Governance', 'CSP / HTTPS Security', 'Snyk'],
    faqs: [
      {
        question: 'Do you provide security certifications or penetration testing reports?',
        answer: 'We provide technical vulnerability assessments and architectural hardening. For formal accredited certifications, we work alongside your accredited third-party auditing partners.'
      }
    ]
  },
];

export const WHY_CHOOSE_US = [
  {
    id: '01',
    title: 'Solutions That Fit',
    description: 'We do not sell cookie-cutter templates. Every technical decision is shaped strictly around your actual business workflow, budget, and growth phase.',
    icon: 'Target',
  },
  {
    id: '02',
    title: 'Thoughtful Engineering',
    description: 'Maintainable, strictly typed code and clear architecture documentation designed so any skilled engineer can inspect and build upon it with confidence.',
    icon: 'Cpu',
  },
  {
    id: '03',
    title: 'Clear Communication',
    description: 'Direct collaboration without layers of bureaucratic account managers. You receive clear weekly milestones, accessible demos, and rapid responses.',
    icon: 'MessageSquare',
  },
  {
    id: '04',
    title: 'Growth-Ready Thinking',
    description: 'Flexible system architectures and practical modular decisions that prevent expensive rewrites as your transaction and customer numbers double.',
    icon: 'TrendingUp',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We learn about your commercial objectives, target audience, technical challenges, and project constraints through focused discovery sessions.',
    deliverables: ['Discovery Brief', 'Technical Scope Document', 'Milestone Schedule'],
  },
  {
    number: '02',
    title: 'Plan & Design',
    description: 'We define the technical architecture, map out user flows, and craft clickable UI prototypes with strict design token discipline.',
    deliverables: ['Interactive Wireframes', 'Design System Library', 'Architecture Blueprint'],
  },
  {
    number: '03',
    title: 'Build & Refine',
    description: 'We develop the solution in iterative sprints, validate functionality against real device viewports, and refine through structured client reviews.',
    deliverables: ['Staging Environment Access', 'Weekly Demo Releases', 'Automated Test Suites'],
  },
  {
    number: '04',
    title: 'Launch & Improve',
    description: 'We execute production deployment checklists, verify edge caching and monitoring telemetry, and identify opportunities for ongoing evolution.',
    deliverables: ['Production Release', 'Source Code Handoff', 'Post-Launch Support Plan'],
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'commerce-platform',
    slug: 'commerce-platform',
    title: 'SupplyFlow B2B Commerce Engine',
    category: 'E-commerce & Wholesale Platforms',
    badgeLabel: 'Illustrative Case Study',
    shortDescription: 'An online purchasing and catalog discovery platform designed to simplify complex multi-tier industrial ordering and wholesale transactions.',
    fullOverview: 'SupplyFlow is a modern B2B e-commerce platform concept engineered to address the friction points of high-volume industrial purchasing: complex price tiers, real-time inventory tracking across distributed fulfillment centers, and streamlined credit-term checkouts.',
    challenge: 'Wholesale buyers previously had to navigate slow catalog PDFs, call representatives for custom pricing tiers, and wait days for invoice confirmations.',
    approach: 'Designed an ultra-clean, transparent glassmorphism UI layout featuring quick-order tabular SKUs, instant faceted searching, and a multi-step checkout workflow with pre-authorized credit limits.',
    keyFeatures: [
      'Dynamic wholesale price-tier calculation by account volume',
      'Real-time multi-warehouse inventory status indicators',
      'Rapid bulk CSV SKU uploads for repeat purchase orders',
      'Instant purchase order PDF generation & automated ERP syncing',
    ],
    solutionImpact: 'Designed for sub-800ms catalog queries and a 60% faster checkout process compared to traditional legacy wholesale procurement portals.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe Invoicing', 'Redis'],
    imagePath: '/src/assets/images/case_study_ecommerce_1791812599699.jpg',
    metrics: [
      { label: 'Catalog Query Speed', value: '<800ms' },
      { label: 'Checkout Time Reduction', value: '60%' },
      { label: 'Inventory Sync Latency', value: 'Real-time' },
    ],
    architectureHighlights: [
      'PostgreSQL Full-Text Search with Trigram Indexing for sub-second SKU matching',
      'Redis Distributed Locks for atomic warehouse inventory reservation',
      'Stripe Corporate Invoicing webhook lifecycle handler',
    ],
    deliverablesDelivered: [
      'Full Responsive B2B Storefront Application',
      'Warehouse Order Management Dispatch Portal',
      'REST & Webhook ERP Synchronization Service',
    ]
  },
  {
    id: 'analytics-dashboard',
    slug: 'analytics-dashboard',
    title: 'OmniMetrics Enterprise Intelligence',
    category: 'Business Analytics & Data Platforms',
    badgeLabel: 'Illustrative Case Study',
    shortDescription: 'A centralized operational dashboard concept engineered to help cross-functional enterprise teams make informed data-driven decisions.',
    fullOverview: 'OmniMetrics brings together disparate telemetry streams into a clean, unified dashboard layout. Operational managers and executives gain instant clarity into real-time system performance, recurring revenue velocity, and regional operational throughput.',
    challenge: 'Enterprise data was scattered across disparate operational tools, requiring engineering teams to manually compile weekly SQL exports for management.',
    approach: 'Constructed an intuitive modular dashboard architecture featuring tabular numeric alignments, customizable widget grids, and visual query monitors.',
    keyFeatures: [
      'Modular drag-and-drop metric panels with custom alert thresholds',
      'Live query telemetry stream with millisecond latency monitors',
      'Multi-tenant role-based access control with granular data masks',
      'Automated scheduled report distribution in PDF and CSV formats',
    ],
    solutionImpact: 'Enables executive leadership to inspect operational health at a glance, eliminating recurring manual reporting overhead.',
    techStack: ['React', 'TypeScript', 'D3.js Data Visualizations', 'Node.js', 'ClickHouse', 'Tailwind CSS'],
    imagePath: '/src/assets/images/case_study_analytics_1791812624240.jpg',
    metrics: [
      { label: 'Data Refresh Latency', value: '1.2s' },
      { label: 'Custom Metric Views', value: 'Unlimited' },
      { label: 'Weekly Hours Saved', value: '14+ hrs' },
    ],
    architectureHighlights: [
      'Real-time WebSocket streaming with automatic reconnect backoff',
      'Virtualized canvas charts capable of rendering 100k+ data points at 60fps',
      'Columnar ClickHouse database aggregation engine for billions of log events',
    ],
    deliverablesDelivered: [
      'Executive KPI Cockpit Web App',
      'Custom Alerting & Slack/Email Notification Microservice',
      'Automated PDF Summary Digest Generator',
    ]
  },
  {
    id: 'saas-productivity',
    slug: 'saas-productivity',
    title: 'SparkFlow Agile Orchestration Suite',
    category: 'SaaS Platforms & Workflow Automation',
    badgeLabel: 'Illustrative Case Study',
    shortDescription: 'A modern productivity platform concept focused on structured team sprints, visual Kanban flows, and smoother developer handoffs.',
    fullOverview: 'SparkFlow streamlines modern product engineering lifecycles. It merges sprint roadmaps, automated CI pipeline notifications, and team velocity diagnostics into one distraction-free workspace.',
    challenge: 'Engineering teams suffered from context switching between disjointed task trackers, PR review chats, and manual deployment checklists.',
    approach: 'Architected an ultra-responsive single-page workspace utilizing keyboard shortcuts, live task status updates, and automated pipeline triggers.',
    keyFeatures: [
      'Interactive Kanban boards with customizable state columns',
      'Integrated sprint velocity graphs and team burndown curves',
      'Automated triggers from Git pull requests to update card states',
      'Command-palette navigation for keyboard-first developers',
    ],
    solutionImpact: 'Provides product managers and developers with a cohesive operational rhythm without bloated configuration settings.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Node.js', 'Docker'],
    imagePath: '/src/assets/images/case_study_saas_1791812635722.jpg',
    metrics: [
      { label: 'Sprint Planning Speed', value: '2x Faster' },
      { label: 'Context Switching Cost', value: '-45%' },
      { label: 'Touch & Keyboard Support', value: '100%' },
    ],
    architectureHighlights: [
      'Optimistic client UI state mutations with rollback protection',
      'Webhook ingest queue processing 1,000+ GitHub and GitLab events/sec',
      'Strict end-to-end type safety shared between frontend and server runtime',
    ],
    deliverablesDelivered: [
      'High-Performance Single Page Web Application',
      'Bidirectional Git Webhook Sync Daemon',
      'Interactive Sprint Retrospective & Velocity Engine',
    ]
  },
];

export const TECH_CATEGORIES = [
  {
    category: 'Frontend Engineering',
    items: [
      { name: 'React', description: 'Component-driven interactive web UIs' },
      { name: 'TypeScript', description: 'Strict type safety and robust contracts' },
      { name: 'Next.js', description: 'SSR, SSG, and edge-rendered performance' },
      { name: 'Tailwind CSS', description: 'Utility-first maintainable design systems' },
      { name: 'Vite', description: 'Instant development and optimized bundling' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js', description: 'Asynchronous event-driven services' },
      { name: 'Python', description: 'Data processing, automation & scripts' },
      { name: 'REST & GraphQL', description: 'Typed schema-compliant web APIs' },
      { name: 'Express / NestJS', description: 'Modular scalable server frameworks' },
    ],
  },
  {
    category: 'Databases & Storage',
    items: [
      { name: 'PostgreSQL', description: 'Battle-tested relational data store' },
      { name: 'MySQL', description: 'High-availability transactional storage' },
      { name: 'Redis', description: 'In-memory caching and session queues' },
      { name: 'Prisma / Drizzle', description: 'Modern typed database ORMs' },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      { name: 'Docker', description: 'Reproducible containerized environments' },
      { name: 'Google Cloud & AWS', description: 'Elastic computing and managed infrastructure' },
      { name: 'GitHub Actions', description: 'Automated CI/CD build pipelines' },
      { name: 'Cloudflare / CDN', description: 'Edge caching, DDoS defense & SSL' },
    ],
  },
];

export const COLLABORATION_PRINCIPLES = [
  {
    title: 'Transparent Project Progress',
    description: 'You get full access to live staging links, sprint backlog boards, and direct communication channels. No surprises at launch.',
  },
  {
    title: 'Structured Feedback Milestones',
    description: 'We organize reviews into dedicated approval checkpoints so feedback is incorporated systematically without delaying momentum.',
  },
  {
    title: 'Reliable Delivery Schedules',
    description: 'We break complex roadmaps into clear bi-weekly milestones with defined deliverables so your business can plan marketing launches with certainty.',
  },
  {
    title: 'Post-Launch Stewardship',
    description: 'Our engagement continues after release with code warranties, proactive maintenance monitoring, and architecture advisory.',
  },
];

export const CONSULTATION_TOPICS = [
  'New Product MVP & Full-Stack Development',
  'Architecture & Legacy System Modernization',
  'Cloud Infrastructure, DevOps & Cost Audit',
  'Bespoke Enterprise Software & Automation',
  'UI/UX Redesign & Conversion Optimization',
  'Security Review & Compliance Preparation',
];
