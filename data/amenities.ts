export type AmenityCategory =
  | "food-beverage"
  | "recreation-wellness"
  | "interactive-technology"
  | "outdoor-nature";

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AmenityCategory;
}

export const amenities: Amenity[] = [
  {
    id: "custom-coffee",
    name: "Custom Coffee",
    description: "In-house specialty coffee service for guests — crafted to order, every morning.",
    icon: "coffee",
    category: "food-beverage",
  },
  {
    id: "sports-simulator",
    name: "Sports Simulator Rooms",
    description: "Interactive sports simulation experience. Tee off, swing, and play across virtual courses and arenas.",
    icon: "gamepad",
    category: "recreation-wellness",
  },
  {
    id: "spa",
    name: "Spa & Heart-Shaped Hot Tub",
    description: "A private spa featuring a heart-shaped hot tub — guests fill their own water for an intimate, made-just-for-two ritual.",
    icon: "heart",
    category: "recreation-wellness",
  },
  {
    id: "sauna",
    name: "Dry & Wet Sauna",
    description: "Two saunas, two rituals — choose dry heat for clarity, or wet steam for deep relaxation.",
    icon: "flame",
    category: "recreation-wellness",
  },
  {
    id: "indoor-gym",
    name: "Indoor Gym",
    description: "A fully equipped fitness facility, open to guests around the clock.",
    icon: "dumbbell",
    category: "recreation-wellness",
  },
  {
    id: "interactive-tv",
    name: "Interactive TV",
    description: "Smart, interactive TV systems in every room — stream, browse, and personalize your stay.",
    icon: "tv",
    category: "interactive-technology",
  },
  {
    id: "greenhouse",
    name: "Greenhouse & Garden Walkthrough",
    description: "A nature garden experience accessible to guests — quiet paths, fresh greens, and a moment of stillness.",
    icon: "leaf",
    category: "outdoor-nature",
  },
];

export const amenityCategories: { id: AmenityCategory; label: string }[] = [
  { id: "food-beverage",          label: "Food & Beverage" },
  { id: "recreation-wellness",    label: "Recreation & Wellness" },
  { id: "interactive-technology", label: "Interactive Technology" },
  { id: "outdoor-nature",         label: "Outdoor & Nature" },
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
