"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createLandingTheme } from "./theme";
import { LandingThemeModeContext } from "./theme-mode";

const storageKey = "landing_theme";

function readSavedMode() {
  const localMode = window.localStorage.getItem(storageKey);
  if (localMode === "dark" || localMode === "light") return localMode;
  const cookieMode = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${storageKey}=`))
    ?.split("=")[1];
  if (cookieMode === "dark" || cookieMode === "light") return cookieMode;
  return null;
}

export default function LandingThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [followsDevice, setFollowsDevice] = useState(true);

  useEffect(() => {
    const savedMode = readSavedMode();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const initialMode = savedMode || (media.matches ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(initialMode);
    setFollowsDevice(!savedMode);

    const handleDeviceChange = (event) => {
      if (!readSavedMode()) setMode(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", handleDeviceChange);
    return () => media.removeEventListener("change", handleDeviceChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.landingTheme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const setThemeMode = useCallback((nextMode) => {
    if (nextMode !== "dark" && nextMode !== "light") return;
    setMode(nextMode);
    setFollowsDevice(false);
    window.localStorage.setItem(storageKey, nextMode);
    document.cookie = `${storageKey}=${nextMode}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const theme = useMemo(() => createLandingTheme(mode), [mode]);
  const value = useMemo(
    () => ({ themeMode: mode, setThemeMode, followsDevice }),
    [followsDevice, mode, setThemeMode],
  );

  return (
    <LandingThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </LandingThemeModeContext.Provider>
  );
}
