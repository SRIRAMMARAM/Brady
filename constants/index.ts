export const SITE_NAME = "Brady Inn";
export const SITE_TAGLINE = "Log Cabin Luxury, Lofted in Love";
export const SITE_DESCRIPTION =
  "A boutique cabin inn where rustic warmth meets refined comfort. Five rooms, five stories — each one made for a different kind of stay.";

export const NAV_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Experience", href: "/experience" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
];

export const CONTACT_INFO = {
  phone: "+1 (800) BCA-CASA",
  email: "hello@bradycasainn.com",
  address: "1 Brady Creek Road, Mountain View, CA 94035",
  coordinates: "37.3861° N, 122.0839° W",
};

export const AMENITIES_ICONS = [
  "pool",
  "spa",
  "restaurant",
  "gym",
  "concierge",
  "chauffeur",
  "jet",
  "helipad",
];

export const BOOKING_LIMITS = {
  minNights: 1,
  maxNights: 30,
  maxGuests: 10,
  advanceDays: 365,
};

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.4,
} as const;

export const EASING = {
  luxury: [0.16, 1, 0.3, 1],
  cinematic: [0.77, 0, 0.175, 1],
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.34, 1.56, 0.64, 1],
} as const;
