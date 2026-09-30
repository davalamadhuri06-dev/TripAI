import { TripFormInputs, TravelPlanResult } from '../types/travel';
import { generateContextualPlan } from './planGenerator';

/**
 * N8N WEBHOOK CONFIGURATION
 * Replace this placeholder with your deployed n8n workflow webhook URL:
 * e.g., "https://primary-production-xxxx.up.railway.app/webhook/voyageai-travel-agent"
 */
export const N8N_WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL";

const STORAGE_KEY_WEBHOOK = "voyageai_n8n_webhook_url";

export function getEffectiveWebhookUrl(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY_WEBHOOK);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  }
  return N8N_WEBHOOK_URL;
}

export function saveWebhookUrl(url: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_WEBHOOK, url);
  }
}

export function resetWebhookUrl(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_WEBHOOK);
  }
}

export interface WebhookSendResult {
  plan: TravelPlanResult;
  isRealWebhook: boolean;
  notes?: string;
}

/**
 * Sends trip data to the n8n AI Travel Agent Webhook.
 * If the webhook is the default placeholder or unreachable,
 * it falls back cleanly to the VoyageAI intelligent itinerary synthesis engine.
 */
export async function sendToN8nWebhook(
  inputs: TripFormInputs,
  customUrl?: string
): Promise<WebhookSendResult> {
  const targetUrl = customUrl || getEffectiveWebhookUrl();
  const isPlaceholder = !targetUrl || targetUrl === "YOUR_N8N_WEBHOOK_URL" || targetUrl.includes("example.com");

  // The precise JSON payload specified by the requirement
  const payload = {
    from: inputs.from,
    destination: inputs.destination,
    days: Number(inputs.days),
    travelers: Number(inputs.travelers),
    travelType: inputs.travelType,
    budget: Number(inputs.budget),
    preferences: inputs.preferences,
    message: inputs.message,
    ...(inputs.groupPreferences && inputs.groupPreferences.length > 0
      ? { groupPreferences: inputs.groupPreferences }
      : {}),
    timestamp: new Date().toISOString(),
  };

  if (!isPlaceholder) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // If n8n returns a full travel plan or structured travel object
        if (data && (data.itinerary || data.placesToVisit || data.summaryHeadline)) {
          return {
            plan: {
              ...generateContextualPlan(inputs), // base defaults for any missing properties
              ...data,
              source: "n8n_webhook",
            },
            isRealWebhook: true,
            notes: "Received response directly from n8n Travel Agent Webhook",
          };
        }
      }
    } catch (err) {
      console.warn("n8n Webhook call failed or timed out. Falling back to local AI simulation:", err);
    }
  }

  // Fallback / Standalone demo mode: generate realistic high-fidelity travel plan
  // Simulate AI agent planning latency for realistic startup UX
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const generatedPlan = generateContextualPlan(inputs);
  return {
    plan: generatedPlan,
    isRealWebhook: false,
    notes: isPlaceholder
      ? "Generated via VoyageAI Smart Engine (Set your n8n webhook URL anytime in Webhook Config)"
      : "n8n webhook did not respond with JSON; generated via VoyageAI Smart Engine",
  };
}
