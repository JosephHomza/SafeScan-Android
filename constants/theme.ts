export const theme = {
  colors: {
    background: "#060b12",
    backgroundEnd: "#111827",
    surface: "rgba(13, 24, 43, 0.88)",
    surfaceElevated: "rgba(10, 18, 33, 0.95)",
    primary: "#67f2c8",
    primaryGlow: "#1fd6a3",
    accent: "#67f2c8",
    blue: "#5a8cff",
    violet: "#8d6bff",
    safe: "#50e3a4",
    suspicious: "#ffbb55",
    danger: "#ff6e7f",
    textPrimary: "#edf4ff",
    textSecondary: "#98a9c2",
    border: "rgba(255, 255, 255, 0.09)",
    muted: "#98a9c2"
  },
  spacing: {
    screen: 16,
    card: 14
  },
  radius: {
    card: 8,
    pill: 999
  },
  fonts: {
    ui: "Inter",
    mono: "SpaceMono"
  }
} as const;

export type Theme = typeof theme;
