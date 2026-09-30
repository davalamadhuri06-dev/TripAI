import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, Plane, Hotel, Map, Wallet, CheckCircle2 } from 'lucide-react';

interface PlanningLoaderProps {
  destination: string;
  from: string;
}

export const PlanningLoader: React.FC<PlanningLoaderProps> = ({ destination, from }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: `Mapping flight paths & transit from ${from} to ${destination}...`, icon: Plane },
    { label: `Filtering boutique stays & verifying central neighborhood ratings...`, icon: Hotel },
    { label: `Designing balanced morning, afternoon & sunset itineraries...`, icon: Map },
    { label: `Optimizing budget breakdown & local culinary experiences...`, icon: Wallet },
    { label: `Finalizing packing checklist & assembling trip dashboard...`, icon: Compass },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mx-auto my-12 max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-md">
      {/* Central Pulsing Beacon */}
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30">
          <Sparkles className="h-8 w-8 animate-pulse" />
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
        🤖 Your AI travel agent is planning your trip...
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Synthesizing personalized flight times, curated accommodations, day-by-day activities, and budget plans for <span className="text-emerald-400 font-semibold">{destination}</span>.
      </p>

      {/* Progress sequence */}
      <div className="mt-8 space-y-3 text-left">
        {steps.map((st, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const Icon = st.icon;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-xl p-2.5 transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                  : isDone
                  ? 'text-slate-400'
                  : 'text-slate-600 opacity-40'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Icon className={`h-4 w-4 ${isCurrent ? 'text-emerald-400 animate-spin' : 'text-slate-600'}`} />
                )}
              </div>
              <span className="text-xs font-medium leading-snug">{st.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
