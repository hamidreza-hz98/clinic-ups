"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Chip, CircularProgress, Container, Typography } from "@mui/material";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { getAllCategories } from "@/app/actions/category";
import CategoryTechCard from "./CategoryTechCard";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";

export default function CategoriesOverviewPage() {
  const sectionRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      const response = await getAllCategories({ page_size: 100 });
      if (!active) return;

      if (response?.status && response.status >= 400) {
        setError(response.message || "دریافت دسته‌بندی‌ها با خطا روبه‌رو شد.");
      } else {
        setCategories(response?.data?.categories || []);
      }
      setLoading(false);
    }

    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !categories.length) return undefined;

    const revealItems = section.querySelectorAll(".category-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: "relative",
        isolation: "isolate",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: "#070B12",
        color: "text.primary",
        pt: { xs: 14, md: 12 },
        pb: { xs: 11, md: 16 },
      }}
    >
      <EnergyShaderBackground />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(143,183,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(143,183,255,.11) 1px, transparent 1px)",
          backgroundSize: { xs: "34px 34px", md: "54px 54px" },
          maskImage: "linear-gradient(to bottom, black, transparent 68%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          className="hero-reveal hero-reveal-1"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
            alignItems: "end",
            gap: { xs: 4, md: 8 },
            mb: { xs: 7, md: 11 },
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <Chip
              icon={<BoltRoundedIcon />}
              label="راهکارهای پایدار انرژی"
              variant="outlined"
              sx={{
                mb: 3,
                color: "primary.light",
                borderColor: "rgba(0,219,231,.28)",
                bgcolor: "rgba(0,219,231,.055)",
                "& .MuiChip-icon": { color: "primary.main" },
              }}
            />
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: "2.55rem", sm: "3.4rem", md: "5rem" },
                lineHeight: 1.18,
                letterSpacing: "-.035em",
                mb: 2.2,
              }}
            >
              دسته‌بندی محصولات
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 680, fontSize: { xs: ".98rem", md: "1.15rem" }, lineHeight: 2 }}
            >
              مجموعه‌ای از راهکارهای تخصصی برای حفاظت، ذخیره‌سازی و تأمین بدون وقفه انرژی؛
              متناسب با زیرساخت‌های حساس و نیازهای صنعتی.
            </Typography>
          </Box>

          <LiquidGlass
            intensity="strong"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: { md: 220 },
              px: 3,
              py: 2.5,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                flex: "0 0 auto",
                borderRadius: "50%",
                color: "primary.main",
                bgcolor: "rgba(0,219,231,.09)",
                border: "1px solid rgba(0,219,231,.2)",
              }}
            >
              <GridViewRoundedIcon />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ direction: "ltr", lineHeight: 1 }}>
                {loading ? "—" : categories.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                دسته تخصصی
              </Typography>
            </Box>
          </LiquidGlass>
        </Box>

        {loading ? (
          <Box sx={{ minHeight: 360, display: "grid", placeItems: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={34} thickness={2.7} />
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                در حال آماده‌سازی دسته‌بندی‌ها
              </Typography>
            </Box>
          </Box>
        ) : error ? (
          <LiquidGlass
            role="alert"
            intensity="medium"
            sx={{ maxWidth: 620, mx: "auto", p: 4, borderRadius: 4, textAlign: "center" }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              بارگذاری دسته‌بندی‌ها ممکن نشد
            </Typography>
            <Typography color="text.secondary">{error}</Typography>
          </LiquidGlass>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(6, minmax(0, 1fr))" },
              gap: { xs: 3, md: 3 },
              width: "100%",
              overflow: "visible",
            }}
          >
            {categories.map((category, index) => (
              <Box
                key={category._id}
                className="category-reveal"
                sx={{
                  minWidth: 0,
                  transitionDelay: `${Math.min(index, 6) * 90}ms`,
                  gridColumn: { xs: "1", md: index < 3 ? "span 2" : "span 3" },
                }}
              >
                <CategoryTechCard category={category} index={index} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
