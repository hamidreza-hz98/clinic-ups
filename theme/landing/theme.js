import { createTheme } from "@mui/material/styles";

import darkPalette from "./palette.dark";
import lightPalette from "./palette.light";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows from "./shadows";
import shape from "./shape";
import transitions from "./transitions";
import getComponents from "./components";

export function createLandingTheme(mode = "dark") {
  const palette = mode === "light" ? lightPalette : darkPalette;
  const baseTheme = createTheme({
    direction: "rtl",
    palette,
    typography,
    breakpoints,
    shadows,
    shape,
    transitions,
  });

  return createTheme(baseTheme, { components: getComponents(baseTheme) });
}

export default createLandingTheme("dark");
