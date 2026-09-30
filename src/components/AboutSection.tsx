import React from 'react';
import { Compass, Sparkles, Workflow, ArrowRight, Code2, Server, CheckCircle2, Copy } from 'lucide-react';
import { N8N_WEBHOOK_URL } from '../services/n8nService';

interface AboutSectionProps {
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  openWebhookModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onShowToast,
  openWebhookModal,
}) => {
  const samplePayload = {
    from: "Hyderabad",
    destination: "Goa",
    days: 3,
    travelers: 2,
    travelType: "Friends",
    budget: 30000,
    preferences: [
      "Beach Lover",
      "Foodie",
      "Adventure Seeker"
    ],
    message: "I want beaches, adventure activities and local food."
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(JSON.stringify(samplePayload, null, 2));
    onShowToast("Sample JSON payload copied to clipboard!", "success");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Title & Core Statement */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          <Workflow className="h-3.5 w-3.5" />
          <span>Architecture & Integration</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
          About VoyageAI
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
          VoyageAI combines an interactive travel website with an AI travel planning workflow powered by n8n.
        </p>
      </div>

      {/* Workflow Visual Architecture Diagram */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-sm space-y-8">
        <div>
          <h3 className="font-display text-xl font-bold text-white">
            System Workflow Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How travel requirements travel from user input to the n8n AI Agent and back to the rich dashboard
          </p>
        </div>

        {/* Multi-step flow visual */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            {
              step: '01',
              title: 'User Input',
              subtitle: 'Multi-Step UI Form',
              desc: 'Travelers specify routes, dates, group dynamics, INR budget & personality tags.',
              icon: '👤',
            },
            {
              step: '02',
              title: 'POST Webhook',
              subtitle: 'JSON Payload',
              desc: 'Clean JSON formatted schema transmitted via HTTP POST to the n8n endpoint.',
              icon: '⚡',
            },
            {
              step: '03',
              title: 'n8n AI Agent',
              subtitle: 'Agentic Workflow',
              desc: 'n8n workflow parses inputs, searches flight paths, inspects hotels, and curates timelines.',
              icon: '🤖',
            },
            {
              step: '04',
              title: 'Rich Dashboard',
              subtitle: 'VoyageAI Client',
              desc: 'Renders flights, stays, interactive packing lists, food guides, and budget graphs.',
              icon: '✨',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold">{item.step}</span>
                <span className="text-xl">{item.icon}</span>
              </div>
              <h4 className="font-display text-base font-bold text-white mt-1">
                {item.title}
              </h4>
              <p className="text-[11px] font-mono text-emerald-400/90 font-medium">
                {item.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* N8N Webhook Specification & Code */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-400" />
              <span>n8n Webhook Payload Specification</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Standard JSON structure dispatched on clicking "Create My AI Trip"
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors self-start sm:self-auto"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy JSON</span>
          </button>
        </div>

        {/* Code block */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
          <pre>{JSON.stringify(samplePayload, null, 2)}</pre>
        </div>

        {/* Configuration Variable Notice */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              JavaScript Configuration Variable
            </span>
            <button
              onClick={openWebhookModal}
              className="text-xs font-semibold text-emerald-400 underline hover:text-emerald-300"
            >
              Open Webhook Settings
            </button>
          </div>
          <div className="font-mono text-xs text-white bg-slate-950/80 p-3 rounded-xl border border-slate-800 break-all">
            const N8N_WEBHOOK_URL = "{N8N_WEBHOOK_URL}";
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In code, this is defined at <span className="font-mono text-emerald-300">src/services/n8nService.ts</span>. You can test in standalone demo mode or insert your deployed n8n webhook URL directly in the settings modal.
          </p>
        </div>
      </div>

      {/* Value pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <h4 className="font-bold text-white text-base">Zero Fake APIs</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transparently highlights all pricing as "Estimated" unless linked with verified booking feeds.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <h4 className="font-bold text-white text-base">Serverless & Local</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stores your trip records in the browser's persistent localStorage with instant zero-database access.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <h4 className="font-bold text-white text-base">Production Startup Polish</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineered with modern typography, glassmorphism, responsive navigation, and fluid interaction feedback.
          </p>
        </div>
      </div>
    </div>
  );
};
