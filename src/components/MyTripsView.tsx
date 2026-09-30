import React from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Trash2,
  Eye,
  RefreshCw,
  Plus,
  Sparkles,
} from 'lucide-react';
import { TravelPlanResult } from '../types/travel';
import { deleteTrip } from '../services/storageService';

interface MyTripsViewProps {
  trips: TravelPlanResult[];
  onSelectTrip: (trip: TravelPlanResult) => void;
  onModifyTrip: (trip: TravelPlanResult) => void;
  onTripsChanged: (updatedTrips: TravelPlanResult[]) => void;
  onPlanNewTrip: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  trips,
  onSelectTrip,
  onModifyTrip,
  onTripsChanged,
  onPlanNewTrip,
  onShowToast,
}) => {
  const handleDelete = (tripId: string, dest: string) => {
    if (confirm(`Are you sure you want to delete your planned trip to ${dest}?`)) {
      const updated = deleteTrip(tripId);
      onTripsChanged(updated);
      onShowToast(`Deleted trip to ${dest}`, 'info');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Browser LocalStorage Sync</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white">
            My Saved Trips ({trips.length})
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Your saved itineraries, flight plans, and budget forecasts stored securely on this device.
          </p>
        </div>

        <button
          onClick={onPlanNewTrip}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Trips list */}
      {trips.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center max-w-md mx-auto">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
            <Compass className="h-7 w-7" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">No trips saved yet</h3>
          <p className="mt-1 text-xs text-slate-400">
            Use VoyageAI to craft your first personalized itinerary and save it for offline review.
          </p>
          <button
            onClick={onPlanNewTrip}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Planning</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const statusColor =
              trip.status === 'Completed'
                ? 'bg-slate-800 text-slate-300'
                : trip.status === 'In Progress'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';

            return (
              <div
                key={trip.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {trip.createdAt}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${statusColor}`}>
                      {trip.status || 'Planned'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{trip.route.from} ➔</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
                    {trip.route.destination}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {trip.summaryHeadline}
                  </p>

                  {/* Metadata grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5 rounded-2xl bg-slate-950/70 p-3 text-xs border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                      <span className="tabular-nums">{trip.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{trip.travelers} {trip.travelers > 1 ? 'Travelers' : 'Traveler'}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between pt-1 border-t border-slate-900 text-slate-300">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Wallet className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>Est. Budget:</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold tabular-nums">
                        ₹{trip.budgetBreakdown.totalEstimatedCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Preferences chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {trip.preferences.slice(0, 3).map((p, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions: View Trip, Modify, Delete */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectTrip(trip)}
                      className="flex items-center gap-1 rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Trip</span>
                    </button>
                    <button
                      onClick={() => onModifyTrip(trip)}
                      className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                      title="Modify Trip Parameters"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Modify</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(trip.id, trip.route.destination)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Delete Trip"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
