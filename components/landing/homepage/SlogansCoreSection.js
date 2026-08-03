"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import LiquidGlass from "../ui/LiquidGlass";

const pillars = [
  {
    id: "experience",
    title: "تجربه",
    description: "بیش از دو دهه سابقه درخشان در تامین برق اضطراری پروژه‌های ملی و حساس کشور.",
    Icon: HistoryEduRoundedIcon,
    accent: "#00dbe7",
    position: "top-right",
  },
  {
    id: "expertise",
    title: "تخصص فنی",
    description: "تیم مهندسی مجرب با گواهینامه‌های بین‌المللی از معتبرترین برندهای جهانی.",
    Icon: PsychologyRoundedIcon,
    accent: "#a7c8ff",
    position: "top-left",
  },
  {
    id: "support",
    title: "پشتیبانی سریع",
    description: "پاسخگویی فوری و اعزام تیم‌های عملیاتی به سراسر کشور در کمترین زمان ممکن.",
    Icon: SpeedRoundedIcon,
    accent: "#ffb4a9",
    position: "bottom-right",
  },
  {
    id: "infrastructure",
    title: "زیرساخت مطمئن",
    description: "بهره‌گیری از انبار قطعات یدکی کامل و کارگاه‌های تعمیراتی مجهز و مدرن.",
    Icon: AccountTreeRoundedIcon,
    accent: "#00dbe7",
    position: "bottom-left",
  },
];

const connections = [
  { path: "M500 300 Q650 200 800 150", color: "#00dbe7", delay: "0s" },
  { path: "M500 300 Q350 200 200 150", color: "#a7c8ff", delay: "-.75s" },
  { path: "M500 300 Q650 400 800 450", color: "#ffb4a9", delay: "-1.5s" },
  { path: "M500 300 Q350 400 200 450", color: "#00dbe7", delay: "-2.25s" },
];

function CoreHub() {
  return (
    <Box className="slogans-core-hub" aria-label="هسته مرکزی توانمندی‌ها">
      <Box className="slogans-core-glow" aria-hidden />
      <Box component="svg" className="slogans-core-rings" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" fill="none" r="45" stroke="#00dbe7" strokeDasharray="10 5" strokeWidth="1" />
        <circle cx="50" cy="50" fill="none" r="35" stroke="#ffb4a9" strokeDasharray="5 10" strokeWidth="2" />
        <path d="M50 20 L50 10 M80 50 L90 50 M50 80 L50 90 M20 50 L10 50" stroke="#a7c8ff" strokeWidth="3" />
      </Box>
      <Typography className="slogans-core-label">CORE</Typography>
    </Box>
  );
}

function PillarCard({ pillar, index }) {
  const { Icon } = pillar;
  return (
    <Box
      className={`slogans-pillar-wrap is-${pillar.position}`}
      sx={{ "--pillar-accent": pillar.accent, "--pillar-delay": `${500 + index * 180}ms` }}
    >
      <LiquidGlass
        intensity="medium"
        interactive
        className="slogans-pillar-card"
        sx={{
          minHeight: { xs: 190, md: 198 },
          p: { xs: 3, md: 3.5 },
          borderRadius: 3,
        }}
      >
        <Box className="slogans-pillar-glow" aria-hidden />
        <Stack direction="row" alignItems="center" spacing={1.4} sx={{ mb: 2 }}>
          <Icon className="slogans-pillar-icon" sx={{ color: pillar.accent, fontSize: 34 }} />
          <Typography component="h3" sx={{ fontSize: { xs: "1.3rem", md: "1.45rem" }, fontWeight: 800 }}>
            {pillar.title}
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ fontSize: { xs: ".9rem", md: ".95rem" }, lineHeight: 1.9, fontWeight: 600 }}>
          {pillar.description}
        </Typography>
        <Box className="slogans-pillar-pip" aria-hidden />
      </LiquidGlass>
    </Box>
  );
}

export default function SlogansCoreSection() {
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
      { threshold: 0.14 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="why-clinic"
      className={`slogans-core-section${visible ? " is-visible" : ""}`}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0D1118",
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(143,183,255,.08)",
      }}
    >
      <Box className="slogans-particle-floor" aria-hidden />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box className="slogans-heading" sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.25rem", md: "3.4rem" }, mb: 1.5 }}>
            چرا کلینیک یو‌پی‌اس؟
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto", lineHeight: 2 }}>
            هسته مرکزی توانمندی‌های ما در خدمت پایداری انرژی کسب‌وکار شما
          </Typography>
        </Box>

        <Box className="slogans-core-stage">
          <Box component="svg" className="slogans-connectivity" viewBox="0 0 1000 600" aria-hidden>
            {connections.map((connection, index) => (
              <g key={connection.path}>
                <path
                  className="slogans-connection-line"
                  d={connection.path}
                  fill="none"
                  stroke={connection.color}
                  strokeWidth="2"
                />
                <circle className="slogans-travel-particle" r="4" fill={connection.color} style={{ animationDelay: connection.delay }}>
                  <animateMotion dur="3s" repeatCount="indefinite" path={connection.path} begin={connection.delay} />
                </circle>
              </g>
            ))}
          </Box>

          <CoreHub />
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
