export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Things to Know Before Buying Your First Property",
    excerpt:
      "Purchasing your first property is exciting, but without proper guidance, it can quickly become overwhelming. Here's what to know before signing the dotted line.",
    content: `
Buying your first property is one of the biggest financial decisions you'll ever make. Before diving in, here are the top five things you should keep in mind:

1. **Understand Your Budget**: Know what you can afford. Factor in not just the purchase price but also closing costs, taxes, insurance, and maintenance.

2. **Location Is Everything**: Research the neighborhood, future development plans, school districts, and proximity to amenities.

3. **Get Pre-approved**: Secure a mortgage pre-approval so you know your buying power and appear serious to sellers.

4. **Hire a Professional Inspector**: Don’t skip the inspection—it can save you from costly surprises.

5. **Think Long-Term**: Consider resale value, rental potential, and how the property fits into your 5-10 year life plan.
    `,
    image: "/blog1.jpg",
    date: "2025-07-24",
  },
  {
    id: "2",
    title: "Is Real Estate Still a Good Investment in 2025?",
    excerpt:
      "With changing interest rates and market trends, many are asking: Is property investment still worth it? Here's a breakdown of the current landscape.",
    content: `
The short answer is yes—real estate remains one of the most reliable long-term investments, but the strategy has shifted:

- **Rising Interest Rates**: Higher rates mean higher mortgage costs, so buyers must calculate returns more carefully.
- **Rental Demand Is High**: With inflation and uncertainty, many prefer renting. This opens steady income streams for landlords.
- **Urban Shift**: People are moving to suburban and smaller cities where housing is more affordable.

To succeed, investors should focus on properties in high-demand areas, maintain a strong credit score, and stay informed about local laws.
    `,
    image: "/blog2.jpg",
    date: "2025-07-20",
  },
  {
    id: "3",
    title: "10 Home Staging Tips That Help Sell Properties Faster",
    excerpt:
      "A well-staged home can sell faster and at a better price. Discover simple yet powerful staging tips that leave a lasting impression.",
    content: `
Staging your home isn’t about hiding flaws—it's about showing potential. Here are 10 tips that work:

1. **Declutter Every Room**: Make spaces feel larger and more inviting.
2. **Use Neutral Colors**: Neutral tones appeal to a wider audience.
3. **Enhance Lighting**: Natural light is key. Open curtains and add lamps where needed.
4. **Add Greenery**: Fresh plants add life and warmth.
5. **Upgrade Curb Appeal**: First impressions count—landscape the yard and paint the front door.
6. **Depersonalize**: Buyers should imagine themselves in the space, not you.
7. **Highlight Best Features**: Showcase fireplaces, balconies, or open floor plans.
8. **Add Mirrors**: Mirrors make rooms appear larger and reflect light.
9. **Fix Minor Issues**: Squeaky doors and chipped paint distract buyers.
10. **Create Functional Spaces**: Show that each room has a clear purpose.

These small investments often lead to quicker, more profitable sales.
    `,
    image: "/blog3.jpg",
    date: "2025-07-18",
  },
  {
    id: "4",
    title: "Understanding Land Titles and Documentation in Nigeria",
    excerpt:
      "Land ownership in Nigeria can be tricky. Learn the different types of land titles and the key documents you need to verify before purchase.",
    content: `
Land disputes are common in Nigeria due to unclear ownership and fake documents. Here’s what to know:

### Common Land Titles
- **C of O (Certificate of Occupancy)**: The most recognized legal proof of ownership.
- **Deed of Assignment**: Indicates transfer of ownership from seller to buyer.
- **Governor’s Consent**: Mandatory for valid land transfer after a C of O is issued.
- **Excision and Gazette**: Proof that the land has been released by the government to indigenous owners.

### Must-Have Documents
- **Survey Plan**: Confirms land size and location.
- **Receipt of Payment**: Proves financial transaction.
- **Search Report**: Confirms land status at the Land Registry.

Always consult a property lawyer and verify titles before committing to land purchases.
    `,
    image: "/blog4.jpg",
    date: "2025-07-15",
  },
  {
    id: "5",
    title: "Why Location Matters More Than Ever in Real Estate",
    excerpt:
      "Location has always been a pillar of property value, but in 2025, its importance has grown even more. Here's why.",
    content: `
"Location, location, location" is more than a cliché—it's a fundamental truth of real estate. In today’s market:

- **Remote Work Is Reshaping Demand**: People want space and convenience over proximity to office towers.
- **Infrastructure Projects Boost Value**: Areas near new rail lines, airports, or roads are appreciating rapidly.
- **Safety & Amenities Rule**: Gated communities, proximity to schools, malls, and hospitals are in high demand.

Investing in the right location can increase rental yields and long-term appreciation. Always scout future development plans before buying.
    `,
    image: "/blog5.jpg",
    date: "2025-07-10",
  },
];
