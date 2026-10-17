/**
 * The brand quiz (PROJECT_SPEC §7.1). Pre-defined in code: questions and
 * weights are drafts to confirm with the MIL team. Each option adds points
 * to the three services and to the engagement axis (preliminary vs retainer).
 */

export type Score = { consulting?: number; advertising?: number; creative?: number; preliminary?: number; retainer?: number };
export type Option = { label: string; score: Score; reason?: string; industry?: string };
export type Question = { id: string; title: string; multi?: boolean; options: Option[] };

export const questions: Question[] = [
  {
    id: "business",
    title: "What kind of business are you growing?",
    options: [
      { label: "Retail & fashion", score: { advertising: 1, creative: 1 }, industry: "Retail" },
      { label: "F&B", score: { creative: 1, advertising: 1 }, industry: "F&B" },
      { label: "B2B & services", score: { consulting: 2 }, industry: "Hospitality" },
      { label: "Something else", score: { consulting: 1 } },
    ],
  },
  {
    id: "channels",
    title: "Where do you sell today?",
    multi: true,
    options: [
      { label: "Physical store", score: { consulting: 1 } },
      { label: "Marketplace", score: { advertising: 2 }, reason: "you sell on marketplaces, where ads decide visibility" },
      { label: "Own website", score: { advertising: 1, consulting: 1 } },
      { label: "Social commerce", score: { creative: 2, advertising: 1 }, reason: "social commerce runs on content people stop for" },
      { label: "B2B sales team", score: { consulting: 2 } },
    ],
  },
  {
    id: "challenge",
    title: "What's holding growth back right now?",
    options: [
      { label: "Not enough people know us", score: { creative: 2, advertising: 1 }, reason: "awareness is the first gap to close" },
      { label: "Leads or sales are flat", score: { advertising: 2, consulting: 1 }, reason: "flat sales usually need a sharper funnel and ads" },
      { label: "Ads cost too much / low ROAS", score: { advertising: 3 }, reason: "your ad spend isn't returning enough yet" },
      { label: "Content feels inconsistent", score: { creative: 3, retainer: 1 }, reason: "consistent content needs a system, not one-off posts" },
      { label: "We don't really know our numbers", score: { consulting: 3, preliminary: 1 }, reason: "you need a clear read of your data before spending more" },
    ],
  },
  {
    id: "stage",
    title: "Which stage is your brand in?",
    options: [
      { label: "Just starting", score: { consulting: 2, creative: 1, preliminary: 2 } },
      { label: "Growing", score: { advertising: 1, creative: 1, retainer: 1 } },
      { label: "Scaling", score: { advertising: 2, consulting: 1, retainer: 2 } },
      { label: "Established", score: { consulting: 1, creative: 1, retainer: 2 } },
    ],
  },
  {
    id: "goals",
    title: "What do you want in the next 6 months?",
    multi: true,
    options: [
      { label: "More awareness", score: { creative: 2 } },
      { label: "More sales", score: { advertising: 2 } },
      { label: "Lower ad costs", score: { advertising: 2 } },
      { label: "A stronger brand", score: { creative: 2 } },
      { label: "A long-term plan", score: { consulting: 2, retainer: 1 } },
    ],
  },
  {
    id: "team",
    title: "Who handles marketing in-house?",
    options: [
      { label: "No one yet", score: { creative: 1, advertising: 1, retainer: 2 }, reason: "without an in-house team, an ongoing partner keeps things moving" },
      { label: "A team that needs direction", score: { consulting: 2, preliminary: 1 }, reason: "your team can execute, it needs a clear plan" },
      { label: "A team that needs extra hands", score: { advertising: 1, creative: 1, retainer: 1 } },
    ],
  },
];

export const results = {
  consulting: {
    service: "Digital Marketing Consultation",
    brief: "Consultation",
    caseService: "Consulting",
    href: "/our-services/digital-marketing-consultation",
    line: "Start with a clear read of your brand, channels and data, then a plan you can act on.",
  },
  advertising: {
    service: "Advertising Strategy & Optimization",
    brief: "Advertising",
    caseService: "Advertising",
    href: "/our-services/advertising-strategy-optimization",
    line: "Put your budget where it returns the most, with full-funnel campaigns tuned every week.",
  },
  creative: {
    service: "Creative Solution",
    brief: "Creative",
    caseService: "Creative",
    href: "/our-services/creative-social-media-solution",
    line: "Build an authority-first content system that makes your brand the reference.",
  },
} as const;

export const engagement = {
  preliminary: { name: "Preliminary", line: "A focused first project: audit, plan and quick wins, so you see the value before committing." },
  retainer: { name: "Retainer", line: "An ongoing partnership: the same team running, measuring and improving month after month." },
};
