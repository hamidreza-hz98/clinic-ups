"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import LiquidGlass from "../ui/LiquidGlass";

const DWELL_MS = 1000;
const MOVE_MS = 720;

const upsBrands = [
  ["Ablerex", "ablerex.png"], ["Alja", "alja.png"], ["APC", "apc.png"],
  ["Astrid", "astrid.webp"], ["Chloride", "chloride.png"], ["East", "east.png"],
  ["Exim Power", "eximpower.png"], ["General Electric", "general_electric.png"],
  ["Inform", "inform.png"], ["Makelsan", "makelsan.png"], ["Masterguard", "master_guard.png"],
  ["MGE", "mge.png"], ["Powerware", "powerware.webp"], ["Riello", "riello.png"],
  ["Tescom", "tescom.png"],
].map(([name, file]) => ({ name, image: `/images/brands/ups/${file}` }));

const batteryBrands = [
  ["CGB", "cgb.png"], ["CSB", "cs3.png"], ["Hitaco", "hitaco.png"],
  ["Ibiza Power", "ibiza_power.png"], ["KSTAR", "kstar.png"], ["Leoch", "leoch.png"],
  ["Long", "long.png"], ["Rajeman", "rajeman.gif"], ["Rocket", "rocket.png"],
  ["Saft", "saft.png"], ["Sail", "sail.png"], ["Volta Max", "volta_max.png"],
].map(([name, file]) => ({ name, image: `/images/brands/battery/${file}` }));

const orbitBrands = Array.from(
  { length: Math.max(upsBrands.length, batteryBrands.length) },
  (_, index) => [upsBrands[index], batteryBrands[index]].filter(Boolean),
).flat();

const knownOrganizationNames = {
  "4photoshop-ir-gomrok-vector-logo.png": "گمرک جمهوری اسلامی ایران",
  "20.png": "زامیاد",
  "22.png": "قوه قضاییه",
  "24.png": "وزارت آموزش و پرورش",
  "25.png": "هتل اسپیناس",
  "layout_set_logo-1.png": "فرودگاه ساری",
  "layout_set_logo-2.png": "فرودگاه بندرعباس",
  "layout_set_logo.png": "فرودگاه سردار جنگل رشت",
  "logo_fa.png": "بیمارستان پارس",
  "MasihLogo_1.png": "بیمارستان مسیح دانشوری",
  "raah-ahan.png": "راه‌آهن جمهوری اسلامی ایران",
  "raja_rails.png": "شرکت حمل‌ونقل ریلی رجا",
  "مدرس200000_1_crop.png": "بیمارستان مدرس",
  "1564555062-olumpezeshki.webp": "سازمان نظام پزشکی",
};

const orbitOrganizations = Object.entries(knownOrganizationNames).map(([file, name]) => ({
  name,
  image: `/images/brands/organizations/${file}`,
}));

function ClockTicks() {
  return (
    <Box aria-hidden className="brand-clock-ticks">
      {Array.from({ length: 60 }, (_, index) => (
        <Box
          key={index}
          className={index % 5 === 0 ? "brand-clock-tick is-major" : "brand-clock-tick"}
          sx={{ transform: `rotate(${index * 6}deg)` }}
        />
      ))}
    </Box>
  );
}

function OrbitClock({ items, side, label }) {
  const isMobile = useMediaQuery("(max-width:899px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [rotationIndex, setRotationIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState([]);
  const indexRef = useRef(0);
  const isOrganization = side === "left";
  const orbitItems = useMemo(
    () => items.filter((item) => !failedImages.includes(item.image)),
    [failedImages, items],
  );
  const itemCount = Math.max(orbitItems.length, 1);
  const radius = isOrganization
    ? (isMobile ? 112 : 188)
    : (isMobile ? 137 : 226);
  const itemSize = isMobile
    ? Math.max(18, Math.min(isOrganization ? 27 : 31, Math.floor((2 * Math.PI * radius) / itemCount) - 2))
    : Math.max(24, Math.min(isOrganization ? 40 : 46, Math.floor((2 * Math.PI * radius) / itemCount) - 3));
  const step = 360 / itemCount;
  const angleOffset = isOrganization ? 180 : 0;

  useEffect(() => {
    if (paused || reduceMotion) {
      setRotationIndex(indexRef.current);
      setActiveIndex(indexRef.current);
      return;
    }

    let timer;
    let cancelled = false;
    const scheduleTick = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        const next = (indexRef.current + 1) % itemCount;
        setActiveIndex(-1);
        setRotationIndex(next);
        timer = window.setTimeout(() => {
          if (cancelled) return;
          indexRef.current = next;
          setActiveIndex(next);
          scheduleTick();
        }, MOVE_MS);
      }, DWELL_MS);
    };

    scheduleTick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [itemCount, paused, reduceMotion]);

  const positions = useMemo(
    () => orbitItems.map((_, index) => {
      const angle = angleOffset + ((rotationIndex % itemCount) - index) * step;
      const radians = (angle * Math.PI) / 180;
      return {
        left: `calc(50% + ${Math.cos(radians) * radius}px)`,
        top: `calc(50% + ${Math.sin(radians) * radius}px)`,
      };
    }),
    [angleOffset, itemCount, orbitItems, radius, rotationIndex, step],
  );

  const normalizedActiveIndex = activeIndex >= 0 ? activeIndex % itemCount : -1;
  const activeItem = normalizedActiveIndex >= 0 ? orbitItems[normalizedActiveIndex] : null;

  return (
    <Box sx={{ direction: "rtl" }}>
      <Typography
        component="h3"
        sx={{ mb: 2.5, textAlign: "center", fontSize: { xs: "1.3rem", md: "1.55rem" }, fontWeight: 800 }}
      >
        {label}
      </Typography>
      <Box
        role="region"
        aria-label={label}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className={`partner-orbit-clock is-${side}`}
        sx={{
          "--orbit-radius": `${radius}px`,
          position: "relative",
          width: isOrganization ? { xs: 286, md: 452 } : { xs: 340, md: 540 },
          height: isOrganization ? { xs: 286, md: 452 } : { xs: 340, md: 540 },
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        <Box className="brand-orbit-ring brand-orbit-ring-outer" />
        <Box className="brand-orbit-ring brand-orbit-ring-inner" />
        <ClockTicks />
        <Box className="brand-active-beam" aria-hidden />
        <Box className="brand-active-node" aria-hidden />

        {orbitItems.map((item, index) => {
          const isActive = normalizedActiveIndex === index;
          return (
            <Box
              key={`${item.image}-${index}`}
              className={`brand-orbit-item${isActive ? " is-active" : ""}`}
              aria-label={item.name}
              sx={{
                ...positions[index],
                width: itemSize,
                height: itemSize,
                transitionDuration: reduceMotion ? "0ms" : `${MOVE_MS}ms`,
              }}
            >
              <LiquidGlass
                intensity="subtle"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  p: { xs: 0.6, md: 0.8 },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  className="brand-orbit-logo"
                  sx={{ width: "84%", height: "84%", objectFit: "contain" }}
                  onError={() => setFailedImages((current) => (
                    current.includes(item.image) ? current : [...current, item.image]
                  ))}
                />
              </LiquidGlass>
              {isActive && (
                <LiquidGlass
                  role="tooltip"
                  intensity="strong"
                  className="brand-orbit-tooltip"
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderRadius: 3,
                    px: 1.4,
                    py: 0.7,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  <Typography sx={{ fontSize: ".7rem", fontWeight: 700 }}>{item.name}</Typography>
                </LiquidGlass>
              )}
            </Box>
          );
        })}

        <LiquidGlass
          intensity="strong"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: isOrganization ? { xs: 118, md: 156 } : { xs: 154, md: 198 },
            height: isOrganization ? { xs: 118, md: 156 } : { xs: 154, md: 198 },
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            p: isOrganization ? 1.7 : 2.2,
          }}
        >
          <Box className="brand-orbit-center-content" aria-live="polite">
            {activeItem && (
              <Box
                component="img"
                src={activeItem.image}
                alt={activeItem.name}
                className="brand-orbit-center-logo"
                onError={() => setFailedImages((current) => (
                  current.includes(activeItem.image) ? current : [...current, activeItem.image]
                ))}
              />
            )}
            <Typography className="brand-orbit-center-name">
              {activeItem?.name}
            </Typography>
          </Box>
        </LiquidGlass>
      </Box>
    </Box>
  );
}

export default function BrandsOrbitSection() {
  return (
    <Box
      component="section"
      id="partner-brands"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#070B13",
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(143,183,255,.08)",
        backgroundImage:
          "linear-gradient(rgba(143,189,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(143,189,255,.025) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <Box className="brand-orbit-ambient" aria-hidden />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<HandshakeRoundedIcon />}
            label="شبکه‌ای از همکاری‌های معتبر"
            variant="outlined"
            color="primary"
            sx={{ mb: 2, bgcolor: "rgba(0,219,231,.05)", borderColor: "rgba(0,219,231,.24)" }}
          />
          <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.3rem", md: "3.65rem" }, mb: 1.5 }}>
            برندها و سازمان‌هایی که به ما اعتماد کرده‌اند
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto", lineHeight: 2 }}>
            یک همکاری دوطرفه؛ برندهای تخصصی در مدار سمت چپ و سازمان‌های همراه در مدار سمت راست، هر ثانیه در نقطه تمرکز خود می‌درخشند.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 8, lg: 3 },
            alignItems: "center",
            direction: "ltr",
          }}
        >
          <OrbitClock
            items={orbitBrands}
            side="right"
            label="برندهایی که با آن‌ها کار می‌کنیم"
          />
          <OrbitClock
            items={orbitOrganizations}
            side="left"
            label="سازمان‌هایی که با آن‌ها همکاری داشته‌ایم"
          />
        </Box>

        <Typography sx={{ mt: { xs: 6, md: 4 }, textAlign: "center", color: "text.secondary", fontSize: ".75rem" }}>
          برای توقف موقت هر مدار، نشانگر را روی همان ساعت نگه دارید.
        </Typography>
      </Container>
    </Box>
  );
}
