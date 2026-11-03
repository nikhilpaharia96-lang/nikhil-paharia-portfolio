/**
 * Single source of truth for service pricing and the advance / balance split.
 *
 * Imported by BOTH the browser (src/pages/ServiceDetail.tsx, BookingDialog)
 * and the Vercel functions (api/cashfree/*-booking-*.ts), so the amount the
 * visitor sees is always the amount the server charges — and the server never
 * trusts the amount it receives from the browser.
 */

export const SERVICE_SLUGS = [
  "website-development",
  "video-editing",
  "digital-marketing",
  "graphic-designing",
  "ui-ux-design",
  "automation-ai-solutions",
  "e-commerce-solutions",
  "cinematography-video-production",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export interface ServicePrice {
  title: string;
  /** Starting price in whole rupees. */
  startingPrice: number;
  /** "/month" for retainers, otherwise empty. */
  unit: string;
}

export const SERVICE_PRICES: Record<ServiceSlug, ServicePrice> = {
  "website-development": { title: "Website Development", startingPrice: 2999, unit: "" },
  "video-editing": { title: "Video Editing", startingPrice: 499, unit: "" },
  "digital-marketing": { title: "Digital Marketing", startingPrice: 1999, unit: "/month" },
  "graphic-designing": { title: "Graphic Designing", startingPrice: 499, unit: "" },
  "ui-ux-design": { title: "UI/UX Design", startingPrice: 1499, unit: "" },
  "automation-ai-solutions": { title: "Automation & AI Solutions", startingPrice: 4999, unit: "" },
  "e-commerce-solutions": { title: "E-Commerce Solutions", startingPrice: 4999, unit: "" },
  "cinematography-video-production": { title: "Cinematography & Video Production", startingPrice: 2999, unit: "" },
};

export function isServiceSlug(value: unknown): value is ServiceSlug {
  return typeof value === "string" && (SERVICE_SLUGS as readonly string[]).includes(value);
}

/** Default share of the total taken up-front. The server may override it via ADVANCE_PERCENT. */
export const DEFAULT_ADVANCE_PERCENT = 30;

/** Sanity ceiling, same as the existing payment endpoints. */
export const MAX_PROJECT_TOTAL_INR = 500000;

export function normalizeAdvancePercent(value: unknown): number {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) && n >= 1 && n <= 100 ? Math.round(n) : DEFAULT_ADVANCE_PERCENT;
}

export interface Quote {
  total: number;
  advancePercent: number;
  advance: number;
  remaining: number;
}

/** e.g. total 10,000 @ 30% → advance 3,000 + remaining 7,000. Whole rupees only. */
export function computeQuote(total: number, advancePercent: number = DEFAULT_ADVANCE_PERCENT): Quote {
  const advance = Math.max(1, Math.round((total * advancePercent) / 100));
  return { total, advancePercent, advance, remaining: total - advance };
}

/** Returns an error message, or null when `total` is an acceptable project total for this service. */
export function validateTotal(slug: ServiceSlug, total: unknown): string | null {
  const min = SERVICE_PRICES[slug].startingPrice;
  if (typeof total !== "number" || !Number.isFinite(total) || !Number.isInteger(total)) {
    return "Enter a valid project total.";
  }
  if (total < min) return `The total can't be lower than the starting price of ₹${min.toLocaleString("en-IN")}.`;
  if (total > MAX_PROJECT_TOTAL_INR) return "For projects above ₹5,00,000 please use the contact form.";
  return null;
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
