export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  stayType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aria Voss",
    title: "Creative Director, Voss Studio",
    location: "Berlin, Germany",
    quote:
      "NOX AETHER does not feel like a hotel. It feels like the future has been folded into a room and handed to you. Nothing in my 40 countries of travel compares.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    stayType: "Obsidian Suite — 7 nights",
  },
  {
    id: "t2",
    name: "Kenji Tanaka",
    title: "Architect, Tanaka + Partners",
    location: "Tokyo, Japan",
    quote:
      "As someone who designs spaces professionally, I rarely feel genuinely transported by architecture. NOX AETHER shattered that. The Chromatic Loft was my studio, my sanctuary, my muse.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    stayType: "Chromatic Loft — 4 nights",
  },
  {
    id: "t3",
    name: "Celeste Okafor",
    title: "Founder, Aura Ventures",
    location: "Lagos & London",
    quote:
      "The Void Chamber reset something in me I didn't know was broken. The silence, the precision, the absolute zero of noise — I returned from a week there a different person.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    stayType: "Void Chamber — 5 nights",
  },
  {
    id: "t4",
    name: "Marcus Delacroix",
    title: "Film Director",
    location: "Paris, France",
    quote:
      "Every frame in NOX AETHER is a composition. I checked in for three nights to decompress post-production and left six nights later, having written my next film.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    stayType: "Aether Residence — 6 nights",
  },
  {
    id: "t5",
    name: "Zara Mikhailova",
    title: "Collector & Philanthropist",
    location: "Dubai, UAE",
    quote:
      "We host at the finest properties globally. NOX AETHER is the only place our guests consistently ask to return to before they have even left. That is the mark of something exceptional.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    stayType: "Nebula Suite — 10 nights",
  },
];
