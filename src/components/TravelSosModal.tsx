import React, { useState } from 'react';
import {
  ShieldAlert,
  FileQuestion,
  Smartphone,
  HeartPulse,
  CreditCard,
  HelpCircle,
  PhoneCall,
  AlertTriangle,
  X,
  ExternalLink,
} from 'lucide-react';

interface TravelSosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelSosModal: React.FC<TravelSosModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('documents');

  if (!isOpen) return null;

  const topics = [
    {
      id: 'documents',
      icon: FileQuestion,
      label: 'Lost Documents',
      title: 'Lost Passport, Aadhaar, or Travel Documents',
      actions: [
        'File an official Police Loss Report (FIR / Lost Property Certificate) at the nearest local police precinct immediately; you will need this for claims and re-issuance.',
        'Contact your country\'s embassy, high commission, or local consulate if traveling internationally for an Emergency Certificate (EC) or duplicate passport.',
        'Access digital backup copies stored on cloud storage (Google Drive, DigiLocker, iCloud) or encrypted email.',
        'Notify your travel insurance provider within 24–48 hours to initiate coverage for document replacement costs.',
      ],
      hotline: 'Emergency Helpline: 112 (India) / 911 (US) / 112 (EU)',
    },
    {
      id: 'phone',
      icon: Smartphone,
      label: 'Lost Phone',
      title: 'Lost or Stolen Smartphone',
      actions: [
        'Use another device immediately to open "Find My" (Apple) or "Find My Device" (Google) to locate or remotely lock and erase sensitive data.',
        'Call your mobile service carrier to suspend the SIM card and block the IMEI number to prevent unauthorized roaming bills and OTP misuse.',
        'De-link UPI apps, banking apps, and digital wallets (Google Pay, PhonePe, Paytm, Apple Pay) by contacting your bank\'s fraud division.',
        'Change primary account passwords (Google, Apple ID, WhatsApp, primary email).',
      ],
      hotline: 'Central Equipment Identity Register (CEIR) Portal in India: ceir.gov.in',
    },
    {
      id: 'medical',
      icon: HeartPulse,
      label: 'Medical Emergency',
      title: 'Sudden Illness or Medical Emergency',
      actions: [
        'Call national emergency ambulance services immediately: Dial 108 or 112 (India) / 911 / 112 (International).',
        'Request hotel front desk or local hosts to direct you to the nearest accredited multi-speciality hospital or 24-hour trauma clinic.',
        'Have your blood group, known allergies, and active medications list ready on paper or an emergency contact card.',
        'Contact your travel medical insurer\'s 24/7 assistance hotline before non-emergency admissions so they can coordinate cashless hospitalization.',
      ],
      hotline: 'National Emergency Number: 112 · Ambulance: 108',
    },
    {
      id: 'money',
      icon: CreditCard,
      label: 'Money Problem',
      title: 'Stolen Wallet, ATM Skimming, or Card Block',
      actions: [
        'Open your mobile banking app or call your bank\'s emergency number to immediately lock compromised debit and credit cards.',
        'Utilize international cash wire services (Western Union, MoneyGram) or family transfers through trusted contacts for immediate cash pickup.',
        'Keep a small reserve of cash or an emergency backup card stored separately from your primary wallet.',
        'If stranded in a foreign country without funds, contact your diplomatic mission; embassies provide emergency financial assistance procedures.',
      ],
      hotline: 'National Cyber Crime Reporting Helpline (India): 1930',
    },
    {
      id: 'local_help',
      icon: HelpCircle,
      label: 'Need Local Help',
      title: 'Stranded, Language Barriers, or Disorientation',
      actions: [
        'Approach the nearest Tourist Police booth, airport assistance desk, or registered railway/metro station information kiosk.',
        'Use offline translation apps (Google Translate) with pre-downloaded local language packs for critical communication.',
        'Always carry a physical business card with your hotel\'s exact local address and contact phone number written in local script.',
        'Avoid unlicensed taxis; request verified app cabs (Uber/Ola) or prepaid government transport booths.',
      ],
      hotline: 'India Tourist Helpline (Toll Free, Multilingual): 1363 or 1800-11-1363',
    },
  ];

  const current = topics.find((t) => t.id === selectedTopic) || topics[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-rose-500/40 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>🆘 Travel SOS Guidance</span>
              </h3>
              <p className="text-xs text-slate-400">Emergency safety protocol & immediate action steps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Disclaimer Banner as required by prompt */}
        <div className="flex items-start gap-2.5 bg-rose-950/40 border-b border-rose-900/40 px-6 py-3 text-xs text-rose-300">
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <span>
            <strong>Safety Notice:</strong> This tool provides general guidance only. In life-threatening emergencies or severe crimes, contact local emergency authorities (112 / 911 / Police / Ambulance) immediately.
          </span>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/50 px-4 py-2 gap-1.5">
          {topics.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Topic Content Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="font-display text-base font-bold text-white">
              {current.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1">Recommended chronological steps:</p>
          </div>

          <div className="space-y-2.5">
            {current.actions.map((act, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 text-xs text-slate-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{act}</span>
              </div>
            ))}
          </div>

          {/* Hotline Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-rose-300 font-medium">
              <PhoneCall className="h-4 w-4 text-rose-400" />
              <span>{current.hotline}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
