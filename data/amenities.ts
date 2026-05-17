export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "wellness" | "dining" | "transport" | "tech" | "experience";
}

export const amenities: Amenity[] = [
  {
    id: "spa",
    name: "Aether Spa",
    description: "12,000 sq ft sanctuary featuring cryotherapy, floatation pods, and signature void treatments.",
    icon: "sparkles",
    category: "wellness",
  },
  {
    id: "restaurant",
    name: "NOCT Restaurant",
    description: "Three Michelin stars. Zero-gravity dessert course. Reservations taken six months in advance.",
    icon: "utensils-crossed",
    category: "dining",
  },
  {
    id: "helipad",
    name: "Private Helipad",
    description: "Direct rooftop arrival. No queues. No crowds. Just your sky.",
    icon: "plane",
    category: "transport",
  },
  {
    id: "pool",
    name: "Infinity Pools",
    description: "Three infinity pools at different altitudes. One is heated to exactly 37°C at all times.",
    icon: "waves",
    category: "wellness",
  },
  {
    id: "ai-concierge",
    name: "AI Concierge",
    description: "Predictive intelligence that learns your preferences before you arrive.",
    icon: "bot",
    category: "tech",
  },
  {
    id: "cinema",
    name: "Private Cinema",
    description: "8K Dolby Atmos screening room with custom programming. Available exclusively per suite.",
    icon: "film",
    category: "experience",
  },
  {
    id: "chauffeur",
    name: "Tesla Fleet",
    description: "Dedicated fleet of Model S Plaid. Silent. Fast. Yours.",
    icon: "car",
    category: "transport",
  },
  {
    id: "wine",
    name: "Cellar & Cave",
    description: "A curated cellar of 8,000 bottles. Personal sommelier. Temperature-controlled tasting room.",
    icon: "wine",
    category: "dining",
  },
];

export const experiences = [
  {
    id: "stargazing",
    title: "Observatory Night",
    description: "Private telescope access with an astrophysicist guide. Limited to 2 guests per session.",
    duration: "4 hours",
    price: 3200,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    tag: "Exclusive",
  },
  {
    id: "culinary",
    title: "Chef's Table Experience",
    description: "Dine inside the kitchen with Executive Chef Ishaan Rao. 18-course tasting menu. One table per night.",
    duration: "5 hours",
    price: 5800,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    tag: "Michelin",
  },
  {
    id: "aerial",
    title: "Aerial Dawn Flight",
    description: "Private helicopter flight at golden hour over the coastline. Champagne included.",
    duration: "90 min",
    price: 4400,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&q=80",
    tag: "Signature",
  },
  {
    id: "deep-spa",
    title: "48-Hour Void Protocol",
    description: "A curated wellness journey through silence, float therapy, sound baths, and biometric reset.",
    duration: "48 hours",
    price: 9800,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    tag: "Transformative",
  },
];
