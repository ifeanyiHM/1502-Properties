import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://1502properties.com";

// Unique title + description for each static page. Pages that set their own
// tags (blog posts, property details) are left out so they keep control.
const PAGES: Record<string, { title: string; description: string }> = {
  "/ourservices": {
    title: "Our Services | 1502 Properties",
    description:
      "Explore the real estate services 1502 Properties offers: property sales, leasing, advisory and investment support in Lagos and beyond.",
  },
  "/contact": {
    title: "Contact Us | 1502 Properties",
    description:
      "Get in touch with 1502 Properties to buy, sell or lease property, or to ask about any of our listings and services.",
  },
  "/blogs": {
    title: "Blog | 1502 Properties",
    description:
      "Insights, guides and stories on Nigerian real estate, property investment and home buying from the 1502 Properties team.",
  },
  "/ukproperties": {
    title: "Properties | 1502 Properties",
    description:
      "Browse properties for sale and lease from 1502 Properties, including land, houses, apartments and commercial spaces.",
  },
  "/careers": {
    title: "Careers | 1502 Properties",
    description:
      "Join the 1502 Properties team. See open roles and apply to build a career in real estate.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | 1502 Properties",
    description:
      "How 1502 Properties collects, uses and protects your personal information.",
  },
  "/termsandconditions": {
    title: "Terms and Conditions | 1502 Properties",
    description:
      "The terms and conditions for using the 1502 Properties website and services.",
  },
};

// /service/:propertyType and /service/:propertyType/:subtype
const SERVICE_TYPES: Record<string, { label: string; blurb: string }> = {
  sale: {
    label: "Properties for Sale",
    blurb: "land, apartments, houses and commercial properties for sale",
  },
  rent: {
    label: "Properties for Lease",
    blurb: "land, apartments, houses and commercial properties for lease",
  },
  "joint-ventures": {
    label: "Joint Venture Opportunities",
    blurb: "joint venture real estate opportunities",
  },
  shortlet: {
    label: "Shortlet Apartments",
    blurb: "furnished shortlet apartments",
  },
  "off-plan": {
    label: "Off-Plan Properties",
    blurb: "off-plan properties and developments",
  },
};

const SERVICE_SUBTYPES: Record<string, string> = {
  lfs: "Land for Sale",
  afs: "Apartments for Sale",
  hfs: "Houses for Sale",
  cfs: "Commercial Properties for Sale",
  lfl: "Land for Lease",
  ls: "Long Lease Properties",
  afl: "Apartments for Lease",
  hfl: "Houses for Lease",
  cfl: "Commercial Properties for Lease",
};

for (const [type, { label, blurb }] of Object.entries(SERVICE_TYPES)) {
  PAGES[`/service/${type}`] = {
    title: `${label} | 1502 Properties`,
    description: `Browse ${blurb} from 1502 Properties, with photos, prices and locations.`,
  };
}
for (const [type, subtypes] of Object.entries({
  sale: ["lfs", "afs", "hfs", "cfs"],
  rent: ["lfl", "ls", "afl", "hfl", "cfl"],
})) {
  for (const sub of subtypes) {
    PAGES[`/service/${type}/${sub}`] = {
      title: `${SERVICE_SUBTYPES[sub]} | 1502 Properties`,
      description: `${SERVICE_SUBTYPES[sub]} listed by 1502 Properties, with photos, prices and locations.`,
    };
  }
}

// Sets a canonical URL that matches the current page. Without this, the static
// canonical in index.html would point every page at the homepage.
function SeoRoute() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const page = PAGES[path];

  return (
    <Helmet>
      <link rel="canonical" href={`${SITE_URL}${path === "/" ? "/" : path}`} />
      {page && <title>{page.title}</title>}
      {page && <meta name="description" content={page.description} />}
      {page && <meta property="og:title" content={page.title} />}
      {page && <meta property="og:description" content={page.description} />}
      {page && <meta property="og:url" content={`${SITE_URL}${path}`} />}
    </Helmet>
  );
}

export default SeoRoute;
