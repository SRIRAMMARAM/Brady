export type StayIntent =
  | "family-comfort"
  | "quiet-getaway"
  | "romantic-escape"
  | "spacious-group"
  | "simple-overnight";

export interface Room {
  id: string;
  type: string;
  name: string;
  tagline: string;
  story: string;
  description: string;
  price: number;
  priceUnit: string;
  guests: string;
  maxGuests: number;
  beds: string;
  amenities: string[];
  image: string;
  accent: "gold" | "warm" | "rose";
  intents: StayIntent[];
  featured?: boolean;
}

export const rooms: Room[] = [
  {
    id: "the-fireside-room",
    type: "Standard Queen",
    name: "The Fireside Room",
    tagline: "Warm light. Soft bed. Everything else can wait.",
    story:
      "You drove through the pines and the world got quiet. The Fireside Room exists for exactly this moment — a queen bed, a glow that feels like amber on wood, and nothing demanding your attention. Some stays don't need to be complicated. This one isn't.",
    description:
      "A cozy queen cabin room where warmth is the amenity. Rough-hewn timber accents, handstitched linens, and a window that opens to nothing but trees.",
    price: 79,
    priceUnit: "per night",
    guests: "1–2 Guests",
    maxGuests: 2,
    beds: "1 Queen Bed",
    amenities: [
      "Handstitched cabin quilts",
      "Walk-in rainfall shower",
      "Smart 4K TV",
      "Blackout timber shutters",
      "Complimentary cabin breakfast",
      "High-speed Wi-Fi",
    ],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80",
    accent: "warm",
    intents: ["simple-overnight", "quiet-getaway"],
  },
  {
    id: "the-timber-king",
    type: "King Room",
    name: "The Timber King",
    tagline: "Solid ground under heavy beams.",
    story:
      "Heavy oak frames. A king bed with the weight of a long drive behind you. The Timber King is where you unplug — no agenda, no inbox, just the sound of pines and the satisfaction of a room that knows exactly what it is. Designed for two, built for presence.",
    description:
      "A spacious king cabin room with exposed timber beams, deep earth tones, and a reading corner that turns any evening into something worth remembering.",
    price: 99,
    priceUnit: "per night",
    guests: "2 Guests",
    maxGuests: 2,
    beds: "1 King Bed",
    amenities: [
      "King-size premium mattress",
      "Deep cedar soaking tub",
      "Private reading nook",
      "Curated cabin minibar",
      "Evening turndown service",
      "Pillow menu",
    ],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=80",
    accent: "gold",
    intents: ["quiet-getaway", "simple-overnight"],
    featured: true,
  },
  {
    id: "the-family-lodge",
    type: "Two Queen Beds",
    name: "The Family Lodge",
    tagline: "Room for everyone. Space for everything.",
    story:
      "This isn't just a room with two beds. It's where the kids pile in at 7am. Where everyone argues over the remote. Where the real stories of the trip are told over a shared breakfast. The Family Lodge feels like home — because that's exactly what it's supposed to feel like.",
    description:
      "A generously laid-out cabin room with two queen beds, warm lodge-style design, and every comfort thought through for families of two to four.",
    price: 99,
    priceUnit: "per night",
    guests: "2–4 Guests",
    maxGuests: 4,
    beds: "2 Queen Beds",
    amenities: [
      "2 premium queen beds",
      "Separate vanity area",
      "Mini fridge & microwave",
      "Kids' cabin welcome kit",
      "Board games & trail maps",
      "Extra linen sets",
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
    accent: "warm",
    intents: ["family-comfort", "spacious-group"],
    featured: true,
  },
  {
    id: "the-honeymoon-cabin",
    type: "Honeymoon Suite",
    name: "The Honeymoon Cabin",
    tagline: "Just the two of you. As it always should be.",
    story:
      "Candlelight on log walls. A soaking tub by the window. Champagne waiting on the dresser. The Honeymoon Cabin at Brady Casa Inn was built for one specific kind of stay — the kind you'll still talk about years later. We don't oversell it. We just make sure everything is perfect.",
    description:
      "An intimate suite with romance-forward cabin design, a stone fireplace, private deck, and a soaking tub that looks out into the trees.",
    price: 150,
    priceUnit: "per night",
    guests: "2 Guests",
    maxGuests: 2,
    beds: "1 King Bed",
    amenities: [
      "King canopy bed with cabin linens",
      "Stone fireplace",
      "Deep soaking tub for two",
      "Private wraparound deck",
      "Champagne on arrival",
      "Rose petal turndown",
    ],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=80",
    accent: "rose",
    intents: ["romantic-escape"],
    featured: true,
  },
  {
    id: "the-brady-loft",
    type: "Loft Suite",
    name: "The Brady Loft",
    tagline: "High ceilings. Big table. Bring everyone.",
    story:
      "The Loft is Brady Casa Inn's biggest personality. Double-height timber ceilings, an open floor plan that actually breathes, a kitchen table big enough for the whole crew, and a loft-level queen so everyone gets their own space. It's the room that makes group trips worth taking.",
    description:
      "Our signature loft suite — double-height cabin ceilings, an open-plan great room, full kitchenette, and a loft bedroom that floats above it all.",
    price: 126,
    priceUnit: "per night",
    guests: "2–4 Guests",
    maxGuests: 4,
    beds: "1 King + Loft Queen",
    amenities: [
      "Double-height timber-frame ceiling",
      "King bed + loft-level queen",
      "Full kitchenette",
      "Farmhouse dining table",
      "Floor-to-ceiling pine windows",
      "Smart cabin controls",
    ],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
    accent: "gold",
    intents: ["spacious-group", "family-comfort"],
    featured: true,
  },
];

export const featuredRooms = rooms.filter((r) => r.featured);

export const intentMap: Record<StayIntent, string> = {
  "family-comfort":   "the-family-lodge",
  "quiet-getaway":    "the-timber-king",
  "romantic-escape":  "the-honeymoon-cabin",
  "spacious-group":   "the-brady-loft",
  "simple-overnight": "the-fireside-room",
};
