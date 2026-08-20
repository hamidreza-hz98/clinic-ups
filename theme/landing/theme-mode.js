"use client";

import { createContext, useContext } from "react";

export const LandingThemeModeContext = createContext(null);

export function useLandingThemeMode() {
  const context = useContext(LandingThemeModeContext);
  if (!context) throw new Error("useLandingThemeMode must be used within LandingThemeProvider");
  return context;
}
