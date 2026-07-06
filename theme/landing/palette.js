const themeColors = {
  primary: {
    light: "#3B6DA0",
    main: "#01417E",
    dark: "#012D59",
    contrastText: "#FFFFFF",
  },

  secondary: {
    light: "#F04B4F",
    main: "#DE0D11",
    dark: "#B4090D",
    contrastText: "#FFFFFF",
  },

  error: {
    light: "#EF5350",
    main: "#D32F2F",
    dark: "#B71C1C",
    contrastText: "#FFFFFF",
  },

  warning: {
    light: "#FFCC80",
    main: "#F59E0B",
    dark: "#B45309",
    contrastText: "#FFFFFF",
  },

  info: {
    light: "#60A5FA",
    main: "#2563EB",
    dark: "#1D4ED8",
    contrastText: "#FFFFFF",
  },

  success: {
    light: "#4ADE80",
    main: "#16A34A",
    dark: "#166534",
    contrastText: "#FFFFFF",
  },

  grey: {
    50: "#FCFCFB",
    100: "#F7F6F4",
    200: "#ECEAE7",
    300: "#DDDAD5",
    400: "#B8B5B0",
    500: "#8B8883",
    600: "#66635E",
    700: "#4A4845",
    800: "#2E2D2B",
    900: "#181818",
  },

  background: {
    default: "#FAF8F5",
    paper: "#FFFFFF",
    elevated: "#FFFFFF",
    subtle: "#F4F5F7",
  },

  text: {
    primary: "#1D2430",
    secondary: "#5B6575",
    disabled: "#A4AAB5",
    inverse: "#FFFFFF",
  },

  divider: "#E7E9EE",

  action: {
    hover: "rgba(1,65,126,0.05)",
    selected: "rgba(1,65,126,0.10)",
    focus: "rgba(1,65,126,0.15)",
    disabled: "rgba(0,0,0,0.26)",
    disabledBackground: "#ECECEC",
  },

  brand: {
    red: "#DE0D11",
    redLight: "#F04B4F",
    redDark: "#B4090D",

    blue: "#01417E",
    blueLight: "#3B6DA0",
    blueDark: "#012D59",

    milkyWhite: "#FAF8F5",

    navy: "#0D2742",

    iceBlue: "#EEF4FA",

    softRed: "#FCEAEA",

    surfaceBlue: "#F5F9FD",

    borderBlue: "#D5E3F1",
  },
};

const palette = {
  mode: "light",

  primary: themeColors.primary,

  secondary: themeColors.secondary,

  error: themeColors.error,

  warning: themeColors.warning,

  info: themeColors.info,

  success: themeColors.success,

  grey: themeColors.grey,

  background: {
    default: themeColors.background.default,
    paper: themeColors.background.paper,
  },

  text: themeColors.text,

  divider: themeColors.divider,
};

export default palette;
