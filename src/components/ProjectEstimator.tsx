import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Layers,
  Clock,
  DollarSign,
  Users,
  RotateCcw,
} from 'lucide-react';

interface ProjectEstimatorProps {
  onTransferToInquiry: (summary: string, estimatedBudget: string) => void;
  onBookCall: () => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onTransferToInquiry,
  onBookCall,
}) => {
  const [platform, setPlatform] = useState<string>('web-app');
  const [features, setFeatures] = useState<string[]>([
    'auth',
    'api-integration',
  ]);
  const [designLevel, setDesignLevel] = useState<string>('custom');
  const [pace, setPace] = useState<string>('standard');

  const platforms = [
    { id: 'web-app', name: 'Web Application / Portal', baseWeeks: 5, basePrice: 4500 },
    { id: 'mobile-app', name: 'Mobile App (iOS & Android)', baseWeeks: 7, basePrice: 6500 },
    { id: 'custom-software', name: 'Custom Enterprise System', baseWeeks: 8, basePrice: 8500 },
    { id: 'ecommerce', name: 'B2B/B2C E-commerce Platform', baseWeeks: 6, basePrice: 5500 },
    { id: 'ai-automation', name: 'AI & Workflow Automation', baseWeeks: 4, basePrice: 4000 },
  ];

  const featureOptions = [
    { id: 'auth', name: 'Authentication & Role-Based Permissions (RBAC)', weeks: 1, price: 900 },
    { id: 'payments', name: 'Payment Gateways & Subscriptions (Stripe/PayPal)', weeks: 1.5, price: 1400 },
    { id: 'realtime', name: 'Real-time WebSockets & Live Push Notifications', weeks: 1.5, price: 1300 },
    { id: 'analytics', name: 'Interactive Analytics & KPI Data Dashboards', weeks: 2, price: 1800 },
    { id: 'api-integration', name: 'Complex Third-Party API / CRM / ERP Sync', weeks: 1.5, price: 1200 },
    { id: 'multi-lang', name: 'Internationalization (Multi-Language / Currencies)', weeks: 1, price: 800 },
  ];

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Calculations
  const selectedPlatform = platforms.find((p) => p.id === platform) || platforms[0];
  const featureWeeks = features.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.weeks : 0);
  }, 0);
  const featureCost = features.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.price : 0);
  }, 0);

  const designMultiplier = designLevel === 'bespoke' ? 1.25 : 1.0;
  const paceMultiplier = pace === 'accelerated' ? 1.15 : 1.0;

  const totalWeeks = Math.ceil(
    (selectedPlatform.baseWeeks + featureWeeks) * (pace === 'accelerated' ? 0.75 : 1.0)
  );
  const totalCostMin = Math.round(
    ((selectedPlatform.basePrice + featureCost) * designMultiplier * paceMultiplier) / 500
  ) * 500;
  const totalCostMax = Math.round((totalCostMin * 1.3) / 500) * 500;

  const budgetLabel = `$${totalCostMin.toLocaleString()} – $${totalCostMax.toLocaleString()} USD`;

  const handleApply = () => {
    const activeFeatNames = features
      .map((fId) => featureOptions.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `Estimated Scope Summary:
Platform: ${selectedPlatform.name}
Selected Features: ${activeFeatNames || 'Standard Core'}
UI/UX Level: ${designLevel === 'bespoke' ? 'Bespoke Custom Motion Design' : 'Standard Clean System'}
Delivery Pace: ${pace === 'accelerated' ? 'Accelerated Fast-Track' : 'Standard Sprint Cadence'}
Estimated Duration: ~${totalWeeks} Weeks`;

    onTransferToInquiry(summary, `$5,000 – $10,000`);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E4EAF3] shadow-xl shadow-slate-900/5 p-6 sm:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ESTIMATION ENGINE</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Project Scope & Architecture Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure your technical requirements to generate approximate timeline and squad requirements.
          </p>
        </div>

        <button
          onClick={() => {
            setPlatform('web-app');
            setFeatures(['auth', 'api-integration']);
            setDesignLevel('custom');
            setPace('standard');
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Platform */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Primary Product Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {platforms.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    platform === p.id
                      ? 'bg-blue-50/80 border-[#2563EB] text-[#2563EB] shadow-sm font-semibold'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">{p.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    Base ~{p.baseWeeks} weeks delivery
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Feature Modules */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              2. Technical Capabilities & Integrations
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {featureOptions.map((feat) => {
                const isSelected = features.includes(feat.id);
                return (
                  <button
                    type="button"
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#16C79A] text-slate-900 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#16C79A] border-[#16C79A] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium leading-snug">{feat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Design & Pace */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. UI/UX Polish Level
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDesignLevel('custom')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                    designLevel === 'custom'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Standard Clean UI
                </button>
                <button
                  type="button"
                  onClick={() => setDesignLevel('bespoke')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                    designLevel === 'bespoke'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Bespoke Interactive
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4. Target Pace
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPace('standard')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                    pace === 'standard'
                      ? 'bg-[#18C6D9] text-slate-950 font-bold border-[#18C6D9]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Standard 2-Wk Sprints
                </button>
                <button
                  type="button"
                  onClick={() => setPace('accelerated')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                    pace === 'accelerated'
                      ? 'bg-[#18C6D9] text-slate-950 font-bold border-[#18C6D9]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Fast-Track Priority
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#080D22] via-[#0E1538] to-[#121A45] rounded-2xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl shadow-black/30 border border-white/10">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#18C6D9]">
                ESTIMATION OUTPUT
              </span>
              <span className="text-[11px] text-slate-400">Non-binding Estimate</span>
            </div>

            {/* Estimated Duration */}
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                <Clock className="w-4 h-4 text-[#18C6D9]" />
                <span>Estimated Production Duration</span>
              </div>
              <div className="text-3xl font-black font-mono text-white tabular-nums">
                ~{totalWeeks} <span className="text-lg font-normal text-slate-300">Weeks</span>
              </div>
            </div>

            {/* Estimated Investment Range */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                <DollarSign className="w-4 h-4 text-[#35D399]" />
                <span>Indicative Investment Range</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#35D399] tabular-nums">
                {budgetLabel}
              </div>
            </div>

            {/* Recommended Squad Structure */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Users className="w-3.5 h-3.5 text-[#268BFF]" />
                <span>Recommended Engineering Squad</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 font-normal">
                <li>• 1 Principal Solutions Architect</li>
                <li>• 1-2 Senior Full-Stack Engineers</li>
                <li>• 1 UI/UX Systems Designer</li>
                <li>• 1 Dedicated QA & Security Reviewer</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleApply}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#18C6D9] hover:opacity-95 transition-opacity shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transfer Scope to Inquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onBookCall}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer text-center"
            >
              Or Schedule a Discovery Call Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
