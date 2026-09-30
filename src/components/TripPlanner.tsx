import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { TripFormInputs, GroupTraveler } from '../types/travel';

interface TripPlannerProps {
  initialDestination?: string;
  onSubmit: (inputs: TripFormInputs) => void;
  isLoading: boolean;
}

const POPULAR_FROM_CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
const POPULAR_DESTINATIONS = ['Goa', 'Manali', 'Kerala', 'Jaipur', 'Leh Ladakh', 'Bali', 'Dubai', 'Kashmir', 'Andaman'];

const TRAVEL_PERSONALITIES = [
  { id: 'Beach Lover', emoji: '🏖️', desc: 'Golden sands, ocean dips & sunset coastal shacks' },
  { id: 'Nature Explorer', emoji: '🏔️', desc: 'Pristine peaks, lush pine valleys & tranquil rivers' },
  { id: 'Adventure Seeker', emoji: '🎢', desc: 'Rafting, paragliding, treks & adrenaline rushes' },
  { id: 'Foodie', emoji: '🍴', desc: 'Street food delicacies, regional curries & culinary tours' },
  { id: 'Photographer', emoji: '📸', desc: 'Golden-hour architecture, scenic views & photowalks' },
  { id: 'History Lover', emoji: '🏛️', desc: 'Centuries-old forts, royal palaces & ancient ruins' },
  { id: 'Relaxed Traveler', emoji: '😌', desc: 'Slow mornings, luxury spas & peaceful hammocks' },
  { id: 'Shopping Lover', emoji: '🛍️', desc: 'Artisan bazaars, authentic textiles & boutique crafts' },
];

export const TripPlanner: React.FC<TripPlannerProps> = ({
  initialDestination = '',
  onSubmit,
  isLoading,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [from, setFrom] = useState('Hyderabad');
  const [destination, setDestination] = useState(initialDestination || 'Goa');
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [travelType, setTravelType] = useState<'Solo' | 'Couple' | 'Friends' | 'Family'>('Friends');
  const [budget, setBudget] = useState(35000);
  const [preferences, setPreferences] = useState<string[]>(['Beach Lover', 'Foodie', 'Adventure Seeker']);
  const [message, setMessage] = useState(
    'I want beaches, adventure activities, local food and beautiful photography spots.'
  );

  // Group trip mode state
  const [isGroupModeEnabled, setIsGroupModeEnabled] = useState(false);
  const [groupTravelers, setGroupTravelers] = useState<GroupTraveler[]>([
    { id: 'gt-1', name: 'Traveler 1', preference: 'Adventure' },
    { id: 'gt-2', name: 'Traveler 2', preference: 'Food' },
    { id: 'gt-3', name: 'Traveler 3', preference: 'Sightseeing' },
  ]);

  const [formError, setFormError] = useState<string | null>(null);

  // Update destination if passed from prop (e.g. from Explore page)
  React.useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter((p) => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleNextStep = () => {
    setFormError(null);
    if (currentStep === 1 && !from.trim()) {
      setFormError('Please enter your starting city.');
      return;
    }
    if (currentStep === 2 && !destination.trim()) {
      setFormError('Please enter where you want to travel.');
      return;
    }
    if (currentStep === 3 && (days < 1 || days > 30)) {
      setFormError('Trip duration must be between 1 and 30 days.');
      return;
    }
    if (currentStep === 5 && budget < 5000) {
      setFormError('Please enter a budget of at least ₹5,000 INR.');
      return;
    }
    if (currentStep === 6 && preferences.length === 0) {
      setFormError('Please select at least one travel personality card.');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setFormError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!from.trim()) {
      setCurrentStep(1);
      setFormError('Please provide your departure city.');
      return;
    }
    if (!destination.trim()) {
      setCurrentStep(2);
      setFormError('Please provide your destination.');
      return;
    }

    const payload: TripFormInputs = {
      from: from.trim(),
      destination: destination.trim(),
      days: Number(days),
      travelers: Number(travelers),
      travelType,
      budget: Number(budget),
      preferences,
      message: message.trim(),
      groupPreferences: isGroupModeEnabled ? groupTravelers : undefined,
    };

    onSubmit(payload);
  };

  const addGroupTraveler = () => {
    const nextNum = groupTravelers.length + 1;
    setGroupTravelers([
      ...groupTravelers,
      { id: `gt-${Date.now()}`, name: `Traveler ${nextNum}`, preference: 'Sightseeing' },
    ]);
  };

  const removeGroupTraveler = (id: string) => {
    if (groupTravelers.length <= 1) return;
    setGroupTravelers(groupTravelers.filter((gt) => gt.id !== id));
  };

  const updateGroupTraveler = (id: string, field: 'name' | 'preference', value: string) => {
    setGroupTravelers(
      groupTravelers.map((gt) => (gt.id === id ? { ...gt, [field]: value } : gt))
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>VoyageAI Multi-Step Travel Planner</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Design Your Tailored Itinerary
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Configure your preferences and our AI Agent will orchestrate flights, stays, routes & activities.
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span className="text-emerald-400 font-mono">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step icons bar */}
        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {[
            { num: 1, label: 'Origin' },
            { num: 2, label: 'Destination' },
            { num: 3, label: 'Days' },
            { num: 4, label: 'Group' },
            { num: 5, label: 'Budget' },
            { num: 6, label: 'Vibe' },
            { num: 7, label: 'Details' },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`py-1 text-[11px] rounded-lg transition-colors ${
                currentStep === s.num
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : currentStep > s.num
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.num}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Form Card */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        {formError && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Origin */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 1</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Where are you travelling from?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Specify your departure city for flight and transit schedules.
                </p>
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. Hyderabad, Mumbai, Delhi, Bengaluru..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 py-4 pl-12 pr-4 text-base text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-2 font-medium">Quick Suggestions:</span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_FROM_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setFrom(city)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        from === city
                          ? 'border border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Destination */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 2</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Where do you want to go?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Name any dream destination, beach haven, or mountain escape.
                </p>
              </div>

              <div className="relative">
                <Compass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Goa, Manali, Kerala, Jaipur, Bali, Kashmir..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 py-4 pl-12 pr-4 text-base text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-2 font-medium">Trending Destinations:</span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setDestination(dest)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        destination.toLowerCase() === dest.toLowerCase()
                          ? 'border border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Days */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 3</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  How long is your trip?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Select the duration in days for your day-by-day plan.
                </p>
              </div>

              <div className="flex items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="h-12 w-12 rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700"
                  >
                    -
                  </button>
                  <div className="text-center min-w-[120px]">
                    <span className="font-display text-5xl font-extrabold text-emerald-400 tabular-nums">
                      {days}
                    </span>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">
                      {days === 1 ? 'Day' : 'Days'} ({Math.max(1, days - 1)} {days === 2 ? 'Night' : 'Nights'})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDays(Math.min(14, days + 1))}
                    className="h-12 w-12 rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 5, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDays(num)}
                    className={`rounded-xl py-2.5 text-xs font-semibold transition-all ${
                      days === num
                        ? 'border border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num} Days
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Travelers & Travel Type */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 4</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Who are you travelling with?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Choose your company to customize hotel room setups and activity pacing.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Solo', label: 'Solo', defaultCount: 1, desc: 'Solo explorer' },
                  { id: 'Couple', label: 'Couple', defaultCount: 2, desc: 'Romantic escape' },
                  { id: 'Friends', label: 'Friends', defaultCount: 3, desc: 'Group fun' },
                  { id: 'Family', label: 'Family', defaultCount: 4, desc: 'Family comfort' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTravelType(item.id as any);
                      if (item.id === 'Solo') setTravelers(1);
                      else if (item.id === 'Couple') setTravelers(2);
                    }}
                    className={`rounded-2xl p-4 text-left border transition-all ${
                      travelType === item.id
                        ? 'border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Number of Travelers Counter */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <div>
                    <span className="text-sm font-medium text-white block">Number of Travelers</span>
                    <span className="text-xs text-slate-400">Used for flight tickets and room allocations</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={travelers <= 1}
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="h-8 w-8 rounded-lg bg-slate-800 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="font-mono text-lg font-bold text-emerald-400 min-w-[24px] text-center tabular-nums">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(20, travelers + 1))}
                    className="h-8 w-8 rounded-lg bg-slate-800 text-sm font-bold text-white hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* GROUP TRIP MODE ACCORDION / TOGGLE */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👥</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Group Trip Mode (Optional)</h4>
                      <p className="text-xs text-slate-400">Balance individual traveler vibes and priorities</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGroupModeEnabled(!isGroupModeEnabled)}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                      isGroupModeEnabled
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-900 text-slate-300'
                    }`}
                  >
                    {isGroupModeEnabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>

                {isGroupModeEnabled && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="text-xs text-emerald-400 font-medium">
                      AI will balance everyone's preferences into the joint schedule.
                    </div>
                    {groupTravelers.map((gt, idx) => (
                      <div key={gt.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={gt.name}
                          onChange={(e) => updateGroupTraveler(gt.id, 'name', e.target.value)}
                          placeholder={`Traveler ${idx + 1}`}
                          className="w-1/3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                        />
                        <select
                          value={gt.preference}
                          onChange={(e) => updateGroupTraveler(gt.id, 'preference', e.target.value)}
                          className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                        >
                          <option value="Adventure">Adventure & Watersports</option>
                          <option value="Food">Culinary & Cafes</option>
                          <option value="Sightseeing">Sightseeing & Culture</option>
                          <option value="Beaches">Beaches & Relaxing</option>
                          <option value="Nightlife">Nightlife & Social</option>
                          <option value="Photography">Photography & Nature</option>
                        </select>
                        {groupTravelers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGroupTraveler(gt.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addGroupTraveler}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 pt-1"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Add Another Traveler</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Budget */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 5</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  What's your budget?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Enter your total target spending in Indian Rupees (₹ INR).
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl font-bold text-emerald-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  placeholder="35000"
                  step="5000"
                  min="5000"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 py-4 pl-12 pr-4 text-2xl font-bold text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 tabular-nums"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[20000, 35000, 60000, 120000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBudget(val)}
                    className={`rounded-xl py-2.5 text-xs font-semibold transition-all ${
                      budget === val
                        ? 'border border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400 flex items-center justify-between">
                <span>Estimated per-person share:</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  ₹{Math.round(budget / Math.max(1, travelers)).toLocaleString('en-IN')} / person
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: Travel Personality Cards */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 6</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  What's your travel personality?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Select all the vibes and activities you want featured in your plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TRAVEL_PERSONALITIES.map((item) => {
                  const isSelected = preferences.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePreference(item.id)}
                      className={`group relative rounded-2xl p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/15 ring-1 ring-emerald-500/50'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.emoji}</span>
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <div className="font-semibold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                        {item.id}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 leading-snug">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-slate-400">
                Selected: <span className="text-emerald-400 font-medium">{preferences.join(', ') || 'None'}</span>
              </div>
            </div>
          )}

          {/* STEP 7: Notes & Submission */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Step 7</p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Tell us what you want from this trip
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Mention special requests, preferred pace, dietary needs, or must-see places.
                </p>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Example: I want beaches, adventure activities, local food and beautiful photography spots."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              {/* Overview summary card before launch */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs">
                <span className="font-semibold text-slate-300 block mb-1">Trip Summary Snapshot:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
                  <div>Route: <span className="text-white font-medium">{from} ➔ {destination}</span></div>
                  <div>Duration: <span className="text-white font-medium">{days} Days</span></div>
                  <div>Travelers: <span className="text-white font-medium">{travelers} ({travelType})</span></div>
                  <div>Budget: <span className="text-emerald-400 font-mono font-medium">₹{budget.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-size-200 px-7 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 fill-slate-950" />
                <span>🤖 Create My AI Trip</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
