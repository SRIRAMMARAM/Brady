export const luxuryTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const cinematicTransition = {
  duration: 1.4,
  ease: [0.77, 0, 0.175, 1] as const,
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};
