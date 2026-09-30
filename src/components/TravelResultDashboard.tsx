import React, { useState } from 'react';
import {
  Sparkles,
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Clock,
  CheckSquare,
  Square,
  Plus,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Share2,
  Printer,
  ChevronDown,
  Info,
  Utensils,
  Check,
  AlertTriangle,
  Send,
} from 'lucide-react';
import { TravelPlanResult, PackingItem } from '../types/travel';
import { applyPlanModification } from '../services/planGenerator';
import { saveTrip } from '../services/storageService';

interface TravelResultDashboardProps {
  plan: TravelPlanResult;
  onPlanUpdated: (updatedPlan: TravelPlanResult) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  onPlanNewTrip: () => void;
}

export const TravelResultDashboard: React.FC<TravelResultDashboardProps> = ({
  plan,
  onPlanUpdated,
  onShowToast,
  onPlanNewTrip,
}) => {
  const [packingList, setPackingList] = useState<PackingItem[]>(plan.packingList);
  const [newPackingInput, setNewPackingInput] = useState('');
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeDayFilter, setActiveDayFilter] = useState<number | 'all'>('all');

  // Sync state if plan prop changes
  React.useEffect(() => {
    setPackingList(plan.packingList);
  }, [plan]);

  const togglePackingItem = (id: string) => {
    const updated = packingList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPackingList(updated);
    onPlanUpdated({ ...plan, packingList: updated });
  };

  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingInput.trim()) return;

    const newItem: PackingItem = {
      id: `custom-pk-${Date.now()}`,
      label: newPackingInput.trim(),
      category: 'Essentials',
      checked: false,
    };
    const updated = [newItem, ...packingList];
    setPackingList(updated);
    setNewPackingInput('');
    onPlanUpdated({ ...plan, packingList: updated });
    onShowToast(`Added "${newItem.label}" to your packing list`, 'info');
  };

  const handleSaveToMyTrips = () => {
    saveTrip(plan);
    setIsSaved(true);
    onShowToast(`Trip to ${plan.route.destination} saved to My Trips!`, 'success');
  };

  const handleShareTrip = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Trip itinerary share link copied to clipboard!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleApplyModification = (modKey: string, label: string) => {
    const modified = applyPlanModification(plan, modKey);
    onPlanUpdated(modified);
    saveTrip(modified);
    setIsModifyModalOpen(false);
    onShowToast(`Trip updated: ${label}`, 'success');
  };

  // Budget calculations
  const totalCost = plan.budgetBreakdown.totalEstimatedCost;
  const userBudget = plan.budget;
  const remainingBudget = userBudget - totalCost;
  const budgetRatio = Math.min(100, Math.round((totalCost / userBudget) * 100));

  const isOverBudget = remainingBudget < 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3 w-3" />
            <span>AI Itinerary Ready · {plan.source === 'n8n_webhook' ? 'n8n Webhook Verified' : 'VoyageAI Engine'}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            ✨ Your Personalized Trip
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            {plan.summaryBio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsModifyModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>🔄 Modify My Trip</span>
          </button>

          <button
            onClick={handleSaveToMyTrips}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              isSaved
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            <span>{isSaved ? 'Trip Saved' : 'Save Trip'}</span>
          </button>

          <button
            onClick={handleShareTrip}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy Share Link"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={handlePrint}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Print Itinerary"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Applied Modifications notices if any */}
      {plan.appliedModifications && plan.appliedModifications.length > 0 && (
        <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-300 mb-1.5">
            Active Modifications
          </p>
          <div className="space-y-1">
            {plan.appliedModifications.map((mod, idx) => (
              <p key={idx} className="text-xs text-teal-200 flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                <span>{mod}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 4 SUMMARY CARDS: Route, Duration, Travelers, Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 📍 Route */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">📍 Route</p>
              <h4 className="text-base font-bold text-white truncate max-w-[170px]">
                {plan.route.from} ➔ {plan.route.destination}
              </h4>
            </div>
          </div>
        </div>

        {/* 📅 Duration */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">📅 Duration</p>
              <h4 className="text-base font-bold text-white tabular-nums">
                {plan.duration} Days · {Math.max(1, plan.duration - 1)} Nights
              </h4>
            </div>
          </div>
        </div>

        {/* 👥 Travelers */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">👥 Travelers</p>
              <h4 className="text-base font-bold text-white tabular-nums">
                {plan.travelers} {plan.travelers > 1 ? 'Travelers' : 'Traveler'} · {plan.travelType}
              </h4>
            </div>
          </div>
        </div>

        {/* 💰 Budget */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">💰 Budget</p>
              <h4 className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                ₹{plan.budget.toLocaleString('en-IN')}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: ✈️ FLIGHT PLAN & 🏨 HOTEL PLAN (Side by Side Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✈️ FLIGHT PLAN */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">✈️ Flight Plan</h3>
                <p className="text-xs text-slate-400">Scheduled air route & connection guidelines</p>
              </div>
            </div>
            <span className="rounded-lg border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-slate-300">
              Estimated
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-start justify-between text-xs">
                <span className="text-slate-400 font-medium">Departure Route:</span>
                <span className="text-white font-semibold text-right">{plan.flightPlan.departure}</span>
              </div>
              <div className="flex items-start justify-between text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-400 font-medium">Return Route:</span>
                <span className="text-white font-semibold text-right">{plan.flightPlan.return}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <span className="text-slate-400 block">Suggested Airlines</span>
                <span className="text-white font-semibold mt-0.5 block">{plan.flightPlan.airline}</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <span className="text-slate-400 block">Estimated Flight Total</span>
                <span className="font-mono text-emerald-400 font-bold text-sm mt-0.5 block tabular-nums">
                  ₹{plan.flightPlan.estimatedCost.toLocaleString('en-IN')} (Estimated)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-slate-950/80 p-3 text-xs text-slate-400 border border-slate-800/80">
              <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{plan.flightPlan.travelNotes}</span>
            </div>
          </div>
        </div>

        {/* 🏨 HOTEL PLAN */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Hotel className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">🏨 Hotel Plan</h3>
                <p className="text-xs text-slate-400">Handpicked stays & neighborhood recommendation</p>
              </div>
            </div>
            <span className="rounded-lg border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-slate-300">
              Estimated
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Recommended Area:</span>
                <span className="text-white font-semibold">{plan.hotelPlan.recommendedArea}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-400 font-medium">Hotel Category:</span>
                <span className="text-emerald-400 font-semibold">{plan.hotelPlan.hotelCategory}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-400 font-medium">Suggested Property:</span>
                <span className="text-white font-semibold">{plan.hotelPlan.suggestedHotelName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <span className="text-slate-400 block">Duration of Stay</span>
                <span className="text-white font-semibold mt-0.5 block tabular-nums">
                  {plan.hotelPlan.numberOfNights} Nights
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <span className="text-slate-400 block">Estimated Stay Total</span>
                <span className="font-mono text-emerald-400 font-bold text-sm mt-0.5 block tabular-nums">
                  ₹{plan.hotelPlan.estimatedCost.toLocaleString('en-IN')} (Estimated)
                </span>
              </div>
            </div>

            {/* Key amenities */}
            <div className="rounded-xl bg-slate-950/80 p-3 text-xs text-slate-300 border border-slate-800/80">
              <span className="text-slate-400 block mb-1.5 font-medium">Key Highlights & Amenities:</span>
              <div className="flex flex-wrap gap-1.5">
                {plan.hotelPlan.amenities.map((am, i) => (
                  <span key={i} className="rounded-md bg-slate-800/90 px-2 py-0.5 text-[11px] text-slate-300">
                    ✓ {am}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 🗺️ PLACES TO VISIT */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              🗺️ Places To Visit
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Top curated landmarks, scenic viewpoints, and heritage sights in {plan.route.destination}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plan.placesToVisit.map((place) => (
            <div
              key={place.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-emerald-400 font-medium">{place.category}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {place.highlightTag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {place.name}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {place.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span>{place.suggestedDuration}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-300 font-medium">{place.bestTimeToVisit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 📅 DAY-BY-DAY ITINERARY TIMELINE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              📅 Day-By-Day Itinerary
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Balanced pacing divided into Morning, Afternoon, and Evening blocks
            </p>
          </div>

          {/* Day Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveDayFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeDayFilter === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Days
            </button>
            {plan.itinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDayFilter(d.day)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeDayFilter === d.day
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {plan.itinerary
            .filter((d) => activeDayFilter === 'all' || activeDayFilter === d.day)
            .map((dayItem) => (
              <div
                key={dayItem.day}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm space-y-6"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-display font-extrabold text-lg tabular-nums">
                      {dayItem.day}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">
                        {dayItem.title}
                      </h4>
                      <p className="text-xs text-slate-400">{dayItem.theme}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    Day {dayItem.day} of {plan.duration}
                  </span>
                </div>

                {/* 3 Slots: Morning, Afternoon, Evening */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Morning */}
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                      <span>🌅 Morning</span>
                      <span className="text-slate-500 font-mono text-[11px]">08:30 – 12:30</span>
                    </div>
                    <h5 className="font-semibold text-white text-sm">
                      {dayItem.morning.activity}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {dayItem.morning.description}
                    </p>
                    {dayItem.morning.insiderTip && (
                      <div className="pt-2 text-[11px] text-emerald-400/90 flex items-start gap-1.5 border-t border-slate-900">
                        <span className="shrink-0">💡</span>
                        <span>{dayItem.morning.insiderTip}</span>
                      </div>
                    )}
                  </div>

                  {/* Afternoon */}
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-teal-400 font-semibold uppercase tracking-wider">
                      <span>☀️ Afternoon</span>
                      <span className="text-slate-500 font-mono text-[11px]">13:00 – 17:00</span>
                    </div>
                    <h5 className="font-semibold text-white text-sm">
                      {dayItem.afternoon.activity}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {dayItem.afternoon.description}
                    </p>
                    {dayItem.afternoon.insiderTip && (
                      <div className="pt-2 text-[11px] text-emerald-400/90 flex items-start gap-1.5 border-t border-slate-900">
                        <span className="shrink-0">💡</span>
                        <span>{dayItem.afternoon.insiderTip}</span>
                      </div>
                    )}
                  </div>

                  {/* Evening */}
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                      <span>🌙 Evening</span>
                      <span className="text-slate-500 font-mono text-[11px]">17:30 – 21:30</span>
                    </div>
                    <h5 className="font-semibold text-white text-sm">
                      {dayItem.evening.activity}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {dayItem.evening.description}
                    </p>
                    {dayItem.evening.insiderTip && (
                      <div className="pt-2 text-[11px] text-emerald-400/90 flex items-start gap-1.5 border-t border-slate-900">
                        <span className="shrink-0">💡</span>
                        <span>{dayItem.evening.insiderTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* SECTION 4: 💰 SMART BUDGET BREAKDOWN */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              💰 Smart Budget Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Visual allocation compared against your target budget in Indian Rupees
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Estimated Cost</span>
            <span className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
              ₹{totalCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">
              Budget Utilization: <span className="font-mono text-emerald-400">{budgetRatio}%</span>
            </span>
            <span className={isOverBudget ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
              {isOverBudget
                ? `Exceeds Target by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`
                : `Remaining Buffer: ₹${remainingBudget.toLocaleString('en-IN')}`}
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full transition-all duration-500 ${
                isOverBudget
                  ? 'bg-rose-500'
                  : budgetRatio > 85
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
              style={{ width: `${Math.min(100, budgetRatio)}%` }}
            />
          </div>
        </div>

        {/* Detailed Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: '✈️ Flights / Transit', amount: plan.budgetBreakdown.flights },
            { label: '🏨 Hotels & Stays', amount: plan.budgetBreakdown.hotels },
            { label: '🍴 Dining & Food', amount: plan.budgetBreakdown.food },
            { label: '🚗 Local Transport', amount: plan.budgetBreakdown.localTransport },
            { label: '🎟️ Activities & Misc', amount: plan.budgetBreakdown.activities + plan.budgetBreakdown.miscellaneous },
          ].map((cat, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <span className="text-xs text-slate-400 block font-medium">{cat.label}</span>
              <span className="font-mono text-base font-bold text-white mt-1 block tabular-nums">
                ₹{cat.amount.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                {Math.round((cat.amount / Math.max(1, totalCost)) * 100)}% of total
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: 🎒 AI PACKING LIST & 🍴 LOCAL FOOD GUIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🎒 AI PACKING LIST */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <h3 className="font-display text-lg font-bold text-white">🎒 AI Packing List</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {packingList.filter((p) => p.checked).length} of {packingList.length} packed
            </span>
          </div>

          {/* Add custom item form */}
          <form onSubmit={handleAddPackingItem} className="flex gap-2">
            <input
              type="text"
              value={newPackingInput}
              onChange={(e) => setNewPackingInput(e.target.value)}
              placeholder="Add item (e.g. Swim goggles, Camera tripod)..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Items list */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {packingList.map((item) => (
              <div
                key={item.id}
                onClick={() => togglePackingItem(item.id)}
                className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors ${
                  item.checked
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-slate-300'
                    : 'border-slate-800/80 bg-slate-950/60 text-white hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.checked ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-500 shrink-0" />
                  )}
                  <span className={`text-xs ${item.checked ? 'line-through text-slate-400' : ''}`}>
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🍴 LOCAL FOOD GUIDE */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display text-lg font-bold text-white">🍴 Local Food Guide</h3>
            <span className="text-xs text-slate-400">{plan.route.destination} Flavors</span>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {/* Signature Dishes */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Regional Specialties & Street Fare
              </p>
              <div className="space-y-2">
                {plan.foodGuide.localDishes.map((dish, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{dish.name}</span>
                      {dish.spot && (
                        <span className="text-[11px] text-emerald-400 font-medium">📍 {dish.spot}</span>
                      )}
                    </div>
                    <p className="text-slate-400 mt-1">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vegetarian Options */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
                🌱 Pure Vegetarian Highlights
              </p>
              <div className="space-y-2">
                {plan.foodGuide.vegetarianOptions.map((veg, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
                    <span className="font-bold text-white">{veg.name}</span>
                    <p className="text-slate-400 mt-1">{veg.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget vs Premium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <span className="text-xs text-amber-400 font-semibold block mb-1">
                  Budget Food Suggestions
                </span>
                {plan.foodGuide.budgetFoodSuggestions.slice(0, 2).map((b, i) => (
                  <div key={i} className="text-xs text-slate-300 mt-1">
                    <div className="font-medium text-white">{b.name}</div>
                    <span className="text-[11px] text-slate-500 font-mono">{b.priceRange}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <span className="text-xs text-indigo-400 font-semibold block mb-1">
                  Premium Food Suggestions
                </span>
                {plan.foodGuide.premiumFoodSuggestions.slice(0, 2).map((p, i) => (
                  <div key={i} className="text-xs text-slate-300 mt-1">
                    <div className="font-medium text-white">{p.name}</div>
                    <span className="text-[11px] text-slate-500 font-mono">{p.priceRange}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PROMINENT RE-PLAN BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 p-6 sm:p-8 backdrop-blur-md gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-white">
            Need adjustments or a different destination?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Modify any aspect of this trip or launch a new AI travel planning session.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModifyModalOpen(true)}
            className="rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/25 hover:bg-emerald-400 transition-all whitespace-nowrap"
          >
            🔄 Modify My Trip
          </button>
          <button
            onClick={onPlanNewTrip}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            Plan Another Trip
          </button>
        </div>
      </div>

      {/* 🔄 MODIFY MY TRIP MODAL */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">🔄 Modify My Trip</h3>
                <p className="text-xs text-slate-400">Select how you'd like VoyageAI to reshape your trip</p>
              </div>
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'make_cheaper', label: '💰 Make it cheaper', desc: 'Optimize hotel stays, transport & dining costs' },
                { id: 'upgrade_hotels', label: '🏨 Upgrade hotels', desc: 'Elevate to 5-star luxury resorts & suites' },
                { id: 'add_more_adventure', label: '🎢 Add more adventure', desc: 'Inject thrilling outdoor trails & water sports' },
                { id: 'add_more_beaches', label: '🏖️ Add more beaches', desc: 'Incorporate hidden coastal bays & sunset coves' },
                { id: 'add_more_food', label: '🍴 Add more food experiences', desc: 'Add chef tasting menus & heritage food trails' },
                { id: 'add_photography', label: '📸 Add photography spots', desc: 'Prioritize golden-hour viewpoints & vistas' },
                { id: 'make_relaxing', label: '😌 Make it more relaxing', desc: 'Add lazy afternoon spa and leisure hours' },
                { id: 'change_duration', label: '📅 Change trip duration', desc: 'Extend trip by adding an extra day' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleApplyModification(opt.id, opt.label)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 text-left hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="font-semibold text-white text-xs group-hover:text-emerald-300">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              Selected modifications update the plan and prepare payloads ready for the n8n AI webhook.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
