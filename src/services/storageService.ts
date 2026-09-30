import { TravelPlanResult } from '../types/travel';
import { generateContextualPlan } from './planGenerator';

const STORAGE_KEY_TRIPS = 'voyageai_user_saved_trips';

/**
 * Default sample trip to demonstrate the "My Trips" dashboard on first visit
 */
const SAMPLE_INITIAL_TRIP: TravelPlanResult = {
  ...generateContextualPlan({
    from: "Hyderabad",
    destination: "Goa",
    days: 3,
    travelers: 2,
    travelType: "Friends",
    budget: 35000,
    preferences: ["Beach Lover", "Foodie", "Adventure Seeker"],
    message: "I want beaches, adventure activities, local food and beautiful photography spots.",
  }),
  id: "sample-trip-goa-1",
  status: "Planned",
};

export function getSavedTrips(): TravelPlanResult[] {
  if (typeof window === 'undefined') return [SAMPLE_INITIAL_TRIP];

  try {
    const data = localStorage.getItem(STORAGE_KEY_TRIPS);
    if (!data) {
      // Seed with initial sample
      localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify([SAMPLE_INITIAL_TRIP]));
      return [SAMPLE_INITIAL_TRIP];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [SAMPLE_INITIAL_TRIP];
  } catch (e) {
    console.error('Failed to load trips from localStorage:', e);
    return [SAMPLE_INITIAL_TRIP];
  }
}

export function saveTrip(trip: TravelPlanResult): TravelPlanResult[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getSavedTrips();
    // Check if updating existing
    const index = existing.findIndex((t) => t.id === trip.id);
    let updated: TravelPlanResult[];

    if (index >= 0) {
      updated = [...existing];
      updated[index] = trip;
    } else {
      updated = [trip, ...existing];
    }

    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save trip to localStorage:', e);
    return [];
  }
}

export function deleteTrip(tripId: string): TravelPlanResult[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getSavedTrips();
    const updated = existing.filter((t) => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete trip:', e);
    return [];
  }
}
