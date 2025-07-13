export interface propertySummaryProps {
  id: string;
  code?: string;
  type?: string;
  subtype?: string;
  src: string[];
  title: string;
  subtitle?: string[];
  price: string;
  location: string;
  size?: string;
  room?: string;
  bath?: string;
  tank?: string;
  measurement?: string;
  suitability?: string[];
  details?: string[];
  agentid?: string;
}

export interface ServicePageDetProps {
  src: string;
  title: string;
  link: string;
  count: number;
}

export const slides = [
  {
    src: "/miniflat-longlease.jpg",
    alt: "header carousel",
    title: "Secure Prime Property - ",
    highlight: "Long Lease.",
    location: "Strategic Location.",
    buttonLabel: "Buy Now",
    type: "ls",
    link: "rent",
  },
  {
    src: "/yellow-gate-residence/ygr1.jpg",
    alt: "header carousel",
    title: "Modern Living",
    highlight: "Flexible Options",
    location: "Premium Apartment for Sale or Lease",
    buttonLabel: "Rent Now",
    type: "afl",
    link: "rent",
  },
  {
    src: "/greystone_tower/tw1.jpg",
    alt: "header carousel",
    title: "Strategic Location.",
    highlight: "Iconic Design.",
    location: "Built for Growth",
    buttonLabel: "Buy Now",
    type: "cfs",
    link: "sale",
  },
  {
    src: "/distress-apapa-hero.png",
    alt: "header carousel 6",
    title: "Premium Location.",
    highlight: " Distress Price.",
    location: " Perfect for Commercial Projects",
    buttonLabel: "Buy Now",
    type: "cfs",
    distress: "distress sale offer",
    link: "sale",
  },
  {
    src: "/4.25-Iju/acl1.jfif",
    alt: "header carousel 6",
    title: "Over 4 acres -  ",
    highlight: "Distressed Land ",
    location: "in a High-Growth Corridor",
    buttonLabel: "Buy Now",
    type: "lfs",
    distress: "distress sale offer",
    link: "sale",
  },
  {
    src: "/tank1.jpg",
    alt: "header carousel 6",
    title: "Fuel your Business!",
    highlight: "Prime Tank Farm Opportunities...",
    location: "Sales Leases or Through put.",
    buttonLabel: "Buy Now",
    type: "cfs",
    link: "sale",
  },
];
