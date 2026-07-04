"use client";

import { createContext, useContext, useState } from "react";

const LandingDataContext = createContext(null);

export function useLandingData() {
  const ctx = useContext(LandingDataContext);

  if (!ctx) {
    throw new Error("useLandingData must be used within LandingDataProvider");
  }
  return ctx;
}

export default function LandingDataProvider({ data, children }) {
  // Optionally, wrap other data in state if you want to update them too
  const [categories] = useState(data.categories);
  const [settings] = useState(data.settings);
  const [services] = useState(data.services);

  return (
    <LandingDataContext.Provider
      value={{
        categories,
        settings,
        services
      }}
    >
      {children}
    </LandingDataContext.Provider>
  );
}
