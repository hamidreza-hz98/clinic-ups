"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { setImagePath } from "@/lib/landing/general";
import LiquidGlass from "../ui/LiquidGlass";

const accents = ["#00DBE7", "#FF9C87", "#8FB7FF", "#00DBE7", "#FF9C87"];
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

function selectFeatured(categories) {
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

function CategoryCard({ category, index }) {
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
          clipPath:
            "polygon(10% 0,100% 0,100% 90%,90% 100%,0 100%,0 10%)",
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
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.9, minHeight: { md: 60 } }}
          >
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

export default function CategoriesSection({ categories = [] }) {
  const sectionRef = useRef(null);
  const featured = useMemo(() => selectFeatured(categories), [categories]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealItems = section.querySelectorAll(".category-reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        revealItems.forEach((item) => item.classList.add("is-visible"));
        observer.disconnect();
      },
      { threshold: 0.14 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!featured.length) return null;

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="product-categories"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0B0F15",
        py: { xs: 10, md: 14 },
        backgroundImage:
          "radial-gradient(circle at 2px 2px, rgba(143,183,255,.12) 1px, transparent 0)",
        backgroundSize: "50px 50px",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: "15% auto auto 50%",
          width: 700,
          height: 360,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          bgcolor: "rgba(0,219,231,.035)",
          filter: "blur(100px)",
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          className="category-reveal"
          sx={{ textAlign: "center", mb: { xs: 7, md: 11 } }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{ fontSize: { xs: "2.35rem", md: "3.7rem" }, mb: 1.5 }}
          >
            دسته‌بندی محصولات
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: ".95rem", md: "1.1rem" } }}
          >
            تکنولوژی پیشرفته در خدمت پایداری انرژی
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(5, minmax(290px, 1fr))",
              md: "repeat(6, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            pb: { xs: 2, md: 0 },
            mx: { xs: -2, md: 0 },
            px: { xs: 2, md: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {featured.map((category, index) => (
            <Box
              key={category._id}
              className="category-reveal"
              sx={{
                transitionDelay: `${120 + index * 130}ms`,
                scrollSnapAlign: "center",
                gridColumn: { md: index < 3 ? "span 2" : "span 3" },
              }}
            >
              <CategoryCard category={category} index={index} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
