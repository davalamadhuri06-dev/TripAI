import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, ArrowRight, Heart } from 'lucide-react';
import { travelImages } from '../assets/images';

interface ExploreSectionProps {
  onPlanForDestination: (destName: string) => void;
}

interface ExploreDestination {
  id: string;
  name: string;
  stateCountry: string;
  category: 'Beaches' | 'Mountains' | 'Nature' | 'Historical' | 'Food' | 'Adventure';
  categoryEmoji: string;
  image: string;
  highlight: string;
  idealDays: number;
  estBudget: string;
  tags: string[];
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ onPlanForDestination }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'All', label: 'All Destinations', emoji: '✨' },
    { id: 'Beaches', label: 'Beaches', emoji: '🏖️' },
    { id: 'Mountains', label: 'Mountains', emoji: '🏔️' },
    { id: 'Nature', label: 'Nature', emoji: '🌿' },
    { id: 'Historical', label: 'Historical', emoji: '🏛️' },
    { id: 'Food', label: 'Food', emoji: '🍴' },
    { id: 'Adventure', label: 'Adventure', emoji: '🎢' },
  ];

  const destinations: ExploreDestination[] = [
    {
      id: 'dest-goa',
      name: 'Goa',
      stateCountry: 'India · Coastal West',
      category: 'Beaches',
      categoryEmoji: '🏖️',
      image: travelImages.beach,
      highlight: 'Golden sandy shores, Portuguese heritage villas, and beach shacks with fresh seafood.',
      idealDays: 4,
      estBudget: '₹25,000 – ₹45,000',
      tags: ['Water Sports', 'Sunset Shacks', 'Night Markets'],
    },
    {
      id: 'dest-manali',
      name: 'Manali & Solang Valley',
      stateCountry: 'Himachal Pradesh · Western Himalayas',
      category: 'Mountains',
      categoryEmoji: '🏔️',
      image: travelImages.mountains,
      highlight: 'Snow-capped peaks, pine forests, Jogini falls trails, and high-altitude paragliding.',
      idealDays: 5,
      estBudget: '₹22,000 – ₹38,000',
      tags: ['Paragliding', 'Apple Orchards', 'Atal Tunnel'],
    },
    {
      id: 'dest-jaipur',
      name: 'Jaipur & Amer',
      stateCountry: 'Rajasthan · Royal Heritage',
      category: 'Historical',
      categoryEmoji: '🏛️',
      image: travelImages.heritage,
      highlight: 'Palatial hilltop fortresses, Sheesh Mahal mirror halls, and artisan block-print bazaars.',
      idealDays: 3,
      estBudget: '₹18,000 – ₹32,000',
      tags: ['Amer Fort', 'Hawa Mahal', 'Dal Baati Churma'],
    },
    {
      id: 'dest-kerala',
      name: 'Kerala Backwaters & Munnar',
      stateCountry: 'South India · God\'s Own Country',
      category: 'Nature',
      categoryEmoji: '🌿',
      image: travelImages.hero,
      highlight: 'Tranquil palm-fringed houseboats, rolling tea estates, and authentic Ayurvedic therapies.',
      idealDays: 5,
      estBudget: '₹28,000 – ₹50,000',
      tags: ['Alleppey Cruise', 'Tea Estates', 'Kathakali Art'],
    },
    {
      id: 'dest-leh',
      name: 'Leh Ladakh',
      stateCountry: 'Ladakh · Trans-Himalayas',
      category: 'Adventure',
      categoryEmoji: '🎢',
      image: travelImages.mountains,
      highlight: 'High mountain passes (Khardung La), sapphire Pangong Tso lake, and ancient Buddhist gompas.',
      idealDays: 6,
      estBudget: '₹35,000 – ₹65,000',
      tags: ['Motorcycle Expedition', 'Pangong Lake', 'Nubra Dunes'],
    },
    {
      id: 'dest-amritsar',
      name: 'Amritsar Culinary & Heritage',
      stateCountry: 'Punjab · North India',
      category: 'Food',
      categoryEmoji: '🍴',
      image: travelImages.heritage,
      highlight: 'Golden Temple serenity and the world\'s most legendary kulchas, lassi, and tandoori grills.',
      idealDays: 2,
      estBudget: '₹12,000 – ₹20,000',
      tags: ['Amritsari Kulcha', 'Golden Temple', 'Wagah Border'],
    },
  ];

  const filtered = destinations.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedFavorites.includes(id)) {
      setSavedFavorites(savedFavorites.filter((f) => f !== id));
    } else {
      setSavedFavorites([...savedFavorites, id]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          <Compass className="h-3.5 w-3.5" />
          <span>Curated Travel Inspiration</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explore Trending Destinations
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Browse top-rated travel havens. Select any spot to automatically start planning with VoyageAI.
        </p>
      </div>

      {/* Category Pills / Filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl"
          >
            {/* Image Banner */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Category pill */}
              <div className="absolute top-4 left-4 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
                <span>{item.categoryEmoji}</span>
                <span>{item.category}</span>
              </div>

              {/* Favorite Heart Button */}
              <button
                onClick={(e) => toggleFavorite(item.id, e)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                aria-label="Save to favorites"
              >
                <Heart
                  className={`h-4 w-4 ${
                    savedFavorites.includes(item.id)
                      ? 'fill-rose-500 text-rose-500'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{item.stateCountry}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.highlight}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Est. Budget</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {item.estBudget}
                  </span>
                </div>
                <button
                  onClick={() => onPlanForDestination(item.name)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Plan Trip Here</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
