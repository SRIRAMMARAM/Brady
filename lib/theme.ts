// Shared design tokens — import these instead of inlining raw rgba strings

export const GOLD   = "rgba(212,168,67,0.9)";
export const BG_PAGE = "#050508";
export const BG_DARK = "#080806";
export const TEXT_BODY    = "rgba(200,185,150,0.5)";
export const TEXT_SUBTLE  = "rgba(200,185,150,0.35)";
export const TEXT_MUTED   = "rgba(200,190,160,0.35)";
export const GOLD_GRADIENT = "linear-gradient(90deg, #8a600e, #d4a843)";
export const TEXT_GRADIENT = "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)";
export const FONT_SERIF   = '"Cormorant Garamond", serif';

// Reusable style objects — defined at module scope so React never re-creates them

export const FIELD_STYLE = {
  background:  "rgba(10,10,14,0.7)",
  border:      "1px solid rgba(212,168,67,0.15)",
  color:       "rgba(240,235,220,0.85)",
  colorScheme: "dark" as const,
};

export const CARD_STYLE = {
  background: "rgba(13,13,20,0.5)",
  border:     "1px solid rgba(255,255,255,0.07)",
};

export const ERROR_STYLE = {
  background: "rgba(220,80,80,0.08)",
  border:     "1px solid rgba(220,80,80,0.2)",
  color:      "rgba(220,100,100,0.9)",
};
