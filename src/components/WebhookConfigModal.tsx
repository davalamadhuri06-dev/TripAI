import React, { useState } from 'react';
import { Sliders, X, Check, Globe, RefreshCcw, AlertCircle, Sparkles } from 'lucide-react';
import {
  N8N_WEBHOOK_URL,
  getEffectiveWebhookUrl,
  saveWebhookUrl,
  resetWebhookUrl,
} from '../services/n8nService';

interface WebhookConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const WebhookConfigModal: React.FC<WebhookConfigModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [url, setUrl] = useState(getEffectiveWebhookUrl());
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  if (!isOpen) return null;

  const handleSave = () => {
    saveWebhookUrl(url.trim());
    onShowToast('n8n Webhook configuration updated!', 'success');
    onClose();
  };

  const handleReset = () => {
    resetWebhookUrl();
    setUrl(N8N_WEBHOOK_URL);
    onShowToast('Reset webhook URL to default placeholder', 'info');
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          source: 'VoyageAI Test Ping',
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setTestStatus('success');
        onShowToast('Successfully reached n8n Webhook!', 'success');
      } else {
        setTestStatus('failed');
        onShowToast(`Webhook returned status ${response.status}`, 'warning');
      }
    } catch (e) {
      setTestStatus('failed');
      onShowToast('Could not reach webhook (CORS or network error)', 'warning');
    }
  };

  const isDefault = url === N8N_WEBHOOK_URL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden space-y-6 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                n8n Webhook Configuration
              </h3>
              <p className="text-xs text-slate-400">Connect to your live AI Travel Agent workflow</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Webhook Endpoint URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/travel-agent"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-xs font-mono text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              When left as default placeholder, VoyageAI executes with its built-in smart AI synthesis engine, generating complete realistic plans for college demos and testing.
            </p>
          </div>

          {/* Test Status Feedback */}
          {testStatus === 'success' && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Connection confirmed! Your n8n workflow responded successfully.</span>
            </div>
          )}
          {testStatus === 'failed' && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Could not reach URL. Ensure CORS is enabled on your n8n Webhook node.</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={isDefault || testStatus === 'testing'}
              onClick={handleTestConnection}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              {testStatus === 'testing' ? 'Testing Ping...' : 'Test Webhook Ping'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-white"
              title="Reset to default placeholder"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
