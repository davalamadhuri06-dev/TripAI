/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { TripPlanner } from './components/TripPlanner';
import { PlanningLoader } from './components/PlanningLoader';
import { TravelResultDashboard } from './components/TravelResultDashboard';
import { ExploreSection } from './components/ExploreSection';
import { MyTripsView } from './components/MyTripsView';
import { AboutSection } from './components/AboutSection';
import { TravelSosModal } from './components/TravelSosModal';
import { WebhookConfigModal } from './components/WebhookConfigModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { TripFormInputs, TravelPlanResult } from './types/travel';
import { sendToN8nWebhook } from './services/n8nService';
import { getSavedTrips, saveTrip } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'planner' | 'explore' | 'trips' | 'about' | 'result'>('home');
  const [activePlan, setActivePlan] = useState<TravelPlanResult | null>(null);
  const [savedTrips, setSavedTrips] = useState<TravelPlanResult[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const [currentPlanningInputs, setCurrentPlanningInputs] = useState<TripFormInputs | null>(null);
  const [plannerDestination, setPlannerDestination] = useState('');

  // Modals
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isWebhookOpen, setIsWebhookOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load saved trips on mount
  useEffect(() => {
    const loaded = getSavedTrips();
    setSavedTrips(loaded);
    // If we have an initial saved trip, set it as active plan default for convenience
    if (loaded.length > 0 && !activePlan) {
      setActivePlan(loaded[0]);
    }
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handler for trip form submission
  const handleTripSubmit = async (inputs: TripFormInputs) => {
    setCurrentPlanningInputs(inputs);
    setIsPlanning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await sendToN8nWebhook(inputs);
      setActivePlan(response.plan);
      saveTrip(response.plan);
      setSavedTrips(getSavedTrips());
      setIsPlanning(false);
      setActiveTab('result');

      if (response.isRealWebhook) {
        showToast('Trip generated directly via n8n AI Agent!', 'success');
      } else {
        showToast(`AI Trip planned for ${inputs.destination}!`, 'success');
      }
    } catch (err) {
      console.error(err);
      setIsPlanning(false);
      showToast('Encountered an issue planning trip. Please try again.', 'warning');
    }
  };

  const handlePlanForDestination = (destName: string) => {
    setPlannerDestination(destName);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickHeroSearch = (destName: string) => {
    setPlannerDestination(destName);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSavedTrip = (trip: TravelPlanResult) => {
    setActivePlan(trip);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Viewing planned trip to ${trip.route.destination}`, 'info');
  };

  const handleModifySavedTrip = (trip: TravelPlanResult) => {
    setPlannerDestination(trip.route.destination);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanUpdated = (updatedPlan: TravelPlanResult) => {
    setActivePlan(updatedPlan);
    saveTrip(updatedPlan);
    setSavedTrips(getSavedTrips());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab === 'result' ? 'planner' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSosModal={() => setIsSosOpen(true)}
        openWebhookModal={() => setIsWebhookOpen(true)}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Planning Loader if currently generating */}
        {isPlanning && currentPlanningInputs && (
          <div className="py-12">
            <PlanningLoader
              destination={currentPlanningInputs.destination}
              from={currentPlanningInputs.from}
            />
          </div>
        )}

        {/* HOME TAB */}
        {!isPlanning && activeTab === 'home' && (
          <div>
            <Hero
              onStartPlanning={() => {
                setActiveTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplore={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickSearch={handleQuickHeroSearch}
            />
            <FeaturesSection
              onSelectFeature={(featId) => {
                setActiveTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* PLAN A TRIP TAB */}
        {!isPlanning && activeTab === 'planner' && (
          <TripPlanner
            initialDestination={plannerDestination}
            onSubmit={handleTripSubmit}
            isLoading={isPlanning}
          />
        )}

        {/* TRIP RESULT DASHBOARD TAB */}
        {!isPlanning && activeTab === 'result' && activePlan && (
          <TravelResultDashboard
            plan={activePlan}
            onPlanUpdated={handlePlanUpdated}
            onShowToast={showToast}
            onPlanNewTrip={() => {
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* EXPLORE DESTINATIONS TAB */}
        {!isPlanning && activeTab === 'explore' && (
          <ExploreSection onPlanForDestination={handlePlanForDestination} />
        )}

        {/* MY TRIPS TAB */}
        {!isPlanning && activeTab === 'trips' && (
          <MyTripsView
            trips={savedTrips}
            onSelectTrip={handleSelectSavedTrip}
            onModifyTrip={handleModifySavedTrip}
            onTripsChanged={setSavedTrips}
            onPlanNewTrip={() => {
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {/* ABOUT & ARCHITECTURE TAB */}
        {!isPlanning && activeTab === 'about' && (
          <AboutSection
            onShowToast={showToast}
            openWebhookModal={() => setIsWebhookOpen(true)}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSosModal={() => setIsSosOpen(true)}
        openWebhookModal={() => setIsWebhookOpen(true)}
      />

      {/* Modals & Toasts */}
      <TravelSosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />

      <WebhookConfigModal
        isOpen={isWebhookOpen}
        onClose={() => setIsWebhookOpen(false)}
        onShowToast={showToast}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
