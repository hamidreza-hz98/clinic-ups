import { alpha } from "@mui/material/styles";
import { menuItemClasses } from "@mui/material/MenuItem";

export default function getComponents(theme) {
  const { palette, typography, shape } = theme;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #__next": {
          direction: "rtl",
          fontFamily: typography.fontFamily,
          backgroundColor: palette.background?.default,
          color: palette.text?.primary,
        },
        "input, textarea, select, button": {
          fontFamily: typography.fontFamily,
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          padding: "8px 14px",
          marginLeft: "0px !important",
        },
        containedPrimary: { boxShadow: "none" },
        text: { padding: "6px 10px" },
        startIcon: {
          marginRight: 0,
          marginLeft: 8,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: { textTransform: "none" },
        },
      ],
    },

    MuiAppBar: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: { alignItems: "flex-end" },
      },
    },

    MuiToolbar: {
      styleOverrides: { root: { paddingLeft: 16, paddingRight: 16 } },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ ownerState }) => ({
          direction: "rtl",
          ...(ownerState.docked && {
            left: "auto", // This is what you wanted
          }),
        }),
      },
    },

    MuiPaper: {
      styleOverrides: { root: { borderRadius: shape.borderRadius } },
    },

    MuiCard: { styleOverrides: { root: { borderRadius: shape.borderRadius } } },

    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          direction: "rtl", // entire TextField is RTL
          "& .MuiInputBase-root": {
            direction: "rtl", // input content RTL
          },
          "& .MuiInputLabel-root": {
            right: 28,
            left: "auto", // position label to right
            transformOrigin: "top right", // floating label animation
          },
          // Fix the notch/legend for outlined variant
          "& .MuiOutlinedInput-notchedOutline": {
            paddingRight: "8px", // adjust if needed
            paddingLeft: "0px",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          textAlign: "right",
          transformOrigin: "top right",
          right: 28,
          left: 0,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          textAlign: "right",
          paddingRight: "8px", // make the legend appear at right
          paddingLeft: "0px",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: { root: { textAlign: "right" } },
    },

    MuiDialog: {
      defaultProps: { fullWidth: true, maxWidth: "sm" },
      styleOverrides: {
        paper: { borderRadius: 12, padding: "8px", textAlign: "right" },
      },
    },

    MuiTooltip: {
      defaultProps: { arrow: true, placement: "top" },
      styleOverrides: {
        tooltip: { fontSize: "0.85rem", textAlign: "right", direction: "rtl" },
      },
    },

    MuiMenu: {
      styleOverrides: { paper: { direction: "rtl", textAlign: "right" } },
    },

    MuiListItemText: { styleOverrides: { root: { textAlign: "right" } } },

    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          "& + &": { marginRight: 8 },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10, paddingLeft: 8, paddingRight: 8 },
        // label: { paddingLeft: 12, paddingRight: 12 },
        deleteIcon: {
          marginRight: 0,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, textAlign: "right" },
        body: { textAlign: "right" },
      },
    },

    MuiPagination: { styleOverrides: { ul: { justifyContent: "flex-end" } } },

    MuiTabs: { styleOverrides: { root: { direction: "rtl" } } },

    MuiTab: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 10, textAlign: "right" },
        action: { padding: "4px 16px 0 0" },
      },
    },

    MuiSnackbarContent: { styleOverrides: { root: { direction: "rtl" } } },

    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: {
          right: "unset !important",
          left: 8,
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell--textLeft": {
            textAlign: "center",
            justifyContent: "center",
          },
        },
      },
    },
  };
}
