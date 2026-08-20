"use client";

import { useEffect, useMemo, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import CategoryTechCard, {
  selectFeaturedCategories,
} from "../categories/CategoryTechCard";

export default function CategoriesSection({ categories = [] }) {
  const sectionRef = useRef(null);
  const featured = useMemo(() => selectFeaturedCategories(categories), [categories]);

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
        bgcolor: "background.paper",
        py: { xs: 10, md: 14 },
        backgroundImage:
          "radial-gradient(circle at 2px 2px, rgba(var(--landing-secondary-rgb),.12) 1px, transparent 0)",
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
          bgcolor: "rgba(var(--landing-accent-rgb),.035)",
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
              <CategoryTechCard category={category} index={index} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
