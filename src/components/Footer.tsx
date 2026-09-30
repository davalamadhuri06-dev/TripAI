import React from 'react';
import { Compass, Sparkles, ShieldAlert, Sliders } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  openSosModal: () => void;
  openWebhookModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  openSosModal,
  openWebhookModal,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Voyage<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Your AI. Your Trip. Your Adventure. Designed to connect with agentic n8n workflows for personalized journey planning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <button onClick={() => onNavClick('home')} className="hover:text-emerald-400 transition-colors">
              Home
            </button>
            <button onClick={() => onNavClick('planner')} className="hover:text-emerald-400 transition-colors">
              Plan a Trip
            </button>
            <button onClick={() => onNavClick('explore')} className="hover:text-emerald-400 transition-colors">
              Explore
            </button>
            <button onClick={() => onNavClick('trips')} className="hover:text-emerald-400 transition-colors">
              My Trips
            </button>
            <button onClick={() => onNavClick('about')} className="hover:text-emerald-400 transition-colors">
              About & Architecture
            </button>
            <button onClick={openSosModal} className="text-rose-400 hover:text-rose-300 transition-colors">
              Travel SOS
            </button>
            <button onClick={openWebhookModal} className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Webhook Settings
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VoyageAI. All rights reserved.</p>
          <p className="text-slate-400 text-center sm:text-right">
            Estimates provided for planning and exploration purposes · Built for AI agent workflows.
          </p>
        </div>
      </div>
    </footer>
  );
};
