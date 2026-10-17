/**
 * Homepage content. Shapes mirror the Payload collections in
 * PROJECT_SPEC §8 so swapping this file for CMS queries is mechanical.
 *
 * Client logos are real (from Assets/). Everything else is still
 * placeholder: case studies, testimonials and numbers are examples and
 * photos are Unsplash stand-ins. Replace before launch.
 */

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

export type Client = {
  name: string;
  /** White logo on transparent, in public/clients (cropped from Assets/Logofolio). */
  logo: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  services: string[];
  metric: { value: string; label: string };
  image: string;
};

export type Service = {
  index: string;
  title: string;
  href: string;
  summary: string;
  points: string[];
  image: string;
};

export const hero = {
  eyebrow: "Data-driven marketing partner · Jakarta",
  title: "Turning brand noise\ninto measurable growth.",
  body: "Consulting, advertising and creative for brands across Indonesia, with every decision backed by data.",
};

export const showreel = {
  /** Set to the MIL journey film (e.g. from Higgsfield) when it is ready. */
  src: null as string | null,
  poster: "/placeholders/work-03.jpg",
  title: "From day one to today.",
  caption: "The MIL journey film",
};

/** Steps shown over the journey film. TBC: real years and milestones. */
export const milestones = [
  { year: "2019", label: "MIL Digital opens its doors in Jakarta" },
  { year: "2021", label: "First 50 brands, first retained ad accounts" },
  { year: "2023", label: "MIL Research publishes its first industry report" },
  { year: "2025", label: "ATLAS, our brand analytics dashboard, goes into build" },
  { year: "Today", label: "150+ brands grown across Indonesia" },
];

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Brands grown", note: "Retail, F&B, B2B and lifestyle" },
  { value: 85, prefix: "Rp", suffix: "B+", label: "Ad spend managed", note: "Across Meta, Google, TikTok and marketplaces" },
  { value: 4.2, decimals: 1, suffix: "x", label: "Average ROAS", note: "Across retained ad accounts, 2025" },
  { value: 92, suffix: "%", label: "Client retention", note: "Clients who renew after year one" },
];

/** TBC: confirm names marked as initials (V, CB) with the MIL team. */
export const clients: Client[] = [
  { name: "Wheels", logo: "/clients/wheels.png" },
  { name: "Terry & Co.", logo: "/clients/terry-co.png" },
  { name: "Tumbuh Lab", logo: "/clients/tumbuh-lab.png" },
  { name: "Alluderma", logo: "/clients/alluderma.png" },
  { name: "Kabobs Premium Kebab", logo: "/clients/kabobs.png" },
  { name: "Bartega", logo: "/clients/bartega.png" },
  { name: "Deenay", logo: "/clients/deenay.png" },
  { name: "Verena Mia", logo: "/clients/verena-mia.png" },
  { name: "Tokomas Jawa", logo: "/clients/tokomas-jawa.png" },
  { name: "KALM", logo: "/clients/kalm.png" },
  { name: "Toko Baru", logo: "/clients/toko-baru.png" },
  { name: "Fichino", logo: "/clients/fichino.png" },
  { name: "Dianable", logo: "/clients/dianable.png" },
  { name: "Hellomiley", logo: "/clients/hellomiley.png" },
  { name: "Paddy", logo: "/clients/paddy.png" },
  { name: "Menliving", logo: "/clients/menliving.png" },
  { name: "Onycha", logo: "/clients/onycha.png" },
  { name: "Wardrobe & Storie", logo: "/clients/wardrobe-storie.png" },
  { name: "Bluesville", logo: "/clients/bluesville.png" },
  { name: "Lylà", logo: "/clients/lyla.png" },
  { name: "NOA Everyday", logo: "/clients/noa-everyday.png" },
  { name: "Nayara", logo: "/clients/nayara.png" },
  { name: "Opus One Concept Store", logo: "/clients/opus-one.png" },
  { name: "Oxford Society", logo: "/clients/oxford-society.png" },
  { name: "CB", logo: "/clients/cb.png" },
  { name: "ODS", logo: "/clients/ods.png" },
  { name: "Healthy Wagyu", logo: "/clients/healthy-wagyu.png" },
  { name: "Parahyangan Eco Business Park", logo: "/clients/parahyangan-eco-business-park.png" },
  { name: "Grounds Studio", logo: "/clients/grounds-studio.png" },
  { name: "KEE", logo: "/clients/kee.png" },
  { name: "Maiimj", logo: "/clients/maiimj.png" },
  { name: "Petite Fleur", logo: "/clients/petite-fleur.png" },
  { name: "Hijack Sandals", logo: "/clients/hijack-sandals.png" },
  { name: "Boxareus", logo: "/clients/boxareus.png" },
  { name: "HIA", logo: "/clients/hia.png" },
  { name: "Bigkabel", logo: "/clients/bigkabel.png" },
  { name: "Crabus", logo: "/clients/crabus.png" },
  { name: "Ganeca", logo: "/clients/ganeca.png" },
  { name: "Two Times Too", logo: "/clients/two-times-too.png" },
  { name: "Teak Atelier", logo: "/clients/teak-atelier.png" },
  { name: "KALE", logo: "/clients/kale.png" },
  { name: "V", logo: "/clients/v-monogram.png" },
  { name: "Teknikmart", logo: "/clients/teknikmart.png" },
  { name: "Shafira", logo: "/clients/shafira.png" },
  { name: "Cleo Cletta", logo: "/clients/cleo-cletta.png" },
  { name: "Mielerie", logo: "/clients/mielerie.png" },
  { name: "Matahari Land", logo: "/clients/matahari-land.png" },
  { name: "Kyrra", logo: "/clients/kyrra.png" },
  { name: "Orient Teknik", logo: "/clients/orient-teknik.png" },
  { name: "Charlene Clinic", logo: "/clients/charlene-clinic.png" },
  { name: "EUCK", logo: "/clients/euck.png" },
  { name: "Hijabchic", logo: "/clients/hijabchic.png" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "kopi-senja",
    client: "Kopi Senja",
    title: "Scaling a neighbourhood coffee brand to 40 outlets",
    industry: "F&B",
    services: ["Advertising"],
    metric: { value: "4.8x", label: "ROAS in 90 days" },
    image: "/placeholders/work-11.jpg",
  },
  {
    slug: "nusa-retail",
    client: "Nusa Retail",
    title: "Rebuilding the omnichannel funnel for a fashion retailer",
    industry: "Retail",
    services: ["Consulting", "Advertising"],
    metric: { value: "+212%", label: "Online revenue YoY" },
    image: "/placeholders/work-06.jpg",
  },
  {
    slug: "halcyon-audio",
    client: "Halcyon Audio",
    title: "Launching a premium audio line on marketplaces",
    industry: "Consumer electronics",
    services: ["Advertising"],
    metric: { value: "−38%", label: "Cost per acquisition" },
    image: "/placeholders/work-08.jpg",
  },
  {
    slug: "batavia-kitchen",
    client: "Batavia Kitchen",
    title: "An authority-first content system for a cloud kitchen",
    industry: "F&B",
    services: ["Creative"],
    metric: { value: "+64%", label: "Repeat orders" },
    image: "/placeholders/work-10.jpg",
  },
  {
    slug: "sagara-living",
    client: "Sagara Living",
    title: "From walk-ins to a predictable lead engine",
    industry: "Hospitality",
    services: ["Consulting"],
    metric: { value: "2.4x", label: "Qualified leads" },
    image: "/placeholders/work-05.jpg",
  },
  {
    slug: "teduh-watch",
    client: "Teduh Watch Co.",
    title: "Building a lifestyle brand people follow, not scroll past",
    industry: "Lifestyle",
    services: ["Creative", "Advertising"],
    metric: { value: "1.9M", label: "Organic reach" },
    image: "/placeholders/work-07.jpg",
  },
];

export const services: Service[] = [
  {
    index: "01",
    title: "Digital Marketing Consultation",
    href: "/our-services/digital-marketing-consultation",
    summary: "A partner that audits, plans and monitors your growth, so every rupiah has a reason.",
    points: ["Brand & channel assessment", "Growth strategy & roadmap", "Monthly performance monitoring"],
    image: "/placeholders/work-15.jpg",
  },
  {
    index: "02",
    title: "Advertising Strategy & Optimization",
    href: "/our-services/advertising-strategy-optimization",
    summary: "Full-funnel paid media across Meta, Google, TikTok and marketplaces, tuned for ROAS.",
    points: ["Media planning & buying", "Creative testing frameworks", "ROAS & CPA optimisation"],
    image: "/placeholders/work-01.jpg",
  },
  {
    index: "03",
    title: "Creative Solution",
    href: "/our-services/creative-social-media-solution",
    summary: "Social media management and branding built on an authority-first framework.",
    points: ["Social media management", "Brand identity & guidelines", "Content production"],
    image: "/placeholders/work-04.jpg",
  },
];

export const gallery = [
  { src: "/placeholders/work-11.jpg", alt: "Coffee campaign shoot" },
  { src: "/placeholders/work-01.jpg", alt: "Performance dashboard" },
  { src: "/placeholders/work-10.jpg", alt: "F&B menu photography" },
  { src: "/placeholders/work-06.jpg", alt: "Retail store visual merchandising" },
  { src: "/placeholders/work-08.jpg", alt: "Product shoot for an audio brand" },
  { src: "/placeholders/work-05.jpg", alt: "Restaurant interior campaign" },
  { src: "/placeholders/work-07.jpg", alt: "Watch product photography" },
  { src: "/placeholders/work-02.jpg", alt: "Analytics report on a laptop" },
  { src: "/placeholders/work-14.jpg", alt: "Client workshop" },
  { src: "/placeholders/work-16.jpg", alt: "MIL Digital studio" },
];

export const values = [
  {
    title: "Data before opinion",
    body: "We start from your numbers, not our taste. Every recommendation comes with the data that earned it.",
    tag: "Assess",
  },
  {
    title: "Authority-first creative",
    body: "Content that makes your brand the reference in its category, not just another post in the feed.",
    tag: "Create",
  },
  {
    title: "Partners, not vendors",
    body: "We sit at your table, learn your margins and own the outcome with you.",
    tag: "Collaborate",
  },
  {
    title: "Measured every week",
    body: "Live dashboards and weekly reviews, so nothing waits for the end-of-month report.",
    tag: "Monitor",
  },
];

export const testimonials = [
  {
    quote:
      "MIL didn't just run our ads. They rebuilt how we think about growth, and the numbers followed within one quarter.",
    name: "Dimas Prakoso",
    role: "Head of Marketing",
    company: "Nusa Retail",
  },
  {
    quote:
      "The weekly reviews changed everything. We always know what's working, what isn't, and what we're doing about it.",
    name: "Sarah Wijaya",
    role: "Founder",
    company: "Kopi Senja",
  },
  {
    quote:
      "Their creative team finally made our brand look like the category leader we wanted to be.",
    name: "Raka Mahendra",
    role: "Brand Director",
    company: "Teduh Watch Co.",
  },
];

export const insights = {
  articles: [
    {
      slug: "roas-is-lying-to-you",
      category: "Advertising",
      title: "Why ROAS alone is lying to you",
      excerpt: "The metric everyone reports, and the three numbers that tell you whether it's real.",
      readingTime: "6 min read",
      image: "/placeholders/work-02.jpg",
    },
    {
      slug: "marketplace-ads-playbook-2027",
      category: "Playbook",
      title: "The marketplace ads playbook for 2027",
      excerpt: "How we plan, bid and test on Shopee, Tokopedia and TikTok Shop.",
      readingTime: "9 min read",
      image: "/placeholders/work-06.jpg",
    },
    {
      slug: "authority-first-content-b2b",
      category: "Creative",
      title: "Authority-first content for B2B brands",
      excerpt: "Why being the reference beats being everywhere, and how to get there.",
      readingTime: "7 min read",
      image: "/placeholders/work-14.jpg",
    },
    {
      slug: "fnb-brands-social-commerce",
      category: "Research",
      title: "What F&B brands get wrong about social commerce",
      excerpt: "Patterns from a year of campaigns across 40 restaurant and café brands.",
      readingTime: "8 min read",
      image: "/placeholders/work-05.jpg",
    },
    {
      slug: "weekly-growth-review",
      category: "Consulting",
      title: "A weekly growth review your CEO will actually read",
      excerpt: "The one-page format we use with every retained client.",
      readingTime: "5 min read",
      image: "/placeholders/work-15.jpg",
    },
  ],
  report: {
    slug: "indonesia-fnb-digital-report-2026",
    title: "Indonesia F&B Digital Report 2026",
    image: "/placeholders/work-01.jpg",
    summary: "How 300+ F&B brands spend, test and grow online, and where the next rupiah should go.",
    findings: [
      { stat: "63%", label: "of orders start on social" },
      { stat: "2.1x", label: "ROAS gap, top vs median" },
    ],
  },
};
