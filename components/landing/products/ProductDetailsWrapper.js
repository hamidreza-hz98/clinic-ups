"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getProductDetails } from "@/app/actions/product";
import { setImagePath } from "@/lib/landing/general";
import CatalogueThumbnail from "./components/CatalogueThumbnail";
import FullscreenImage from "../FullscreenImage";
import TechnicalSpecifications from "../TechnicalSpecifications";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

const reveal = keyframes`
  from { opacity: 0; transform: translateY(34px); }
  to { opacity: 1; transform: translateY(0); }
`;

const imageIn = keyframes`
  from { opacity: 0; transform: scale(1.035); filter: blur(8px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const scan = keyframes`
  from { transform: translateY(-120%); }
  to { transform: translateY(620%); }
`;

const orbit = keyframes`
  to { transform: rotate(360deg); }
`;

function Reveal({ children, sx, ...props }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={rootRef}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(34px)",
        transition: "opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)",
        "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none", transition: "none" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function ProductGallery({ slides, productName, onFullscreen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, slides.length]);

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <Stack spacing={1.5} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} sx={{ minWidth: 0, width: "100%" }}>
      <SpotlightGlass
        intensity="strong"
        sx={{
          position: "relative",
          minHeight: { xs: 390, sm: 500, md: 610 },
          width: "100%",
          display: "grid",
          placeItems: "center",
          borderRadius: { xs: 4, md: 6 },
          p: { xs: 2, md: 4 },
          bgcolor: "rgba(7,12,19,.86)",
          overflow: "hidden",
        }}
      >
        <Box aria-hidden sx={{ position: "absolute", width: "72%", aspectRatio: 1, borderRadius: "50%", border: "1px solid rgba(var(--landing-accent-rgb),.12)", boxShadow: "0 0 90px rgba(var(--landing-accent-rgb),.08), inset 0 0 60px rgba(var(--landing-accent-rgb),.05)" }} />
        <Box aria-hidden sx={{ position: "absolute", width: "86%", aspectRatio: 1, borderRadius: "50%", border: "1px dashed rgba(var(--landing-secondary-rgb),.09)", animation: `${orbit} 36s linear infinite`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />
        <Box
          key={activeSlide.src}
          component="img"
          src={activeSlide.src}
          alt={activeSlide.alt || productName}
          onClick={() => onFullscreen(activeIndex)}
          sx={{
            position: "relative",
            zIndex: 1,
            display: "block",
            width: "100%",
            height: { xs: 330, sm: 430, md: 530 },
            objectFit: "contain",
            cursor: "zoom-in",
            filter: "drop-shadow(0 34px 46px rgba(0,0,0,.5))",
            animation: `${imageIn} .65s cubic-bezier(.2,.8,.2,1) both`,
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        />
        <Box aria-hidden sx={{ position: "absolute", zIndex: 2, top: 0, left: 0, right: 0, height: "15%", background: "linear-gradient(180deg, transparent, rgba(var(--landing-accent-rgb),.12), transparent)", animation: `${scan} 5.8s linear infinite`, pointerEvents: "none", "@media (prefers-reduced-motion: reduce)": { display: "none" } }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ position: "absolute", zIndex: 4, top: 18, right: 18, left: 18 }}>
          <LiquidGlass intensity="medium" sx={{ borderRadius: 99, px: 1.5, py: .8 }}>
            <Typography sx={{ direction: "ltr", fontFamily: "monospace", fontSize: ".66rem", color: "primary.main" }}>{activeIndex + 1} / {slides.length}</Typography>
          </LiquidGlass>
          <IconButton aria-label="نمایش تمام‌صفحه" onClick={() => onFullscreen(activeIndex)} sx={{ color: "white", bgcolor: "rgba(4,11,18,.58)", border: "1px solid rgba(var(--landing-contrast-rgb),.14)", backdropFilter: "blur(12px)" }}>
            <OpenInFullRoundedIcon />
          </IconButton>
        </Stack>

        {slides.length > 1 && (
          <>
            <IconButton aria-label="تصویر قبلی" onClick={() => move(-1)} sx={{ position: "absolute", zIndex: 4, right: 14, top: "50%", color: "white", bgcolor: "rgba(4,11,18,.62)", border: "1px solid rgba(var(--landing-contrast-rgb),.12)", "&:hover": { bgcolor: "rgba(var(--landing-accent-rgb),.15)", color: "primary.light" } }}><ChevronRightRoundedIcon /></IconButton>
            <IconButton aria-label="تصویر بعدی" onClick={() => move(1)} sx={{ position: "absolute", zIndex: 4, left: 14, top: "50%", color: "white", bgcolor: "rgba(4,11,18,.62)", border: "1px solid rgba(var(--landing-contrast-rgb),.12)", "&:hover": { bgcolor: "rgba(var(--landing-accent-rgb),.15)", color: "primary.light" } }}><ChevronLeftRoundedIcon /></IconButton>
          </>
        )}
      </SpotlightGlass>

      {slides.length > 1 && (
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: .5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {slides.map((slide, index) => (
            <Box
              component="button"
              type="button"
              key={`${slide.src}-${index}`}
              aria-label={`نمایش تصویر ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              sx={{
                flex: "0 0 auto",
                width: { xs: 74, md: 88 },
                height: { xs: 62, md: 72 },
                p: .4,
                overflow: "hidden",
                cursor: "pointer",
                borderRadius: 2.25,
                border: index === activeIndex ? "2px solid var(--landing-accent)" : "1px solid rgba(var(--landing-contrast-rgb),.13)",
                bgcolor: index === activeIndex ? "rgba(var(--landing-accent-rgb),.09)" : "rgba(var(--landing-contrast-rgb),.03)",
                boxShadow: index === activeIndex ? "0 0 18px rgba(var(--landing-accent-rgb),.18)" : "none",
                transition: ".3s ease",
              }}
            >
              <Box component="img" src={slide.src} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 1.5 }} />
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

function RelatedProductCard({ product, index }) {
  return (
    <SpotlightGlass
      component={Link}
      href={`/products/${product.slug}`}
      intensity="subtle"
      interactive
      sx={{
        display: "block",
        minWidth: 0,
        borderRadius: 4,
        color: "text.primary",
        overflow: "hidden",
        opacity: 0,
        animation: `${reveal} .7s cubic-bezier(.2,.8,.2,1) ${index * 80}ms forwards`,
        "&:hover img": { transform: "scale(1.07)" },
        "@media (prefers-reduced-motion: reduce)": { opacity: 1, animation: "none" },
      }}
    >
      <Box sx={{ height: 230, overflow: "hidden", bgcolor: "background.paper" }}>
        <Box component="img" src={setImagePath(product?.media?.[0]?.path)} alt={product.name} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .7s cubic-bezier(.2,.8,.2,1)" }} />
      </Box>
      <Stack sx={{ p: 2.25 }}>
        <Typography sx={{ fontWeight: 900, fontSize: ".92rem", lineHeight: 1.9 }}>{product.name}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography color="primary.main" sx={{ fontSize: ".7rem", fontWeight: 800 }}>مشاهده محصول</Typography>
          <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
        </Stack>
      </Stack>
    </SpotlightGlass>
  );
}

function ProductLoading() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 15, pb: 10 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(360px, .85fr)" }, gap: 4 }}>
          <Skeleton variant="rounded" height={610} sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.05)", borderRadius: 6 }} />
          <Stack spacing={2.5} sx={{ py: 3 }}>
            <Skeleton width="38%" sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.06)" }} />
            <Skeleton height={76} sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.07)" }} />
            <Skeleton height={54} sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.05)" }} />
            <Skeleton variant="rounded" height={190} sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.045)", borderRadius: 4 }} />
            <Stack alignItems="center"><CircularProgress size={28} /></Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default function ProductDetailsWrapper({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [fullscreenData, setFullscreenData] = useState({ open: false, initialIndex: 0 });

  useEffect(() => {
    let active = true;
    getProductDetails({ slug })
      .then((response) => {
        if (active) setProduct(response?.data || null);
      })
      .catch(() => {
        if (active) setProduct(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [slug]);

  const catalogue = useMemo(() => {
    if (slug.includes("koop")) {
      return {
        heading: "مشاهده کاتالوگ محصولات کوپ",
        downloadLink: "/images/products/generators/catalogue/koop.pdf",
        images: ["/images/products/generators/catalogue/koop01.webp", "/images/products/generators/catalogue/koop02.webp", "/images/products/generators/catalogue/koop03.webp", "/images/products/generators/catalogue/koop04.webp"],
      };
    }
    if (slug.includes("loncin")) {
      return {
        heading: "مشاهده کاتالوگ محصولات لانسین",
        downloadLink: "/images/products/generators/catalogue/loncin.pdf",
        images: ["/images/products/generators/catalogue/loncin01.webp", "/images/products/generators/catalogue/loncin02.webp", "/images/products/generators/catalogue/loncin03.webp", "/images/products/generators/catalogue/loncin04.webp"],
      };
    }
    return null;
  }, [slug]);

  const gallerySlides = useMemo(() => {
    const media = product?.media || [];
    if (!media.length) return [{ src: "/images/static/electricity.webp", alt: product?.name || "محصول کلینیک یو پی اس" }];
    return media.map((image, index) => ({ src: setImagePath(image.path), alt: image.mediaAlt || image.title || `${product?.name || "محصول"}، تصویر ${index + 1}` }));
  }, [product]);

  if (loading) return <ProductLoading />;

  if (!product) {
    return (
      <Box sx={{ minHeight: "80vh", display: "grid", placeItems: "center", bgcolor: "background.default", px: 2 }}>
        <SpotlightGlass intensity="strong" sx={{ maxWidth: 560, borderRadius: 5, p: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Inventory2RoundedIcon sx={{ fontSize: 60, color: "primary.main", opacity: .65 }} />
          <Typography component="h1" sx={{ mt: 2, fontSize: "1.5rem", fontWeight: 950 }}>محصول موردنظر پیدا نشد</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5 }}>ممکن است این محصول حذف شده یا نشانی آن تغییر کرده باشد.</Typography>
          <Button component={Link} href="/products" variant="contained" startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 3 }}>بازگشت به محصولات</Button>
        </SpotlightGlass>
      </Box>
    );
  }

  const relatedProducts = product.relatedProducts || [];

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden", bgcolor: "background.default", color: "text.primary", pb: { xs: 14, md: 11 } }}>
      <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: .32, backgroundImage: "linear-gradient(rgba(var(--landing-secondary-rgb),.045) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--landing-secondary-rgb),.045) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom, black, transparent 48%)" }} />
      <Box aria-hidden sx={{ position: "absolute", top: 40, right: "-18vw", width: "55vw", height: "55vw", borderRadius: "50%", background: "rgba(var(--landing-accent-rgb),.08)", filter: "blur(130px)", pointerEvents: "none" }} />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pt: { xs: 13, md: 15 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
          <Breadcrumbs separator="/" aria-label="مسیر صفحه" sx={{ "& .MuiBreadcrumbs-separator": { color: "rgba(var(--landing-contrast-rgb),.22)" } }}>
            <Typography component={Link} href="/" color="text.secondary" sx={{ fontSize: ".72rem" }}>کلینیک یو پی اس</Typography>
            <Typography component={Link} href="/categories" color="text.secondary" sx={{ fontSize: ".72rem" }}>فروشگاه</Typography>
            <Typography color="primary.main" sx={{ maxWidth: { xs: 210, sm: 440 }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: ".72rem" }}>{product.name}</Typography>
          </Breadcrumbs>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "success.main", boxShadow: "0 0 14px rgba(54,199,134,.8)" }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: ".62rem", color: "text.secondary", letterSpacing: ".1em" }}>PRODUCT SYSTEM / ONLINE</Typography>
          </Stack>
        </Stack>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.1fr) minmax(390px, .9fr)" }, gap: { xs: 4, lg: 5 }, alignItems: "start" }}>
          <Box sx={{ minWidth: 0, width: "100%", animation: `${reveal} .8s cubic-bezier(.2,.8,.2,1) both`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            <ProductGallery
              slides={gallerySlides}
              productName={product.name}
              onFullscreen={(initialIndex) => setFullscreenData({ open: true, initialIndex })}
            />
          </Box>

          <Stack spacing={2.5} sx={{ minWidth: 0, position: { lg: "sticky" }, top: { lg: 112 }, animation: `${reveal} .8s cubic-bezier(.2,.8,.2,1) .12s both`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                {product.category && <Chip icon={<CategoryRoundedIcon />} label={product.category.name} component={Link} href={`/products?category=${product.category._id}`} clickable size="small" sx={{ color: "primary.light", bgcolor: "rgba(var(--landing-accent-rgb),.08)", border: "1px solid rgba(var(--landing-accent-rgb),.2)" }} />}
                {product.brand && <Chip label={product.brand.name} size="small" variant="outlined" sx={{ color: "text.secondary", borderColor: "rgba(var(--landing-contrast-rgb),.15)" }} />}
              </Stack>
              <Typography component="h1" sx={{ maxWidth: 700, fontSize: { xs: "2rem", sm: "2.6rem", lg: "3rem" }, fontWeight: 950, lineHeight: 1.5, letterSpacing: "-.035em" }}>{product.name}</Typography>
              <Box sx={{ width: 74, height: 2, mt: 2.5, bgcolor: "primary.main", boxShadow: "0 0 16px rgba(var(--landing-accent-rgb),.6)" }} />
              {product.excerpt && <Typography color="text.secondary" sx={{ mt: 2.5, lineHeight: 2.05, fontSize: ".88rem" }}>{product.excerpt}</Typography>}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 1.25 }}>
              <SpotlightGlass intensity="subtle" sx={{ borderRadius: 3, p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center"><SecurityRoundedIcon sx={{ color: "primary.main" }} /><Box><Typography sx={{ fontWeight: 900, fontSize: ".82rem" }}>شش ماه گارانتی</Typography><Typography color="text.secondary" sx={{ mt: .4, fontSize: ".65rem" }}>ضمانت عملکرد محصول</Typography></Box></Stack>
              </SpotlightGlass>
              <SpotlightGlass intensity="subtle" sx={{ borderRadius: 3, p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center"><EngineeringRoundedIcon sx={{ color: "secondary.main" }} /><Box><Typography sx={{ fontWeight: 900, fontSize: ".82rem" }}>پنج سال خدمات</Typography><Typography color="text.secondary" sx={{ mt: .4, fontSize: ".65rem" }}>پشتیبانی پس از فروش</Typography></Box></Stack>
              </SpotlightGlass>
            </Box>

            <SpotlightGlass intensity="strong" sx={{ borderRadius: 4, p: { xs: 2.25, md: 3 } }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box><Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".62rem", letterSpacing: ".1em" }}>ORDER CHANNELS</Typography><Typography sx={{ mt: .4, fontWeight: 950 }}>روش‌های سفارش و مشاوره</Typography></Box>
                <SupportAgentRoundedIcon sx={{ color: "primary.main", fontSize: 32 }} />
              </Stack>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: { xs: 1.5, md: 2 } }}>
                <Button component="a" href="tel:+989122201160" variant="contained" startIcon={<LocalPhoneRoundedIcon />} sx={{ minHeight: 48, borderRadius: 2.5 }}>تماس تلفنی</Button>
                <Button component="a" href="https://wa.me/+989122201160" target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<WhatsAppIcon />} sx={{ minHeight: 48, borderRadius: 2.5, color: "success.light", borderColor: "rgba(54,199,134,.4)", "&:hover": { borderColor: "success.main", bgcolor: "rgba(54,199,134,.08)" } }}>واتس‌اپ</Button>
                <Button component="a" href="https://t.me/+989122201160" target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<TelegramIcon />} sx={{ minHeight: 48, borderRadius: 2.5, color: "info.light", borderColor: "rgba(77,158,255,.4)", "&:hover": { borderColor: "info.main", bgcolor: "rgba(77,158,255,.08)" } }}>تلگرام</Button>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: ".66rem", textAlign: "center" }}>برای استعلام موجودی و انتخاب ظرفیت مناسب با کارشناسان ما در ارتباط باشید.</Typography>
            </SpotlightGlass>

            {catalogue && <CatalogueThumbnail heading={catalogue.heading} downloadLink={catalogue.downloadLink} images={catalogue.images} />}
          </Stack>
        </Box>
      </Container>

      <Reveal sx={{ mt: { xs: 8, md: 12 } }}>
        <Box className="on-image-strip" sx={{ position: "relative", borderTop: "1px solid rgba(255,255,255,.1)", borderBottom: "1px solid rgba(255,255,255,.1)", bgcolor: "rgba(9,14,22,.9)" }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, py: 2.5 }}>
              {[
                { icon: BoltRoundedIcon, title: "پایداری انرژی", text: "حفاظت پیوسته در برابر نوسان و قطعی" },
                { icon: SecurityRoundedIcon, title: "انتخاب مطمئن", text: "تجهیزات تخصصی با ضمانت و اصالت" },
                { icon: SupportAgentRoundedIcon, title: "پشتیبانی مهندسی", text: "مشاوره، نصب و خدمات پس از فروش" },
              ].map(({ icon: Icon, title, text }, index) => (
                <Stack key={title} direction="row" spacing={1.5} alignItems="center" sx={{ px: { xs: 1, sm: 3 }, py: 1.5, borderLeft: { sm: index === 2 ? 0 : "1px solid rgba(var(--landing-contrast-rgb),.08)" } }}>
                  <Icon sx={{ color: "primary.main", fontSize: 26 }} /><Box><Typography sx={{ fontWeight: 900, fontSize: ".84rem" }}>{title}</Typography><Typography color="text.secondary" sx={{ mt: .35, fontSize: ".65rem" }}>{text}</Typography></Box>
                </Stack>
              ))}
            </Box>
          </Container>
        </Box>
      </Reveal>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, mt: { xs: 8, md: 11 } }}>
        <Reveal>
          <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
            <Box><Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".14em" }}>TECHNICAL PROFILE</Typography><Typography component="h2" sx={{ mt: 1, fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 950 }}>شناسنامه فنی محصول</Typography></Box>
            <Typography color="text.secondary" sx={{ maxWidth: 500, fontSize: ".8rem", lineHeight: 1.9 }}>مشخصات ثبت‌شده و توضیحات تکمیلی محصول را در این بخش بررسی کنید.</Typography>
          </Stack>

          <LiquidGlass intensity="medium" sx={{ borderRadius: { xs: 4, md: 5 }, p: { xs: 1.5, md: 2.5 } }}>
            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="fullWidth" aria-label="اطلاعات محصول" sx={{ mb: 2.5, "& .MuiTab-root": { minHeight: 52 }, "& .MuiTabs-indicator": { height: 3, borderRadius: 3, boxShadow: "0 0 14px rgba(var(--landing-accent-rgb),.55)" } }}>
              <Tab label="مشخصات فنی" />
              <Tab label="توضیحات محصول" />
            </Tabs>
            <Box role="tabpanel" hidden={activeTab !== 0} sx={{ p: { xs: .5, md: 1 } }}>
              {activeTab === 0 && <TechnicalSpecifications specifications={product.datasheet} />}
            </Box>
            <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: { xs: .5, md: 1 } }}>
              {activeTab === 1 && (
                <SpotlightGlass intensity="subtle" sx={{ borderRadius: 3, p: { xs: 2.5, md: 4 } }}>
                  <Box
                    className="product-rich-content"
                    dangerouslySetInnerHTML={{ __html: product.description || "<p>توضیحات تکمیلی برای این محصول ثبت نشده است.</p>" }}
                    sx={{ color: "text.secondary", fontSize: ".9rem", lineHeight: 2.15, "& p": { mb: 1.5 }, "& strong": { color: "text.primary" }, "& h1, & h2, & h3": { color: "text.primary", mt: 3, mb: 1.5 }, "& ul, & ol": { pr: 3, mb: 2 }, "& a": { color: "primary.main" }, "& img": { maxWidth: "100%", height: "auto", borderRadius: 3 } }}
                  />
                </SpotlightGlass>
              )}
            </Box>
          </LiquidGlass>
        </Reveal>
      </Container>

      {relatedProducts.length > 0 && (
        <Container maxWidth="xl" sx={{ mt: { xs: 9, md: 12 } }}>
          <Reveal>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
              <Box><Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".14em" }}>RELATED SYSTEMS</Typography><Typography component="h2" sx={{ mt: 1, fontSize: { xs: "1.9rem", md: "2.7rem" }, fontWeight: 950 }}>محصولات مرتبط</Typography></Box>
              <Button component={Link} href="/products" endIcon={<ArrowOutwardRoundedIcon />} sx={{ display: { xs: "none", sm: "inline-flex" } }}>همه محصولات</Button>
            </Stack>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2.25 }}>
              {relatedProducts.slice(0, 3).map((related, index) => <RelatedProductCard key={related._id} product={related} index={index} />)}
            </Box>
          </Reveal>
        </Container>
      )}

      <Container maxWidth="xl" sx={{ mt: { xs: 9, md: 12 } }}>
        <Reveal>
          <SpotlightGlass className="on-image-panel" intensity="strong" sx={{ position: "relative", minHeight: { xs: 360, md: 330 }, display: "flex", alignItems: "center", overflow: "hidden", borderRadius: { xs: 4, md: 6 }, p: { xs: 3, sm: 5, md: 7 } }}>
            <Box component="img" src="/images/products/overview/hero-datacenter.png" alt="مرکز داده با برق پایدار" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .25 }} />
            <Box aria-hidden sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #09111b 5%, rgba(9,17,27,.92) 48%, rgba(9,17,27,.25))" }} />
            <Box sx={{ position: "relative", zIndex: 1, maxWidth: 690 }}>
              <Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".14em" }}>NEED ENGINEERING HELP?</Typography>
              <Typography component="h2" sx={{ mt: 1.25, fontSize: { xs: "1.85rem", md: "2.8rem" }, fontWeight: 950, lineHeight: 1.45 }}>ظرفیت درست را پیش از خرید انتخاب کنید</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 590, lineHeight: 2, fontSize: ".84rem" }}>بار مصرفی، مدت زمان پشتیبانی و شرایط محیطی شما را بررسی می‌کنیم تا انتخابی دقیق، اقتصادی و قابل اتکا داشته باشید.</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2.5} sx={{ mt: 4, "& > span": { width: { xs: "100%", sm: "auto" } }, "& .MuiButton-root": { width: { xs: "100%", sm: "auto" } } }}>
                <MagneticButton href="/contact" variant="contained">دریافت مشاوره تخصصی</MagneticButton>
                <MagneticButton href="/products" variant="outlined">بازگشت به کاتالوگ</MagneticButton>
              </Stack>
            </Box>
          </SpotlightGlass>
        </Reveal>
      </Container>

      {fullscreenData.open && (
        <FullscreenImage
          slides={gallerySlides}
          initialSlide={fullscreenData.initialIndex}
          onClose={() => setFullscreenData({ open: false, initialIndex: 0 })}
        />
      )}
    </Box>
  );
}
