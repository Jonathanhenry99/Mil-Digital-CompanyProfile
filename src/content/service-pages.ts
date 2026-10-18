/**
 * Copy for the three service pages (page inventory). One template renders
 * all three; `feature` picks the chapter that is unique to each service.
 * Copy is drafted from MIL's old site and the brief; review with the team.
 */

export type Framework = { title: string; body: string };

export type ServicePage = {
  slug: string;
  name: string;
  /** Which Brief chip this service ticks, and which case studies it shows. */
  briefService: "Consultation" | "Advertising" | "Creative";
  caseService: "Consulting" | "Advertising" | "Creative";
  headline: string;
  intro: string;
  image: string;
  focal: string;
  feature: "approach" | "platforms" | "creative";
  frameworksTitle: string;
  frameworks: Framework[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "digital-marketing-consultation",
    name: "Digital Marketing Consultation",
    briefService: "Consultation",
    caseService: "Consulting",
    headline: "Your partner for\nmeasurable growth.",
    intro:
      "Custom consultation that helps your brand navigate a fast-changing digital landscape. We pick the metrics that fit your business, build the plan around them, and stay with you while it runs.",
    image: "/photos/mil-team-working.jpg",
    focal: "40% 40%",
    feature: "approach",
    frameworksTitle: "The Trinity\nframeworks.",
    frameworks: [
      { title: "Product", body: "Trinity Principle 1. A product people want, priced and packaged to sell." },
      { title: "Branding", body: "Trinity Principle 2. A brand that's clear, consistent and worth remembering." },
      { title: "Marketing", body: "Trinity Principle 3. Getting it in front of the right people, measurably." },
      { title: "Organic · Advertising · Influencer", body: "The Trinity Pillars: the three digital channels we balance to build a sustainable brand." },
    ],
  },
  {
    slug: "advertising-strategy-optimization",
    name: "Advertising Strategy & Optimization",
    briefService: "Advertising",
    caseService: "Advertising",
    headline: "Your advertising\nstrategist.",
    intro:
      "The right strategy for every step of the funnel, from awareness and consideration to conversion, then kept performing through careful advertising by Meta certified media buyers.",
    image: "/photos/mil-team-working.jpg",
    focal: "75% 35%",
    feature: "platforms",
    frameworksTitle: "How we run\nyour ads.",
    frameworks: [
      { title: "Account structure", body: "Campaigns organised by funnel stage so budget follows intent." },
      { title: "Creative testing", body: "A steady rhythm of new angles and formats, judged by data, not taste." },
      { title: "Budget pacing", body: "Spend shifted weekly towards what returns the most." },
      { title: "Clear reporting", body: "ROAS, CPA and the story behind them, in plain language." },
    ],
  },
  {
    slug: "creative-social-media-solution",
    name: "Creative Solution",
    briefService: "Creative",
    caseService: "Creative",
    headline: "Social media\n& branding.",
    intro:
      "We're not just about designs: we create experiences, weave stories and turn ideas into content your audience stops for. Social media management and branding, built to make your brand the reference.",
    image: "/photos/mil-team-group.jpg",
    focal: "50% 40%",
    feature: "creative",
    frameworksTitle: "The authority-first\nframework.",
    frameworks: [
      { title: "Position", body: "Decide what your brand should be known for, and for whom." },
      { title: "Prove", body: "Content that shows expertise: results, process, the people behind it." },
      { title: "Repeat", body: "A consistent system, so every post builds on the last." },
      { title: "Measure", body: "Reach, saves and leads tracked, so creative earns its place." },
    ],
  },
];

export const extraServices = [
  { title: "Web SEO", body: "Technical fixes, content and structure that help the right customers find you on search." },
  { title: "Web Development", body: "Fast, measurable websites and landing pages built to convert the traffic your ads bring." },
  { title: "User Research", body: "Interviews and testing that show why customers buy, hesitate or leave." },
];

export const platforms = ["Meta", "Google", "TikTok", "YouTube", "Shopee", "Tokopedia"];

export const creativeIndustries = ["F&B", "Beauty & skincare", "Fashion", "Property", "Lifestyle", "Retail", "B2B & industrial", "Clinics & wellness"];
