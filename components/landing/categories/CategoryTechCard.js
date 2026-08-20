"use client";

import { useRef } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { setImagePath } from "@/lib/landing/general";
import LiquidGlass from "../ui/LiquidGlass";

const accents = ["var(--landing-accent)", "#FF9C87", "var(--landing-secondary)", "var(--landing-accent)", "#FF9C87"];
const preferredCategories = [
  ["یو پی اس", "یوپیاس", "ups"],
  ["باتری", "battery"],
  ["استابلایزر", "stabilizer", "stabiliser"],
];

function searchable(category) {
  return [category.name, category.englishName, category.slug, category.value]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("fa");
}

export function selectFeaturedCategories(categories) {
  const selected = [];

  preferredCategories.forEach((terms) => {
    const match = categories.find((category) => {
      const haystack = searchable(category).replace(/[‌\s-]/g, "");
      return terms.some((term) =>
        haystack.includes(term.replace(/[‌\s-]/g, "").toLocaleLowerCase("fa")),
      );
    });
    if (match && !selected.some((item) => item._id === match._id)) {
      selected.push(match);
    }
  });

  categories.forEach((category) => {
    if (selected.length < 5 && !selected.some((item) => item._id === category._id)) {
      selected.push(category);
    }
  });

  return selected.slice(0, 5);
}

function fallbackEnglishName(category) {
  const value = searchable(category);
  if (value.includes("باتری")) return "ENERGY STORAGE";
  if (value.includes("استابلایزر")) return "VOLTAGE PROTECTION";
  if (value.includes("یو پی اس") || value.includes("یوپیاس") || value.includes("ups")) {
    return "POWER SOLUTIONS";
  }
  return (category.value || category.slug || "POWER SYSTEMS")
    .replace(/[-_]/g, " ")
    .toUpperCase();
}

export default function CategoryTechCard({ category, index }) {
  const cardRef = useRef(null);
  const accent = accents[index % accents.length];
  const isWide = index >= 3;

  const handlePointerMove = (event) => {
    if (
      !cardRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cardRef.current.style.setProperty("--tilt-x", `${y * -5}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${x * 6}deg`);
    cardRef.current.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty("--light-y", `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <Box className="category-float" sx={{ animationDelay: `${index * 650}ms` }}>
      <LiquidGlass
        ref={cardRef}
        component={Link}
        href={`/products?category=${category._id}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        intensity="medium"
        className="category-tech-card"
        sx={{
          "--category-accent": accent,
          minHeight: { xs: 440, md: isWide ? 390 : 525 },
          display: "flex",
          alignItems: "flex-end",
          p: { xs: 3, md: 4 },
          color: "text.primary",
          clipPath: "polygon(10% 0,100% 0,100% 90%,90% 100%,0 100%,0 10%)",
        }}
      >
        <Box
          component="img"
          src={setImagePath(category.icon?.path)}
          alt={category.icon?.mediaAlt || category.name}
          loading="lazy"
          className="category-card-image"
          sx={{
            position: "absolute",
            inset: { xs: 0, md: isWide ? "24px 24px 24px auto" : 0 },
            width: { xs: "100%", md: isWide ? "48%" : "100%" },
            height: { xs: "100%", md: isWide ? "calc(100% - 48px)" : "100%" },
            objectFit: "cover",
            borderRadius: { md: isWide ? 3 : 0 },
          }}
        />
        <Box className="category-image-shade" />
        <Box className="category-energy-sweep" aria-hidden />

        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            width: { xs: "100%", md: isWide ? "47%" : "100%" },
            mr: { md: isWide ? "auto" : 0 },
          }}
        >
          <Typography
            sx={{
              color: accent,
              direction: "ltr",
              textAlign: "right",
              fontFamily: "monospace",
              fontSize: ".82rem",
              fontWeight: 700,
              letterSpacing: ".07em",
              mb: 1.3,
            }}
          >
            {category.englishName?.toUpperCase() || fallbackEnglishName(category)}
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            sx={{ fontSize: { xs: "1.75rem", md: "2.1rem" }, mb: 1.2 }}
          >
            {category.name}
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.9, minHeight: { md: 60 } }}>
            {category.excerpt ||
              "راهکاری مطمئن برای تأمین و پایداری انرژی تجهیزات حساس"}
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className="category-accent-line" sx={{ bgcolor: accent }} />
            <Box
              className="category-card-arrow"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, color: accent }}
            >
              <Typography variant="caption">مشاهده محصولات</Typography>
              <ArrowBackRoundedIcon fontSize="small" />
            </Box>
          </Box>
        </Box>
      </LiquidGlass>
    </Box>
  );
}
