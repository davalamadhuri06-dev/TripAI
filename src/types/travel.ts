export interface GroupTraveler {
  id: string;
  name: string;
  preference: string;
}

export interface TripFormInputs {
  from: string;
  destination: string;
  days: number;
  travelers: number;
  travelType: 'Solo' | 'Couple' | 'Friends' | 'Family';
  budget: number;
  preferences: string[];
  message: string;
  groupPreferences?: GroupTraveler[];
}

export interface FlightPlan {
  departure: string;
  return: string;
  airline: string;
  flightType: 'Direct' | '1 Stop' | 'Scenic Train / Flight';
  estimatedCost: number;
  duration: string;
  travelNotes: string;
}

export interface HotelPlan {
  recommendedArea: string;
  hotelCategory: string;
  suggestedHotelName: string;
  numberOfNights: number;
  estimatedCost: number;
  amenities: string[];
  vibe: string;
}

export interface PlaceToVisit {
  id: string;
  name: string;
  shortDescription: string;
  suggestedDuration: string;
  bestTimeToVisit: string;
  category: string;
  highlightTag: string;
}

export interface TimelineSlot {
  activity: string;
  description: string;
  insiderTip?: string;
  location?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  theme: string;
  morning: TimelineSlot;
  afternoon: TimelineSlot;
  evening: TimelineSlot;
}

export interface BudgetBreakdown {
  flights: number;
  hotels: number;
  food: number;
  localTransport: number;
  activities: number;
  miscellaneous: number;
  totalEstimatedCost: number;
  userBudget: number;
  currency: string;
}

export interface PackingItem {
  id: string;
  label: string;
  category: 'Essentials' | 'Clothing' | 'Tech & Gear' | 'Health & Care';
  checked: boolean;
}

export interface FoodDish {
  name: string;
  description: string;
  spot?: string;
  priceNote?: string;
  priceRange?: string;
}

export interface LocalFoodGuide {
  localDishes: FoodDish[];
  vegetarianOptions: FoodDish[];
  budgetFoodSuggestions: FoodDish[];
  premiumFoodSuggestions: FoodDish[];
}

export interface TravelPlanResult {
  id: string;
  createdAt: string;
  route: {
    from: string;
    destination: string;
  };
  duration: number;
  travelers: number;
  travelType: 'Solo' | 'Couple' | 'Friends' | 'Family';
  budget: number;
  preferences: string[];
  summaryHeadline: string;
  summaryBio: string;
  flightPlan: FlightPlan;
  hotelPlan: HotelPlan;
  placesToVisit: PlaceToVisit[];
  itinerary: DayItinerary[];
  budgetBreakdown: BudgetBreakdown;
  packingList: PackingItem[];
  foodGuide: LocalFoodGuide;
  groupPreferences?: GroupTraveler[];
  appliedModifications?: string[];
  status?: 'Planned' | 'In Progress' | 'Completed';
  source?: 'n8n_webhook' | 'ai_simulation';
}
