import React from 'react';
import { Plane, Hotel, Map, Wallet, Backpack, UtensilsCrossed } from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature?: (featureKey: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'flights',
      icon: Plane,
      title: 'Smart Flight Planning',
      desc: 'Optimal departure timings, estimated realistic fares, and recommended carriers for stress-free connections.',
      accent: 'emerald',
      emoji: '✈️',
    },
    {
      id: 'hotels',
      icon: Hotel,
      title: 'Hotel Planning',
      desc: 'Curated neighborhoods, vetted boutique resorts, per-night estimations, and key amenities matching your vibe.',
      accent: 'teal',
      emoji: '🏨',
    },
    {
      id: 'itinerary',
      icon: Map,
      title: 'Personalized Itinerary',
      desc: 'Day-by-day morning, afternoon, and evening timelines with local insider tips so you never waste a moment.',
      accent: 'cyan',
      emoji: '🗺️',
    },
    {
      id: 'budget',
      icon: Wallet,
      title: 'Budget Optimization',
      desc: 'Transparent INR cost breakdowns across stays, meals, local transit, and experiences with remaining budget tracking.',
      accent: 'amber',
      emoji: '💰',
    },
    {
      id: 'packing',
      icon: Backpack,
      title: 'Smart Packing List',
      desc: 'Weather-ready checklists with gear, tech accessories, medicine, and attire customized to your specific terrain.',
      accent: 'indigo',
      emoji: '🎒',
    },
    {
      id: 'food',
      icon: UtensilsCrossed,
      title: 'Local Food Guide',
      desc: 'Handpicked authentic regional specialties, must-try food spots, vegetarian delights, and street food gems.',
      accent: 'rose',
      emoji: '🍴',
    },
  ];

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Intelligent Travel Suite
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Everything You Need For Your Next Adventure
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            VoyageAI replaces weeks of spreadsheet research with an end-to-end intelligent itinerary engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFeature && onSelectFeature(item.id)}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
                    <span className="text-lg">{item.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
