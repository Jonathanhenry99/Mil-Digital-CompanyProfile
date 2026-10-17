/**
 * Homepage content. Shapes mirror the Payload collections in
 * PROJECT_SPEC §8 so swapping this file for CMS queries is mechanical.
 *
 * Real MIL data (from Assets/ and the old site, mildigital.id): client
 * logos, team photos, stats, core values, the LYLA testimonial, the
 * pricing article. Still placeholder: case studies, the industry report,
 * extra articles and their Unsplash photos. Replace before launch.
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
  eyebrow: "Digital marketing consultant & agency · Bandung",
  title: "Turning brand noise\ninto measurable growth.",
  body: "A team of certified digital marketing experts helping brands across Indonesia plan, advertise and create, with every decision backed by data.",
  /**
   * Background photo behind the hero. Becomes an upload field on the Home
   * global in the CMS (Payload uploads carry a focal point, which maps to
   * `focal` here).
   */
  background: {
    image: "/photos/mil-team-working.jpg",
    /** CSS object-position: which part of the photo stays in frame. */
    focal: "62% 35%",
  },
};

export const showreel = {
  /** Set to the MIL journey film (e.g. from Higgsfield) when it is ready. */
  src: null as string | null,
  poster: "/photos/mil-team-group.jpg",
  title: "From day one to today.",
  caption: "The MIL journey film",
};

/**
 * Steps shown over the journey film, from the old site's facts. The first
 * field is a short marker rather than a year until the real dates are in.
 */
export const milestones = [
  { year: "Day 1", label: "MIL Digital starts in Bandung, helping brands grow their presence online" },
  { year: "7 yrs", label: "Of combined digital marketing experience across the team" },
  { year: "15", label: "Certified digital marketing experts, Meta certified in media buying" },
  { year: "100+", label: "Client milestones achieved across 10+ industries" },
  { year: "Today", label: "150+ brands have trusted MIL with their growth" },
];

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Brands partnered", note: "Retail, F&B, beauty, property, B2B and more" },
  { value: 15, label: "Certified experts", note: "Meta certified media buying and digital marketing" },
  { value: 10, suffix: "+", label: "Industries handled", note: "Strategy tuned to each market" },
  { value: 100, suffix: "+", label: "Client milestones", note: "Goals reached with the brands we work with" },
];

/** Shown under the stats. Badges from the old site. */
export const certifications = [
  { name: "Meta Certified Media Buying Professional", image: "/brand/certs/meta-media-buying-professional.png" },
  { name: "Meta Certified Digital Marketing Associate", image: "/brand/certs/meta-digital-marketing-associate.png" },
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
    summary:
      "Custom consultation that helps your brand navigate a fast-changing digital landscape, and stand out instead of just surviving.",
    points: ["Digital marketing strategy", "Asset & infrastructure optimisation", "KPI setting & measurement"],
    image: "/photos/mil-team-working.jpg",
  },
  {
    index: "02",
    title: "Advertising Strategy & Optimization",
    href: "/our-services/advertising-strategy-optimization",
    summary:
      "The right strategy for every step of the funnel, from awareness and consideration to conversion, kept performing through advertising.",
    points: ["Full-funnel media planning", "Meta certified media buying", "Campaign maintenance & optimisation"],
    image: "/placeholders/work-01.jpg",
  },
  {
    index: "03",
    title: "Creative Solution",
    href: "/our-services/creative-social-media-solution",
    summary: "We create experiences, weave stories and turn ideas into content your audience actually stops for.",
    points: ["Content creation", "Social media management", "Branding"],
    image: "/photos/mil-team-group.jpg",
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

/** MIL's core values (old site). Descriptions are new copy for review. */
export const values = [
  {
    title: "Integrity",
    body: "We say what we'll do and do what we say, even when the honest answer isn't the easy one.",
    tag: "Honest",
  },
  {
    title: "Transparency",
    body: "Clear numbers and clear reporting. You always see what's working, what isn't and where your budget goes.",
    tag: "Open books",
  },
  {
    title: "Tailored to your goals",
    body: "No templates. Every strategy starts from your business objectives and the metrics that matter to them.",
    tag: "Your KPIs",
  },
  {
    title: "Reliable",
    body: "Consistent execution and a team you can count on, campaign after campaign.",
    tag: "Dependable",
  },
  {
    title: "Knowledge sharing",
    body: "We explain the why behind every move, so your team grows sharper with every campaign.",
    tag: "Grow together",
  },
];

export const testimonials = [
  {
    quote:
      "Kerjasama dengan MIL sebagai konsultan menyenangkan. Kami rasa seluruh tim sangat passionate dalam hal digital marketing dan hal itu membuat tim kami jadi lebih bersemangat & mencoba hal baru. So, a huge thanks to you guys.",
    name: "LYLA",
    role: "Client",
    company: "LYLA",
  },
];

export const insights = {
  articles: [
    {
      slug: "7-cara-untuk-menentukan-harga-produk",
      category: "Playbook",
      title: "7 Cara Untuk Menentukan Harga Produk",
      excerpt:
        "Baru mulai bisnis dan bingung menentukan harga jual? Tujuh strategi pricing, dari cost plus sampai value based.",
      readingTime: "2 min read",
      image: "/placeholders/work-02.jpg",
    },
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
