"use client";

import Link from "next/link";
import { Box, Typography, useMediaQuery } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import LiquidGlass from "./LiquidGlass";
import NeonLogo from "./NeonLogo";

const menuItems = [
  { href: "/", label: "خانه", Icon: HomeRoundedIcon, color: "#f8fbff" },
  { href: "/categories", label: "محصولات", Icon: Inventory2RoundedIcon, color: "#00f0ff" },
  { href: "/projects", label: "پروژه‌ها", Icon: WorkspacesRoundedIcon, color: "var(--landing-secondary)" },
  { href: "/services", label: "خدمات", Icon: DesignServicesRoundedIcon, color: "#57e39b" },
  { href: "/blog", label: "وبلاگ", Icon: AutoStoriesRoundedIcon, color: "#ffd06f" },
  { href: "/about", label: "درباره ما", Icon: InfoRoundedIcon, color: "#c8a7ff" },
  { href: "/contact", label: "تماس", Icon: ContactPhoneRoundedIcon, color: "#ff8e9a" },
];

const orbitDefinitions = [
  { tilt: -16, duration: 20 },
  { tilt: 48, duration: 25 },
  { tilt: 112, duration: 29 },
];

export default function EnergyAtomMenu({ compact = false, onNavigate, ariaLabel = "منوی اتمی صفحات سایت" }) {
  const smallViewport = useMediaQuery("(max-width:600px)");
  const isCompact = compact || smallViewport;
  const stageSize = isCompact ? 420 : 560;
  const radii = isCompact
    ? [[136, 66], [154, 104], [170, 142]]
    : [[198, 88], [228, 112], [246, 142]];
  const nodeWidth = isCompact ? 92 : 108;

  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      className="energy-atom-menu"
      sx={{
        position: "relative",
        width: isCompact ? "min(420px, 100%)" : "100%",
        maxWidth: stageSize,
        height: stageSize,
        mx: "auto",
        isolation: "isolate",
        top: isCompact ? 22 : 28,
        filter: "drop-shadow(0 28px 70px rgba(0,0,0,.38))",
      }}
    >
      <Box className="energy-atom-aura" aria-hidden />
      {orbitDefinitions.map((orbit, index) => (
        <Box
          key={orbit.tilt}
          aria-hidden
          className="energy-atom-track"
          sx={{
            width: radii[index][0] * 2,
            height: radii[index][1] * 2,
            transform: `translate(-50%, -50%) rotate(${orbit.tilt}deg)`,
            opacity: .42 - index * .07,
          }}
        />
      ))}

      <Box className="energy-atom-core-shell">
        <Box className="energy-atom-core-halo" aria-hidden />
        <LiquidGlass intensity="strong" className="energy-atom-core-glass">
          <Box className="energy-atom-core-shine" aria-hidden />
          <NeonLogo animated sx={{ width: isCompact ? 116 : 168 }} />
          <Typography color="text.secondary" sx={{ mt: 1.2, direction: "ltr", fontFamily: "monospace", fontSize: isCompact ? ".52rem" : ".62rem", letterSpacing: ".18em" }}>
            ENERGY CORE
          </Typography>
        </LiquidGlass>
      </Box>

      {menuItems.map((item, index) => {
        const radiusX = isCompact ? "clamp(124px, 34vw, 154px)" : "220px";
        const radiusY = isCompact ? "clamp(116px, 32vw, 145px)" : "205px";
        const orbitTilt = -14;
        const phase = index * (100 / menuItems.length);
        const transformOrbitAngle = orbitTilt + phase * 3.6;
        const transformOrbitRadians = (transformOrbitAngle * Math.PI) / 180;
        const duration = 184;
        const { Icon } = item;

        return (
          <Box
            key={item.href}
            className={`energy-atom-electron-plane${isCompact ? " energy-atom-static-plane" : ""}`}
            style={isCompact ? {
              top: `${50 + Math.sin(transformOrbitRadians) * 34}%`,
              left: `${50 + Math.cos(transformOrbitRadians) * 34}%`,
            } : undefined}
            sx={!isCompact ? { transform: `rotate(${orbitTilt}deg)` } : undefined}
          >
            <Box
              className="energy-atom-electron"
              sx={{
                width: isCompact ? 0 : nodeWidth,
                mt: isCompact ? 0 : "-29px",
                ml: isCompact ? 0 : `${-nodeWidth / 2}px`,
                ...(!isCompact && {
                  offsetPath: `ellipse(${radiusX} ${radiusY} at 0 0)`,
                  offsetDistance: `${phase}%`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${-(duration * phase) / 100}s`,
                }),
              }}
            >
              <Box
                className={`energy-atom-electron-card${isCompact ? " energy-atom-static-card" : ""}`}
                sx={isCompact ? {
                  width: nodeWidth,
                } : { transform: `rotate(${-orbitTilt}deg)` }}
              >
                <LiquidGlass
                  component={Link}
                  href={item.href}
                  onClick={onNavigate}
                  interactive
                  intensity="medium"
                  className="energy-atom-link"
                  sx={{ "--atom-color": item.color, minHeight: isCompact ? 50 : 58, px: isCompact ? 1 : 1.4 }}
                >
                  <Icon sx={{ color: item.color, fontSize: isCompact ? 18 : 21, filter: `drop-shadow(0 0 8px ${item.color})` }} />
                  <Typography sx={{ fontSize: isCompact ? ".64rem" : ".72rem", fontWeight: 800, whiteSpace: "nowrap" }}>{item.label}</Typography>
                </LiquidGlass>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
