import React, { useState } from 'react';
import { SynvoraLogo } from './SynvoraLogo';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  Send,
  ArrowLeft,
  LogOut,
  ShieldCheck,
  GitBranch,
  Terminal,
  Activity,
  FileCheck,
  MessageSquare,
} from 'lucide-react';

interface ClientDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  onBackToSite,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'sprint' | 'deliverables' | 'billing' | 'chat'>('sprint');
  const [approvedItems, setApprovedItems] = useState<string[]>(['deliv-1']);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'client' | 'engineer'; text: string; time: string }[]
  >([
    {
      sender: 'engineer',
      text: 'Good morning! Sprint 4 deployment has passed automated security checks on the staging cluster. You can review the updated dashboard telemetry.',
      time: '09:15 AM',
    },
    {
      sender: 'client',
      text: 'Thanks! We reviewed the ClickHouse query latency and it is running under 300ms. Excellent work.',
      time: '09:42 AM',
    },
    {
      sender: 'engineer',
      text: 'Great to hear. We are finalizing the automated PDF digest service today.',
      time: '10:05 AM',
    },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const toggleApproval = (id: string) => {
    setApprovedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'client',
        text: newMsg.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMsg('');

    // Simulated quick response from engineering lead
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'engineer',
          text: 'Acknowledged. We have logged this note in the sprint backlog ticket.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080D22] text-slate-100 flex flex-col antialiased">
      {/* Top Client Portal Bar */}
      <header className="border-b border-white/10 bg-[#0E1538]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={onBackToSite} className="cursor-pointer">
            <SynvoraLogo variant="dark" size="sm" />
          </button>
          <div className="hidden sm:block h-5 w-px bg-white/10" />
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-slate-400">Organization:</span>
            <span className="font-semibold text-white">Acme Global Enterprise Inc.</span>
            <span className="text-slate-400">· Active Project:</span>
            <span className="font-semibold text-[#18C6D9]">OmniMetrics Platform v2.4</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </button>
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Log Out of Workspace"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
        {/* Workspace Subheader & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ENGAGEMENT ACTIVE · SPRINT 4 IN PROGRESS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Client Project Control Hub
            </h1>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#0E1538] border border-white/10 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('sprint')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sprint'
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Sprint Health</span>
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'deliverables'
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Deliverables ({approvedItems.length}/3)</span>
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'billing'
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Milestones & Invoices</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Engineering Lead Chat</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Sprint Health */}
        {activeTab === 'sprint' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0E1538] border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Sprint Timeline</div>
                <div className="text-xl font-bold font-mono text-white">Day 7 of 10</div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#18C6D9] h-full w-[70%]" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1538] border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Staging Health</div>
                <div className="text-xl font-bold font-mono text-emerald-400">100% Operational</div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <span>commit #9a4f21 · 0 issues</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1538] border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Story Points Delivered</div>
                <div className="text-xl font-bold font-mono text-white">38 / 42 Pts</div>
                <div className="text-[11px] text-slate-400 mt-2">On schedule for Friday Demo</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1538] border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Assigned Lead Architect</div>
                <div className="text-base font-bold text-white">Marcus Vance</div>
                <div className="text-[11px] text-[#18C6D9] mt-1">Direct Slack/Video on call</div>
              </div>
            </div>

            {/* Staging Sandbox Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#101638] to-[#1E295B] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#18C6D9] uppercase tracking-wider mb-1">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Continuous Integration Staging Environment</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  https://staging-client.synvorait-cloud.net
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Live staging sandbox synced automatically with GitHub main branch.
                </p>
              </div>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Opening live staging preview frame (Simulated demonstration)');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#18C6D9] hover:bg-[#16C79A] transition-colors cursor-pointer"
              >
                <span>Launch Staging Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Content 2: Deliverables Approval */}
        {activeTab === 'deliverables' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
              Interactive Approval Hub: Review milestone deliverables prepared by Synvora IT. Click "Approve Deliverable" to test client sign-off functionality.
            </div>

            {[
              {
                id: 'deliv-1',
                title: 'Core Telemetry Engine & ClickHouse Cluster Ingest',
                desc: 'Sub-300ms real-time metric collection pipeline handling 50k events/second.',
                status: 'Passed automated load test (50,000 req/sec)',
              },
              {
                id: 'deliv-2',
                title: 'Modular Executive KPI Dashboard & Role Permissions',
                desc: 'RBAC authorization rules, multi-tenant dashboard widgets, and customizable alerts.',
                status: 'Pending formal client sign-off',
              },
              {
                id: 'deliv-3',
                title: 'Automated Scheduled PDF Summary Digest Service',
                desc: 'Headless Chromium microservice generating weekly executive summary reports.',
                status: 'Code review complete, awaiting demo verification',
              },
            ].map((deliv) => {
              const isApproved = approvedItems.includes(deliv.id);
              return (
                <div
                  key={deliv.id}
                  className="p-5 rounded-2xl bg-[#0E1538] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-base font-bold text-white">{deliv.title}</h4>
                      {isApproved ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          Awaiting Review
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{deliv.desc}</p>
                    <div className="text-[11px] font-mono text-slate-400 mt-1.5">
                      Status: {deliv.status}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleApproval(deliv.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isApproved
                        ? 'bg-white/10 text-slate-300 hover:bg-white/15'
                        : 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-md'
                    }`}
                  >
                    {isApproved ? 'Revoke Approval' : 'Approve Deliverable'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content 3: Milestones & Billing */}
        {activeTab === 'billing' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {[
              {
                num: '01',
                title: 'Phase 1: Architecture Blueprint & Cloud Foundation',
                amount: '$7,500 USD',
                status: 'Paid',
                date: 'Sep 15, 2026',
              },
              {
                num: '02',
                title: 'Phase 2: Core Platform Engineering & WebSocket Engine',
                amount: '$10,000 USD',
                status: 'Paid',
                date: 'Oct 02, 2026',
              },
              {
                num: '03',
                title: 'Phase 3: Production Hardening, Edge Deployment & Handoff',
                amount: '$7,500 USD',
                status: 'Scheduled for Cutover',
                date: 'Pending Launch',
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0E1538] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#18C6D9] bg-white/5 px-2 py-0.5 rounded">
                      Milestone {milestone.num}
                    </span>
                    <h4 className="text-sm font-bold text-white">{milestone.title}</h4>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Scheduled Settlement: {milestone.date}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-extrabold font-mono text-white">
                      {milestone.amount}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        milestone.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {milestone.status}
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading formal PDF receipt for Milestone ${milestone.num}`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 4: Direct Chat Thread */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col bg-[#0E1538] border border-white/10 rounded-2xl overflow-hidden min-h-[420px] animate-in fade-in duration-200">
            <div className="p-4 bg-[#080D22] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
                  MV
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Vance (Lead Architect)</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Online & Active on Sprint 4</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">Encrypted Enterprise Channel</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
              {chatMessages.map((m, idx) => {
                const isMe = m.sender === 'client';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#2563EB] text-white rounded-tr-none'
                          : 'bg-white/10 text-slate-100 rounded-tl-none border border-white/10'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#080D22] border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Send a direct message or architecture question to Marcus..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
