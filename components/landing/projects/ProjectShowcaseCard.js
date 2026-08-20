"use client";

import Link from "next/link";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { setImagePath } from "@/lib/landing/general";
import SpotlightGlass from "../ui/SpotlightGlass";

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
        p: { xs: 3, md: compact ? 3 : 4 },
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

        <Box sx={{ position: "relative", zIndex: 3, width: "100%" }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          {(project.categories || []).slice(0, 2).map((category) => (
            <Chip key={category._id || category.name} label={category.name} size="small" className="selected-project-chip" />
          ))}
          {project.location && (
            <Chip key="project-location" icon={<LocationOnRoundedIcon />} label={project.location} size="small" className="selected-project-chip" />
          )}
        </Stack>

        <Typography component="h2" sx={{ fontSize: { xs: "1.55rem", md: compact ? "1.55rem" : "1.9rem" }, fontWeight: 900, lineHeight: 1.45, mb: 1.2 }}>
          {project.name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            lineHeight: 1.9,
            mb: 2.5,
            display: "-webkit-box",
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.excerpt || "اجرای تخصصی راهکارهای برق اضطراری و پایداری انرژی متناسب با الزامات پروژه."}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 2.2, borderTop: "1px solid rgba(var(--landing-contrast-rgb),.12)" }}>
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
        </Box>
      </Box>
    </SpotlightGlass>
  );
}
