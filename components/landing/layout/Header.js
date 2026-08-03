"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import { getAllCategories } from "@/app/actions/category";
import { navLinks } from "@/constants/landing/routes";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";

const fallbackProducts = [
  { title: "یو‌پی‌اس", href: "/categories", icon: <PowerRoundedIcon /> },
  { title: "باتری", href: "/categories", icon: <BatteryChargingFullRoundedIcon /> },
  { title: "استابلایزر", href: "/categories", icon: <ElectricBoltRoundedIcon /> },
];

const bottomItems = [
  { title: "خانه", href: "/", icon: HomeRoundedIcon },
  { title: "محصولات", href: "/categories", icon: Inventory2RoundedIcon },
  { title: "پروژه‌ها", href: "/projects", icon: WorkspacesRoundedIcon },
  { title: "تماس", href: "/contact", icon: ContactPhoneRoundedIcon },
  { title: "خدمات", href: "/services", icon: DesignServicesRoundedIcon },
];

function Brand() {
  return (
    <Box
      component={Link}
      href="/"
      aria-label="کلینیک یو پی اس، صفحه اصلی"
      sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      <Box
        component="img"
        src="/images/logo/logo.svg"
        alt="کلینیک یو پی اس"
        sx={{ width: { xs: 148, sm: 172 }, height: "auto", display: "block" }}
      />
    </Box>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    getAllCategories({ page_size: 8 }).then((response) => {
      const categories = response?.data?.categories;
      if (active && categories?.length) {
        setProducts(categories.map((item, index) => ({
          title: item.name,
          href: `/products?category=${item._id}`,
          icon: [<PowerRoundedIcon key="power" />, <BatteryChargingFullRoundedIcon key="battery" />, <ElectricBoltRoundedIcon key="bolt" />][index % 3],
        })));
      }
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <Box component="header" sx={{ position: "fixed", inset: "0 0 auto", zIndex: 1200, px: { xs: 1.5, md: 3 }, pt: { xs: 1.5, md: 2 }, pointerEvents: "none" }}>
        <Container maxWidth="xl" disableGutters>
          <LiquidGlass intensity={scrolled ? "strong" : "subtle"} sx={{ overflow: "visible", borderRadius: { xs: 4, md: 5 }, px: { xs: 1.5, md: 2 }, py: scrolled ? 1 : 1.25, pointerEvents: "auto", transition: "padding .3s ease", "&::before": { display: "none" } }}>
            <Box sx={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                <IconButton aria-label="باز کردن منو" onClick={() => setMenuOpen(true)} color="inherit"><MenuRoundedIcon /></IconButton>
              </Box>
              <Brand />

              <Box component="nav" aria-label="منوی اصلی" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", gap: { md: 2.2, lg: 3.5 }, flex: 1 }}>
                {navLinks.filter((item) => item.href !== "/contact" && item.href !== "/blog").map((item) => item.href === "/categories" ? (
                  <Box key={item.href} onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)} sx={{ py: 2 }}>
                    <Box component="button" type="button" aria-expanded={megaOpen} onClick={() => setMegaOpen((value) => !value)} sx={{ border: 0, bgcolor: "transparent", color: megaOpen ? "primary.main" : "text.secondary", font: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: .35 }}>
                      {item.title}<ExpandMoreRoundedIcon sx={{ fontSize: 18, transform: megaOpen ? "rotate(180deg)" : "none", transition: ".25s" }} />
                    </Box>
                    {megaOpen && (
                        <Box className="menu-enter" sx={{ position: "absolute", top: "calc(100% - 8px)", left: "50%", transform: "translateX(-50%)", width: "min(760px, 76vw)", pt: 1 }}>
                          <LiquidGlass intensity="strong" sx={{ borderRadius: 5, p: 2.5, display: "grid", gridTemplateColumns: `repeat(${Math.min(products.length, 4)}, 1fr)`, gap: 1 }}>
                            {products.slice(0, 8).map((product) => (
                              <Box key={product.href + product.title} component={Link} href={product.href} sx={{ p: 2, borderRadius: 3, textAlign: "center", color: "text.secondary", transition: ".25s", "&:hover": { bgcolor: "rgba(255,255,255,.06)", color: "primary.main", transform: "translateY(-3px)" }, "& svg": { display: "block", mx: "auto", mb: 1 } }}>{product.icon}<Typography variant="body2">{product.title}</Typography></Box>
                            ))}
                          </LiquidGlass>
                        </Box>
                    )}
                  </Box>
                ) : <Typography key={item.href} component={Link} href={item.href} variant="body2" sx={{ color: "text.secondary", transition: ".2s", "&:hover": { color: "primary.main" } }}>{item.title}</Typography>)}
              </Box>

              <Box sx={{ display: { xs: "none", md: "block" } }}><MagneticButton href="/contact" variant="contained" size="small">تماس با ما</MagneticButton></Box>
              <IconButton component={Link} href="/search" aria-label="جستجو" color="inherit" sx={{ display: { xs: "inline-flex", md: "none" } }}><SearchRoundedIcon /></IconButton>
            </Box>
          </LiquidGlass>
        </Container>
      </Box>

      {menuOpen && (
          <Box className="overlay-enter" onClick={() => setMenuOpen(false)} sx={{ position: "fixed", inset: 0, zIndex: 1400, p: 1.5, bgcolor: "rgba(2,5,11,.58)", display: "flex", alignItems: "flex-start" }}>
            <LiquidGlass className="mobile-menu-enter" intensity="strong" onClick={(event) => event.stopPropagation()} sx={{ width: "100%", maxHeight: "calc(100svh - 24px)", overflowY: "auto", borderRadius: 5, p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center"><Brand /><IconButton aria-label="بستن منو" onClick={() => setMenuOpen(false)} color="inherit"><CloseRoundedIcon /></IconButton></Stack>
              <Stack component="nav" spacing={.5} sx={{ mt: 3 }}>
                {navLinks.map((item, index) => <Box key={item.href} className="mobile-link-enter" sx={{ animationDelay: `${index * 40}ms` }}><Typography component={Link} href={item.href} onClick={() => setMenuOpen(false)} sx={{ display: "block", py: 1.25, borderBottom: "1px solid rgba(255,255,255,.07)", color: "text.secondary", fontSize: "1.05rem" }}>{item.title}</Typography></Box>)}
              </Stack>
              <Box sx={{ mt: 3 }}><MagneticButton href="/contact" onClick={() => setMenuOpen(false)} variant="contained" fullWidth>درخواست مشاوره</MagneticButton></Box>
            </LiquidGlass>
          </Box>
      )}

      <LiquidGlass component="nav" aria-label="ناوبری پایین موبایل" intensity="strong" sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: "repeat(5, 1fr)", position: "fixed", zIndex: 1250, bottom: 10, left: 10, right: 10, borderRadius: "22px 22px 30px 30px", px: .5, py: .7 }}>
        {bottomItems.map(({ title, href, icon: Icon }) => <Box key={href} component={Link} href={href} sx={{ display: "flex", minWidth: 0, flexDirection: "column", alignItems: "center", gap: .25, color: "text.secondary", py: .5, borderRadius: 2.5, "&:hover": { color: "primary.main", bgcolor: "rgba(0,219,231,.07)" } }}><Icon sx={{ fontSize: 21 }} /><Typography sx={{ fontSize: ".62rem", whiteSpace: "nowrap" }}>{title}</Typography></Box>)}
      </LiquidGlass>
    </>
  );
}
