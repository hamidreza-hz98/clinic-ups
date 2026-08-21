"use client";

import Link from "next/link";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { setImagePath } from "@/lib/landing/general";
import SpotlightGlass from "../ui/SpotlightGlass";
import LiquidGlass from "../ui/LiquidGlass";

export default function ProjectShowcaseCard({ project, index = 0, compact = false, forceVisible = false }) {
  const image = setImagePath(project?.media?.[0]?.path);

  return (
    <SpotlightGlass
      component={Link}
      href={`/projects/${project.slug}`}
      intensity="medium"
      interactive
      className={`project-showcase-card${forceVisible ? " is-visible" : ""}`}
      sx={{
        "--project-card-delay": `${Math.min(index, 8) * 80}ms`,
        minHeight: compact ? 390 : { xs: 440, md: 510 },
        display: "flex",
        alignItems: "flex-end",
        p: { xs: 2, md: compact ? 2 : 2.5 },
        borderRadius: 5,
        color: "inherit",
      }}
    >
      <Box sx={{ display: "contents" }}>
        <Box
        component="img"
        src={image}
        alt={project?.media?.[0]?.mediaAlt || project.name}
        className="project-showcase-image"
        loading="lazy"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
        <Box className="project-showcase-overlay" />
        <Box className="project-showcase-grid" aria-hidden />

        <LiquidGlass intensity="strong" className="project-showcase-copy" sx={{ position: "relative", zIndex: 3, width: "100%", p: { xs: 1.75, md: 2 }, borderRadius: 3.5 }}>
        <Stack direction="row" spacing={.75} flexWrap="wrap" useFlexGap sx={{ mb: 1.25 }}>
          {(project.categories || []).slice(0, 2).map((category, categoryIndex) => (
            <Chip key={`${category._id || category.name}-${categoryIndex}`} label={category.name} size="small" className="selected-project-chip" />
          ))}
          {project.location && (
            <Chip key="project-location" icon={<LocationOnRoundedIcon />} label={project.location} size="small" className="selected-project-chip" />
          )}
        </Stack>

        <Typography component="h2" sx={{ fontSize: { xs: "1.35rem", md: compact ? "1.35rem" : "1.55rem" }, fontWeight: 900, lineHeight: 1.45, mb: .75 }}>
          {project.name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: ".84rem",
            lineHeight: 1.75,
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.excerpt || "اجرای تخصصی راهکارهای برق اضطراری و پایداری انرژی متناسب با الزامات پروژه."}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ pt: 1.25, borderTop: "1px solid rgba(255,255,255,.16)" }}>
          {project.customer && (
            <Stack direction="row" alignItems="center" spacing={0.7} sx={{ minWidth: 0 }}>
              <BusinessRoundedIcon sx={{ color: "primary.main", fontSize: 17 }} />
              <Typography noWrap sx={{ color: "text.secondary", fontSize: ".72rem", maxWidth: 120 }}>
                {project.customer}
              </Typography>
            </Stack>
          )}
          {project.deliveryDate && (
            <Stack direction="row" alignItems="center" spacing={0.7}>
              <ScheduleRoundedIcon sx={{ color: "primary.main", fontSize: 17 }} />
              <Typography sx={{ color: "text.secondary", fontSize: ".72rem", whiteSpace: "nowrap" }}>
                {project.deliveryDate} روز
              </Typography>
            </Stack>
          )}
          <ArrowBackRoundedIcon className="project-showcase-arrow" sx={{ mr: "auto !important", color: "primary.main" }} />
        </Stack>
        </LiquidGlass>
      </Box>
    </SpotlightGlass>
  );
}
