"use client";

import { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useLandingThemeMode } from "@/theme/landing/theme-mode";

const options = [
  { value: "light", label: "روشن", Icon: LightModeRoundedIcon },
  { value: "dark", label: "تیره", Icon: DarkModeRoundedIcon },
];

export default function LandingThemeMenu() {
  const { themeMode, setThemeMode } = useLandingThemeMode();
  const [anchor, setAnchor] = useState(null);
  const ActiveIcon = themeMode === "dark" ? DarkModeRoundedIcon : LightModeRoundedIcon;

  const close = () => setAnchor(null);
  const selectMode = (mode) => {
    setThemeMode(mode);
    close();
  };

  return (
    <>
      <Tooltip title="پوسته نمایش">
        <IconButton
          className="header-icon-action"
          aria-label="انتخاب پوسته نمایش"
          aria-controls={anchor ? "landing-theme-menu" : undefined}
          aria-expanded={Boolean(anchor)}
          aria-haspopup="menu"
          onClick={(event) => setAnchor(event.currentTarget)}
          color="inherit"
        >
          <ActiveIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="landing-theme-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={close}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 156,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 18px 55px rgba(5,20,38,.18)",
            },
          },
        }}
      >
        {options.map(({ value, label, Icon }) => (
          <MenuItem
            key={value}
            selected={themeMode === value}
            onClick={() => selectMode(value)}
            sx={{ minHeight: 46, gap: 1 }}
          >
            <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
            <ListItemText>{label}</ListItemText>
            {themeMode === value && <CheckRoundedIcon color="primary" fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
