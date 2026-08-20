"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import { MdElectricBolt } from "react-icons/md";
import LiquidGlass from "../ui/LiquidGlass";

const industries = [
  {
    id: "hospitals",
    title: "بیمارستان‌ها",
    description: "تضمین برق بدون وقفه برای اتاق‌های عمل و تجهیزات حساس پزشکی و نگهداری علائم حیاتی.",
    Icon: MedicalServicesRoundedIcon,
    color: "var(--landing-accent)",
    position: "top-far-left",
    path: "M600 500 L130 90",
  },
  {
    id: "laboratories",
    title: "آزمایشگاه‌ها",
    description: "تأمین برق پاک برای آنالایزرها، زنجیره سرد نمونه‌ها و جلوگیری از تکرار آزمون‌های حساس.",
    Icon: ScienceRoundedIcon,
    color: "#57e39b",
    position: "top-left",
    path: "M600 500 L380 85",
  },
  {
    id: "medical-centers",
    title: "مراکز درمانی",
    description: "تداوم خدمت تجهیزات تصویربرداری، آزمایشگاهی و مراقبتی هنگام افت ولتاژ یا قطعی شبکه.",
    Icon: LocalHospitalRoundedIcon,
    color: "#ffb4a9",
    position: "top-right",
    path: "M600 500 L820 85",
  },
  {
    id: "offices",
    title: "اداره‌ها و سازمان‌ها",
    description: "حفظ سامانه‌های اتوماسیون، شبکه، امنیت و خدمات مراجعان بدون وقفه در ساعات کاری.",
    Icon: BusinessRoundedIcon,
    color: "#ffd06f",
    position: "top-far-right",
    path: "M600 500 L1070 90",
  },
  {
    id: "factories",
    title: "کارخانجات",
    description: "حفاظت از خطوط تولید اتوماتیک و جلوگیری از خسارات سنگین ناشی از نوسانات لحظه‌ای برق.",
    Icon: FactoryRoundedIcon,
    color: "#a7c8ff",
    position: "upper-left",
    path: "M600 500 L70 310",
  },
  {
    id: "datacenters",
    title: "دیتاسنترها",
    description: "پایداری ۱۰۰ درصدی برای سرورها و تجهیزات شبکه جهت جلوگیری از قطع خدمات آنلاین.",
    Icon: DnsRoundedIcon,
    color: "#ffb4a9",
    position: "upper-right",
    path: "M600 500 L1130 310",
  },
  {
    id: "banks",
    title: "بانک‌ها",
    description: "امنیت انرژی برای سیستم‌های تراکنش مالی و خودپردازها در سراسر شبکه بانکی کشور.",
    Icon: AccountBalanceRoundedIcon,
    color: "var(--landing-accent)",
    position: "lower-left",
    path: "M600 500 L70 690",
  },
  {
    id: "telecom",
    title: "مخابرات",
    description: "تامین توان پشتیبان برای دکل‌های BTS و مراکز سوئیچینگ مخابراتی در شرایط بحرانی.",
    Icon: SatelliteAltRoundedIcon,
    color: "#a7c8ff",
    position: "lower-right",
    path: "M600 500 L1130 690",
  },
  {
    id: "power-plants",
    title: "نیروگاه‌ها",
    description: "پشتیبانی سامانه‌های کنترل، حفاظت، ابزار دقیق و راه‌اندازی ایمن تجهیزات در رخدادهای شبکه.",
    Icon: SolarPowerRoundedIcon,
    color: "#57e39b",
    position: "bottom-far-left",
    path: "M600 500 L170 930",
  },
  {
    id: "airports",
    title: "فرودگاه‌ها",
    description: "تداوم برق ناوبری، روشنایی باند، کنترل ترافیک، بازرسی و سامانه‌های اطلاعات پرواز.",
    Icon: FlightTakeoffRoundedIcon,
    color: "var(--landing-secondary)",
    position: "bottom-left",
    path: "M600 500 L420 940",
  },
  {
    id: "commercial",
    title: "مجتمع‌های تجاری",
    description: "پایداری آسانسورها، دوربین‌ها، صندوق‌ها، اعلام حریق و زیرساخت فناوری در زمان قطعی برق.",
    Icon: ApartmentRoundedIcon,
    color: "#ffb4a9",
    position: "bottom-right",
    path: "M600 500 L780 940",
  },
  {
    id: "public-services",
    title: "مراکز خدمات عمومی",
    description: "حفظ مراکز تماس، سامانه‌های پاسخ‌گویی و زیرساخت‌های شهری در بحران و خاموشی گسترده.",
    Icon: AccountBalanceRoundedIcon,
    color: "#ffd06f",
    position: "bottom-far-right",
    path: "M600 500 L1030 930",
  },
];

function IndustryNode({ industry, index, onActivate }) {
  const { Icon } = industry;
  const nodeRef = useRef(null);

  const handleMove = (event) => {
    const node = nodeRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--industry-x", `${(event.clientX - rect.left - rect.width / 2) / 12}px`);
    node.style.setProperty("--industry-y", `${(event.clientY - rect.top - rect.height / 2) / 12}px`);
    node.style.setProperty("--industry-rx", `${-(event.clientY - rect.top - rect.height / 2) / 24}deg`);
    node.style.setProperty("--industry-ry", `${(event.clientX - rect.left - rect.width / 2) / 24}deg`);
  };

  const reset = () => {
    const node = nodeRef.current;
    if (!node) return;
    ["--industry-x", "--industry-y", "--industry-rx", "--industry-ry"].forEach((property) => node.style.removeProperty(property));
    onActivate(null);
  };

  return (
    <Box
      ref={nodeRef}
      className={`industry-network-node is-${industry.position}`}
      sx={{ "--industry-color": industry.color, "--industry-delay": `${500 + index * 120}ms` }}
      onPointerEnter={() => onActivate(industry.id)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <Box className="industry-node-glow" aria-hidden />
      <LiquidGlass intensity="medium" className="industry-node-card">
        <Box className="industry-icon-shell">
          <Icon sx={{ color: industry.color, fontSize: 27 }} />
        </Box>
        <Typography component="h3" sx={{ fontWeight: 850, fontSize: "1.1rem", mt: 1.5 }}>
          {industry.title}
        </Typography>
        <Typography className="industry-node-info">{industry.description}</Typography>
      </LiquidGlass>
    </Box>
  );
}

export default function IndustriesNetworkSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="industries-network"
      className={`industries-network-section${visible ? " is-visible" : ""}`}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(var(--landing-secondary-rgb),.08)",
      }}
    >
      <Box className="industries-network-grid" aria-hidden />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box className="industries-network-heading" sx={{ textAlign: "center", mb: { xs: 6, md: 7 } }}>
          <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.35rem", md: "3.55rem" }, mb: 1.5 }}>
            صنایع تحت پوشش
          </Typography>
          <Typography color="text.secondary">شبکه گسترده پایداری انرژی در زیرساخت‌های حیاتی کشور</Typography>
        </Box>

        <Box className="industries-network-stage">
          <Box component="svg" className="industries-energy-map" viewBox="0 0 1200 1000" aria-hidden>
            {industries.map((industry, index) => (
              <g key={industry.id}>
                <path
                  className={`industry-energy-path${activeNode === industry.id ? " is-active" : ""}`}
                  d={industry.path}
                  fill="none"
                  stroke={industry.color}
                  strokeWidth="1.5"
                />
                <circle className="industry-energy-traveller" r="3.5" fill={industry.color}>
                  <animateMotion dur={`${3.1 + index * .2}s`} repeatCount="indefinite" path={industry.path} begin={`${index * -.55}s`} />
                </circle>
              </g>
            ))}
          </Box>

          <Box className="industries-energy-core">
            <Box className="industries-energy-core-glow" aria-hidden />
            <LiquidGlass intensity="strong" className="industries-energy-core-glass">
              <MdElectricBolt aria-label="هسته انرژی" />
            </LiquidGlass>
          </Box>

          {industries.map((industry, index) => (
            <IndustryNode key={industry.id} industry={industry} index={index} onActivate={setActiveNode} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
