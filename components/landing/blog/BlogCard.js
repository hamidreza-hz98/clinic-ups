"use client";

import Link from "next/link";
import moment from "jalali-moment";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";
import SpotlightGlass from "../ui/SpotlightGlass";

export default function BlogCard({ blog, index = 0, featured = false, compact = false, forceVisible = false }) {
  const image = setImagePath(blog?.thumbnail?.[0]?.path);
  const publishedAt = blog?.createdAt
    ? moment(blog.createdAt).locale("fa").format("jD jMMMM jYYYY")
    : "—";

  return (
    <SpotlightGlass
      component={Link}
      href={`/blog/${blog?.slug}`}
      intensity={featured ? "strong" : "medium"}
      interactive
      className={`blog-editorial-card${forceVisible ? " is-visible" : ""}`}
      sx={{
        "--blog-card-delay": `${Math.min(index, 8) * 75}ms`,
        minHeight: featured ? { xs: 490, md: 580 } : compact ? 390 : 455,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 5,
        color: "inherit",
      }}
    >
      <Box sx={{ display: "contents" }}>
        <Box
          component="img"
          src={image}
          alt={blog?.thumbnail?.[0]?.mediaAlt || blog?.title}
          className="blog-editorial-image"
          loading={featured ? "eager" : "lazy"}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box className="blog-editorial-overlay" />
        <Box className="blog-editorial-grid" aria-hidden />

        <Box sx={{ position: "relative", zIndex: 3, width: "100%", p: { xs: 2.75, md: featured ? 4.5 : 3.25 } }}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            {(blog?.categories || []).slice(0, 2).map((category) => (
              <Chip key={category._id || category.name} label={category.name} size="small" className="selected-project-chip" />
            ))}
            {featured && <Chip key="featured-story" label="FEATURED STORY" size="small" className="blog-featured-chip" />}
          </Stack>

          <Typography component="h2" sx={{ fontSize: { xs: featured ? "1.75rem" : "1.42rem", md: featured ? "2.35rem" : "1.55rem" }, fontWeight: 900, lineHeight: 1.55, mb: 1.2 }}>
            {blog?.title}
          </Typography>
          {blog?.excerpt && (
            <Typography color="text.secondary" sx={{ lineHeight: 1.95, mb: 2.3, display: "-webkit-box", WebkitLineClamp: featured ? 3 : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {blog.excerpt}
            </Typography>
          )}

          <Stack direction="row" alignItems="center" spacing={{ xs: 1.3, sm: 2 }} useFlexGap flexWrap="wrap" sx={{ pt: 2, borderTop: "1px solid rgba(var(--landing-contrast-rgb),.12)" }}>
            <Stack direction="row" alignItems="center" spacing={0.65}>
              <CalendarMonthRoundedIcon sx={{ color: "primary.main", fontSize: 17 }} />
              <Typography sx={{ color: "text.secondary", fontSize: ".72rem" }}>{publishedAt}</Typography>
            </Stack>
            {blog?.readTime && (
              <Stack direction="row" alignItems="center" spacing={0.65}>
                <AccessTimeRoundedIcon sx={{ color: "primary.main", fontSize: 17 }} />
                <Typography sx={{ color: "text.secondary", fontSize: ".72rem" }}>{toPersianNumber(blog.readTime)} دقیقه</Typography>
              </Stack>
            )}
            <Stack direction="row" alignItems="center" spacing={0.65}>
              <VisibilityRoundedIcon sx={{ color: "primary.main", fontSize: 17 }} />
              <Typography sx={{ color: "text.secondary", fontSize: ".72rem" }}>{toPersianNumber(blog?.visits || 0)}</Typography>
            </Stack>
            <ArrowBackRoundedIcon className="blog-card-arrow" sx={{ mr: "auto !important", color: "primary.main" }} />
          </Stack>
        </Box>
      </Box>
    </SpotlightGlass>
  );
}
