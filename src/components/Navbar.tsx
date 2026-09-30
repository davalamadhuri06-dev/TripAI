import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, ShieldAlert, Sliders } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSosModal: () => void;
  openWebhookModal: () => void;
  savedTripsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSosModal,
  openWebhookModal,
  savedTripsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'planner', label: 'Plan a Trip' },
    { id: 'explore', label: 'Explore' },
    { id: 'trips', label: 'My Trips', count: savedTripsCount },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand single text element */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20 transition-transform duration-200 group-hover:scale-105">
            <Compass className="h-5 w-5 stroke-[2.2]" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400">
            Voyage<span className="text-emerald-400">AI</span>
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`group relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400'
                }`}
              >
                <span>{link.label}</span>
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[11px] font-mono text-emerald-300">
                    {link.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openSosModal}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/20 hover:border-rose-500/50"
            title="Travel SOS & Emergency Safety Guidelines"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span className="whitespace-nowrap">Travel SOS</span>
          </button>

          <button
            onClick={openWebhookModal}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            title="Configure n8n Webhook"
          >
            <Sliders className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => handleNavClick('planner')}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
            <span>Plan My Trip</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openSosModal}
            className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400"
            aria-label="Travel SOS"
          >
            <ShieldAlert className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm text-left ${
                  activeTab === link.id
                    ? 'bg-emerald-500/15 font-semibold text-emerald-400'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                    {link.count}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWebhookModal();
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-medium text-slate-300"
              >
                <Sliders className="h-4 w-4 text-emerald-400" />
                <span>n8n Webhook Settings</span>
              </button>
              <button
                onClick={() => handleNavClick('planner')}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>Plan My Trip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
