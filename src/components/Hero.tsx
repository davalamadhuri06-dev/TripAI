import React from 'react';
import { Sparkles, Compass, MapPin, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { travelImages } from '../assets/images';

interface HeroProps {
  onStartPlanning: () => void;
  onExplore: () => void;
  onQuickSearch: (destination: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlanning,
  onExplore,
  onQuickSearch,
}) => {
  const [quickDest, setQuickDest] = React.useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickDest.trim()) {
      onQuickSearch(quickDest.trim());
    } else {
      onStartPlanning();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={travelImages.hero}
          alt="VoyageAI Scenic Coastal Adventure"
          className="h-full w-full object-cover object-center brightness-[0.45] scale-105 transform motion-safe:transition-transform motion-safe:duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtle Tagline kicker */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Your AI. Your Trip. Your Adventure.</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-balance">
            Plan Your Perfect Journey With AI
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 text-balance leading-relaxed">
            Tell VoyageAI where you want to go, what you love, and how much you want to spend. Your personal AI travel agent will design the trip.
          </p>

          {/* Quick interactive planning prompt box */}
          <form
            onSubmit={handleQuickSubmit}
            className="mt-8 mx-auto flex max-w-xl flex-col sm:flex-row items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-md"
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <MapPin className="h-5 w-5 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={quickDest}
                onChange={(e) => setQuickDest(e.target.value)}
                placeholder="Where to? (e.g. Goa, Manali, Kerala, Bali...)"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4" />
              <span>✨ Plan My Trip</span>
            </button>
          </form>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartPlanning}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-400 active:scale-95"
            >
              <span>✨ Plan My Trip</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onExplore}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>Explore Destinations</span>
            </button>
          </div>

          {/* Trust proof indicators without pill clutter */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>n8n AI Workflow Ready</span>
            </div>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span>Day-by-Day Precision Timeline</span>
            </div>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Live INR Budget Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
