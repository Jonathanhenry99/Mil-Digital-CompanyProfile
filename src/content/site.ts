/**
 * Site-wide settings. Becomes the `site-settings` and `navigation` globals
 * in Payload (PROJECT_SPEC §8); until then it lives here.
 * Values marked TBC need confirming by the MIL team.
 */

export const site = {
  name: "MIL Digital",
  url: "https://mildigital.id",
  whatsapp: "6282124242194",
  whatsappDisplay: "+62 821-2424-2194",
  email: "hello@mildigital.id", // TBC
  address: "Jakarta, Indonesia", // TBC: full office address
  foundedYear: 2019, // TBC
  bookingHref: "/contact-us",
  quizHref: "/get-to-know-your-brand",
  socials: [
    // TBC: real handles
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
  ],
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavItem = NavLink | { label: string; children: NavLink[] };

export const nav: NavItem[] = [
  {
    label: "About MIL Digital",
    children: [
      { label: "About Us", href: "/about-mil-digital", description: "Who we are and what we believe" },
      { label: "Our Service", href: "/our-services", description: "Consulting, advertising and creative" },
      { label: "Our Works", href: "/our-works-case-study", description: "Case studies, by industry and scale" },
    ],
  },
  {
    label: "Team & Career",
    children: [
      { label: "Our Team", href: "/our-team", description: "The people behind the numbers" },
      { label: "Career", href: "/career", description: "Open roles and how we work" },
    ],
  },
  {
    label: "Insights",
    children: [
      { label: "Articles", href: "/insights", description: "Playbooks and points of view" },
      { label: "Reports", href: "/reports", description: "Industry research from MIL" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
  { label: "ATLAS", href: "/atlas", badge: "Soon" },
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-mil-digital" },
      { label: "Our Team", href: "/our-team" },
      { label: "Career", href: "/career" },
      { label: "ATLAS", href: "/atlas" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Digital Marketing Consultation", href: "/our-services/digital-marketing-consultation" },
      { label: "Advertising Strategy & Optimization", href: "/our-services/advertising-strategy-optimization" },
      { label: "Creative Solution", href: "/our-services/creative-social-media-solution" },
      { label: "Find your service", href: "/get-to-know-your-brand" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Articles", href: "/insights" },
      { label: "Reports", href: "/reports" },
      { label: "Our Works", href: "/our-works-case-study" },
    ],
  },
];
