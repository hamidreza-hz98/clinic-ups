"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import { serviceCatalog as services } from "../services/serviceCatalog";

function ServiceCard({ service, index }) {
  const { Icon } = service;

  return (
    <Box
      className="services-timeline-item"
      sx={{
        gridColumn: { xs: "1", md: service.gridColumn },
        mt: { xs: 0, md: index === 3 ? -6 : 0 },
        "--service-accent": service.color,
        "--service-delay": `${120 + index * 150}ms`,
      }}
    >
      <LiquidGlass
        component={Link}
        href={service.href}
        intensity="medium"
        interactive
        className="services-timeline-card"
        aria-label={`${service.title}؛ مشاهده جزئیات`}
        sx={{
          display: "block",
          minHeight: { xs: 310, md: 330 },
          p: { xs: 3.25, md: 4.5 },
          color: "inherit",
          textDecoration: "none",
          borderRadius: 0,
        }}
      >
        <Box className="service-card-glow" aria-hidden />
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box className="service-icon-shell">
            <Icon className="service-timeline-icon" sx={{ fontSize: { xs: 38, md: 48 }, color: service.color }} />
          </Box>
          <Stack alignItems="flex-end" spacing={0.6}>
            <Typography className="service-index" sx={{ color: service.color }}>{service.number}</Typography>
            <Typography className="service-eyebrow">{service.eyebrow}</Typography>
          </Stack>
        </Stack>

        <Typography component="h3" sx={{ mb: 1.6, fontSize: { xs: "1.55rem", md: "1.9rem" }, fontWeight: 800 }}>
          {service.title}
        </Typography>
        <Typography color="text.secondary" sx={{ minHeight: { md: 84 }, lineHeight: 2 }}>
          {service.description}
        </Typography>

        <Stack className="service-card-action" direction="row" alignItems="center" spacing={1} sx={{ mt: 3.5, color: service.color }}>
          <Typography sx={{ fontSize: ".82rem", fontWeight: 800 }}>مشاهده جزئیات خدمت</Typography>
          <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
        </Stack>
        <Box className="service-card-corner" aria-hidden />
      </LiquidGlass>
    </Box>
  );
}

export default function ServicesTimelineSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="core-services"
      className={`services-timeline-section${visible ? " is-visible" : ""}`}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        py: { xs: 10, md: 15 },
        borderTop: "1px solid rgba(var(--landing-secondary-rgb),.08)",
      }}
    >
      <Box className="services-grid-floor" aria-hidden />
      <Box className="services-ambient services-ambient-primary" aria-hidden />
      <Box className="services-ambient services-ambient-secondary" aria-hidden />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          justifyContent="space-between"
          spacing={4}
          sx={{ mb: { xs: 7, md: 11 } }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Chip
              icon={<HubRoundedIcon />}
              label="چرخه کامل خدمات انرژی"
              variant="outlined"
              color="primary"
              sx={{ mb: 2.5, bgcolor: "rgba(var(--landing-accent-rgb),.05)", borderColor: "rgba(var(--landing-accent-rgb),.24)" }}
            />
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.35rem", md: "3.8rem" }, mb: 2 }}>
              خدمات تخصصی <Box component="span" sx={{ color: "primary.main" }}>کلینیک یو پی اس</Box>
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 700, fontSize: { xs: ".95rem", md: "1.08rem" }, lineHeight: 2 }}>
              فراتر از فروش، در تمام مراحل طراحی، تأمین، تعمیر و پایداری شبکه توزیع انرژی همراه شما هستیم.
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={2} className="services-section-counter">
            <Typography sx={{ color: "primary.main", fontSize: "2.25rem", fontWeight: 300, fontFamily: "monospace" }}>04</Typography>
            <Box>
              <Typography sx={{ fontSize: ".7rem", color: "text.secondary", letterSpacing: ".12em" }}>CORE SERVICES</Typography>
              <Typography sx={{ fontSize: ".82rem", fontWeight: 700 }}>خدمات محوری ما</Typography>
            </Box>
          </Stack>
        </Stack>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, minmax(0, 1fr))" },
            gap: { xs: 3, md: 4 },
            rowGap: { md: 10 },
          }}
        >
          <Box
            component="svg"
            className="services-connector-map"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path className="services-path path-primary" d="M170 150 L410 340 L790 155 L1040 455" />
            <path className="services-path path-secondary" d="M100 585 L480 490 L690 690 L1110 390" />
            <circle className="services-path-node" cx="410" cy="340" r="5" />
            <circle className="services-path-node is-secondary" cx="790" cy="155" r="5" />
          </Box>

          {services.map((service, index) => (
            <ServiceCard key={service.href} service={service} index={index} />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 7, md: 10 } }}>
          <MagneticButton
            href="/services"
            variant="contained"
            color="primary"
            endIcon={<AppsRoundedIcon />}
            sx={{ minWidth: 190, boxShadow: "0 16px 42px rgba(var(--landing-accent-rgb),.2)" }}
          >
            مشاهده همه خدمات
          </MagneticButton>
        </Box>
      </Container>
    </Box>
  );
}
