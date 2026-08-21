"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { getAllProducts } from "@/app/actions/product";
import { getAllCategories } from "@/app/actions/category";
import { setImagePath } from "@/lib/landing/general";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";

const PAGE_SIZE = 9;

const reveal = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.5deg); }
  50% { transform: translate3d(0, -12px, 0) rotate(1deg); }
`;

const scan = keyframes`
  from { transform: translateY(-120%); }
  to { transform: translateY(520%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: .34; transform: scale(.94); }
  50% { opacity: .75; transform: scale(1.06); }
`;

function ProductCard({ product, index }) {
  const image = setImagePath(product?.media?.[0]?.path);
  const categoryName = product?.category?.name;
  const brandName = product?.brand?.name;

  return (
    <LiquidGlass
      component={Link}
      href={`/products/${product.slug}`}
      intensity="subtle"
      interactive
      aria-label={`مشاهده ${product.name}`}
      className="product-overview-card"
      sx={{
        display: "flex",
        minWidth: 0,
        minHeight: 440,
        flexDirection: "column",
        borderRadius: 4,
        color: "text.primary",
        opacity: 0,
        animation: `${reveal} .7s cubic-bezier(.2,.8,.2,1) ${Math.min(index, 8) * 70}ms forwards`,
        "&:hover .product-overview-image": {
          transform: "scale(1.075)",
          filter: "saturate(1.1) contrast(1.03)",
        },
        "&:hover .product-overview-arrow": {
          transform: "translate(-4px, -4px)",
          color: "primary.light",
        },
        "&:hover .product-overview-line": { width: "72%" },
        "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
      }}
    >
      <Box sx={{ position: "relative", height: 246, overflow: "hidden", bgcolor: "background.paper" }}>
        <Box
          component="img"
          className="product-overview-image"
          src={image}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            transition: "transform .85s cubic-bezier(.2,.8,.2,1), filter .5s ease",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,10,16,.03) 20%, rgba(6,10,16,.22) 58%, #0b111b 100%)",
          }}
        />
        <Stack direction="row" spacing={1} sx={{ position: "absolute", top: { xs: 18, sm: 22 }, right: { xs: 18, sm: 22 }, left: { xs: 18, sm: 22 }, flexWrap: "wrap", rowGap: 1 }}>
          {categoryName && (
            <Chip
              label={categoryName}
              size="small"
              sx={{ bgcolor: "rgba(5,14,23,.78)", color: "#8fdcff", border: "1px solid rgba(143,220,255,.34)", backdropFilter: "blur(12px)" }}
            />
          )}
          {brandName && (
            <Chip
              label={brandName}
              size="small"
              sx={{ bgcolor: "rgba(5,14,23,.78)", color: "rgba(247,251,255,.82)", border: "1px solid rgba(255,255,255,.16)", backdropFilter: "blur(12px)" }}
            />
          )}
        </Stack>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 2,
            bgcolor: "primary.main",
            boxShadow: "0 0 20px rgba(var(--landing-accent-rgb),.75)",
          }}
        />
      </Box>

      <Stack sx={{ flex: 1, p: 2.5 }}>
        <Box className="product-overview-line" sx={{ width: 42, height: 2, mb: 2, bgcolor: "primary.main", boxShadow: "0 0 12px rgba(var(--landing-accent-rgb),.48)", transition: "width .5s ease" }} />
        <Typography component="h2" sx={{ fontSize: "1.05rem", fontWeight: 900, lineHeight: 1.85 }}>
          {product.name}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: ".78rem",
            lineHeight: 1.9,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.excerpt || "راهکار تخصصی تأمین برق پایدار برای زیرساخت‌های حساس"}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: "auto", pt: 2.25 }}>
          <Typography sx={{ color: "primary.main", fontSize: ".72rem", fontWeight: 800 }}>مشاهده مشخصات فنی</Typography>
          <ArrowOutwardRoundedIcon className="product-overview-arrow" sx={{ fontSize: 20, transition: ".3s ease" }} />
        </Stack>
      </Stack>
    </LiquidGlass>
  );
}

function FiltersPanel({ search, onSearchChange, categories, category, onCategoryChange, sort, onSortChange, onClose }) {
  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("");
    onSortChange("desc");
  };

  return (
    <Stack className="product-filters-panel" spacing={3} sx={{ p: { xs: 2.5, md: 2.25 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <TuneRoundedIcon color="primary" />
          <Typography sx={{ fontWeight: 900 }}>کنسول انتخاب محصول</Typography>
        </Stack>
        {onClose && <IconButton onClick={onClose} aria-label="بستن فیلترها"><CloseRoundedIcon /></IconButton>}
      </Stack>

      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="جستجو در محصولات..."
        type="search"
        fullWidth
        size="small"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "primary.main" }} /></InputAdornment>,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 48,
            bgcolor: "rgba(var(--landing-contrast-rgb),.055)",
            borderRadius: 2.5,
          },
        }}
      />

      <Box>
        <Typography color="text.secondary" sx={{ mb: 1.5, fontSize: ".72rem", letterSpacing: ".04em" }}>دسته‌بندی تجهیزات</Typography>
        <Stack spacing={.75}>
          {[{ _id: "", name: "همه محصولات" }, ...categories].map((item, index) => {
            const active = category === item._id;
            return (
              <Button
                key={item._id || "all"}
                onClick={() => onCategoryChange(item._id)}
                fullWidth
                variant="text"
                sx={{
                  minHeight: 42,
                  justifyContent: "space-between",
                  px: 1.5,
                  borderRadius: 2,
                  color: active ? "primary.light" : "text.secondary",
                  bgcolor: active ? "rgba(var(--landing-accent-rgb),.09)" : "transparent",
                  border: active ? "1px solid rgba(var(--landing-accent-rgb),.2)" : "1px solid transparent",
                  "&:hover": { bgcolor: "rgba(var(--landing-contrast-rgb),.045)", color: "text.primary" },
                }}
              >
                <span>{item.name}</span>
                <Typography component="span" sx={{ fontFamily: "monospace", fontSize: ".65rem", opacity: .55 }}>
                  {String(index).padStart(2, "0")}
                </Typography>
              </Button>
            );
          })}
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <SortRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography color="text.secondary" sx={{ fontSize: ".72rem" }}>ترتیب نمایش</Typography>
        </Stack>
        <ToggleButtonGroup
          value={sort}
          exclusive
          fullWidth
          size="small"
          onChange={(_, value) => value && onSortChange(value)}
          aria-label="ترتیب نمایش محصولات"
          sx={{ "& .MuiToggleButton-root": { py: 1, color: "text.secondary", borderColor: "rgba(var(--landing-contrast-rgb),.11)" } }}
        >
          <ToggleButton value="desc">جدیدترین</ToggleButton>
          <ToggleButton value="asc">قدیمی‌ترین</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button onClick={clearFilters} startIcon={<RestartAltRoundedIcon />} sx={{ color: "text.secondary", alignSelf: "flex-start" }}>
        پاک کردن فیلترها
      </Button>
    </Stack>
  );
}

export default function ProductsOverviewWrapper({ initialCategory = "" }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const selectedCategory = useMemo(
    () => categories.find((item) => item._id === category),
    [categories, category],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    getAllCategories({ page_size: 100 })
      .then((response) => {
        if (active) setCategories(response?.data?.categories || []);
      })
      .catch(() => {
        if (active) setCategories([]);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      setLoading(true);
      getAllProducts({
        search: debouncedSearch,
        page,
        page_size: PAGE_SIZE,
        sort: [{ field: "createdAt", order: sort }],
        filters: category ? { category: { type: "eq", value: category } } : {},
      })
        .then((response) => {
          if (!active) return;
          setProducts(response?.data?.products || []);
          setTotal(response?.data?.total || 0);
        })
        .catch(() => {
          if (!active) return;
          setProducts([]);
          setTotal(0);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [category, debouncedSearch, page, sort]);

  const updateCategory = (value) => {
    setCategory(value);
    setPage(1);
    setFiltersOpen(false);
  };

  const updateSort = (value) => {
    setSort(value);
    setPage(1);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", pb: { xs: 14, md: 10 } }}>
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: { xs: 610, md: 680 },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          pt: { xs: 13, md: 15 },
          pb: { xs: 7, md: 9 },
          borderBottom: "1px solid rgba(var(--landing-secondary-rgb),.1)",
        }}
      >
        <Box component="img" className="landing-top-banner-image" src="/images/products/overview/hero-datacenter.png" alt="مرکز داده مجهز به سامانه برق پایدار" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Box aria-hidden className="landing-top-banner-overlay" sx={{ position: "absolute", inset: 0 }} />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, opacity: .35, backgroundImage: "linear-gradient(rgba(126,184,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(126,184,255,.08) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom, transparent 4%, black 34%, black 82%, transparent)" }} />
        <Box aria-hidden sx={{ position: "absolute", width: 420, height: 420, right: { xs: "50%", md: "8%" }, top: "24%", borderRadius: "50%", border: "1px solid rgba(var(--landing-accent-rgb),.18)", boxShadow: "0 0 90px rgba(var(--landing-accent-rgb),.1), inset 0 0 80px rgba(var(--landing-accent-rgb),.06)", animation: `${pulse} 5s ease-in-out infinite`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(340px, .65fr)" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
            <Box className="products-hero-copy" sx={{ maxWidth: 760, animation: `${reveal} .8s cubic-bezier(.2,.8,.2,1) both` }}>
              <Breadcrumbs separator="/" aria-label="مسیر صفحه" sx={{ mb: 3, "& .MuiBreadcrumbs-separator": { color: "rgba(var(--landing-contrast-rgb),.24)" } }}>
                <Typography component={Link} href="/" color="text.secondary" sx={{ fontSize: ".72rem" }}>کلینیک یو پی اس</Typography>
                <Typography color="primary.main" sx={{ fontSize: ".72rem" }}>محصولات</Typography>
              </Breadcrumbs>
              <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2 }}>
                <Box sx={{ width: 42, height: 2, bgcolor: "primary.main", boxShadow: "0 0 12px rgba(var(--landing-accent-rgb),.7)" }} />
                <Typography sx={{ fontFamily: "monospace", fontSize: ".68rem", color: "primary.light", letterSpacing: ".16em" }}>ENERGY SYSTEMS / 2026</Typography>
              </Stack>
              <Typography component="h1" sx={{ maxWidth: 690, fontSize: { xs: "2.65rem", sm: "3.8rem", lg: "4.75rem" }, fontWeight: 950, lineHeight: 1.25, letterSpacing: "-.055em" }}>
                زیرساخت انرژی،
                <Box component="span" sx={{ display: "block", color: "primary.main", textShadow: "0 0 34px rgba(var(--landing-accent-rgb),.24)" }}>مهندسی‌شده برای تداوم</Box>
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 650, fontSize: { xs: ".9rem", md: "1.02rem" }, lineHeight: 2.1 }}>
                مجموعه تخصصی یو پی اس، باتری، استابلایزر، موتور برق و دیزل ژنراتور؛ انتخاب‌شده برای حفاظت از تجهیزات و تداوم بی‌وقفه کسب‌وکار شما.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2.5} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mt: 4.5 }}>
                <MagneticButton href="#product-catalogue" variant="contained" endIcon={<ArrowOutwardRoundedIcon />} sx={{ width: { xs: "100%", sm: "auto" } }}>
                  ورود به کاتالوگ
                </MagneticButton>
                <MagneticButton href="/contact" variant="outlined" sx={{ width: { xs: "100%", sm: "auto" } }}>
                  مشاوره انتخاب محصول
                </MagneticButton>
              </Stack>
            </Box>

            <Box sx={{ position: "relative", display: { xs: "none", md: "block" }, justifySelf: "center", width: "min(100%, 430px)", animation: `${float} 6s ease-in-out infinite`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
              <LiquidGlass intensity="strong" sx={{ borderRadius: "46% 54% 52% 48% / 44% 42% 58% 56%", p: 1.25, transform: "rotate(-2deg)", boxShadow: "0 34px 100px rgba(0,0,0,.55), 0 0 70px rgba(var(--landing-accent-rgb),.12)" }}>
                <Box component="img" src="/images/products/overview/ups-rack.png" alt="سامانه یو پی اس رک‌مونت" sx={{ display: "block", width: "100%", aspectRatio: "1 / 1.05", objectFit: "cover", borderRadius: "inherit" }} />
                <Box aria-hidden sx={{ position: "absolute", left: 0, right: 0, top: 0, height: "20%", background: "linear-gradient(180deg, transparent, rgba(var(--landing-accent-rgb),.14), transparent)", animation: `${scan} 4.8s linear infinite`, "@media (prefers-reduced-motion: reduce)": { display: "none" } }} />
              </LiquidGlass>
              <LiquidGlass intensity="medium" sx={{ position: "absolute", right: -28, bottom: 30, borderRadius: 3, px: 2, py: 1.5 }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: ".64rem", color: "primary.main" }}>STATUS / ONLINE</Typography>
                <Typography sx={{ mt: .5, fontSize: ".72rem", fontWeight: 800 }}>توان پایدار، حفاظت پیوسته</Typography>
              </LiquidGlass>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box className="on-image-strip" sx={{ borderBottom: "1px solid rgba(255,255,255,.1)", bgcolor: "rgba(9,14,22,.9)" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, py: 2.5 }}>
            {[
              { icon: BoltRoundedIcon, value: "۵", label: "گروه محصول" },
              { icon: MemoryRoundedIcon, value: total ? total.toLocaleString("fa-IR") : "—", label: "تجهیز تخصصی" },
              { icon: ShieldRoundedIcon, value: "۲۴/۷", label: "پشتیبانی فنی" },
              { icon: Inventory2RoundedIcon, value: "B2B", label: "راهکار سازمانی" },
            ].map(({ icon: Icon, value, label }, index) => (
              <Stack key={label} direction="row" spacing={1.5} alignItems="center" sx={{ px: { xs: 1, md: 3 }, py: 1.5, borderLeft: index % 2 === 0 || index === 3 ? 0 : "1px solid rgba(var(--landing-contrast-rgb),.08)" }}>
                <Icon sx={{ color: "primary.main", fontSize: 24 }} />
                <Box><Typography sx={{ fontWeight: 950, fontSize: "1.05rem" }}>{value}</Typography><Typography color="text.secondary" sx={{ fontSize: ".68rem" }}>{label}</Typography></Box>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      <Container id="product-catalogue" maxWidth="xl" sx={{ pt: { xs: 7, md: 10 }, scrollMarginTop: 110 }}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".16em", mb: 1 }}>PRODUCT CATALOGUE</Typography>
            <Typography component="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 950, lineHeight: 1.35 }}>کاتالوگ محصولات تخصصی</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, fontSize: ".86rem" }}>جستجو، مقایسه و انتخاب راهکار متناسب با نیاز فنی شما</Typography>
          </Box>
          <Button variant="outlined" startIcon={<TuneRoundedIcon />} onClick={() => setFiltersOpen(true)} sx={{ display: { xs: "inline-flex", md: "none" } }}>فیلتر محصولات</Button>
        </Stack>

        {category && (
          <LiquidGlass intensity="subtle" sx={{ mb: 3, borderRadius: 3, p: 2, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", gap: 2 }}>
            <Typography sx={{ fontSize: ".82rem" }}>
              پروژه‌های اجرایی مرتبط با <Box component="span" sx={{ color: "primary.main", fontWeight: 900 }}>{selectedCategory?.name || "این دسته‌بندی"}</Box> را هم ببینید.
            </Typography>
            <Button component={Link} href={`/projects?category=${encodeURIComponent(category)}`} endIcon={<ArrowOutwardRoundedIcon />} size="small">مشاهده پروژه‌های مرتبط</Button>
          </LiquidGlass>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px minmax(0, 1fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <LiquidGlass intensity="medium" sx={{ display: { xs: "none", md: "block" }, position: "sticky", top: 112, borderRadius: 4 }}>
            <FiltersPanel search={search} onSearchChange={setSearch} categories={categories} category={category} onCategoryChange={updateCategory} sort={sort} onSortChange={updateSort} />
          </LiquidGlass>

          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5, minHeight: 34 }}>
              <Typography color="text.secondary" sx={{ fontSize: ".76rem" }}>
                {loading ? "در حال به‌روزرسانی نتایج..." : `${total.toLocaleString("fa-IR")} محصول یافت شد`}
              </Typography>
              {(search || category) && <Chip label={selectedCategory?.name || search || "نتایج فیلترشده"} size="small" onDelete={() => { setSearch(""); updateCategory(""); }} sx={{ color: "primary.light", borderColor: "rgba(var(--landing-accent-rgb),.25)" }} variant="outlined" />}
            </Stack>

            <Box aria-live="polite" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 2, md: 2.5 } }}>
              {loading ? (
                Array.from({ length: 6 }, (_, index) => (
                  <LiquidGlass key={index} intensity="subtle" sx={{ minHeight: 440, borderRadius: 4, p: 1.5 }}>
                    <Skeleton variant="rounded" height={235} sx={{ bgcolor: "rgba(var(--landing-contrast-rgb),.055)" }} />
                    <Skeleton width="72%" sx={{ mt: 3, bgcolor: "rgba(var(--landing-contrast-rgb),.065)" }} />
                    <Skeleton width="92%" sx={{ mt: 1, bgcolor: "rgba(var(--landing-contrast-rgb),.045)" }} />
                    <Stack alignItems="center" sx={{ mt: 5 }}><CircularProgress size={22} /></Stack>
                  </LiquidGlass>
                ))
              ) : products.length ? (
                products.map((product, index) => <ProductCard key={product._id} product={product} index={index} />)
              ) : (
                <LiquidGlass intensity="medium" sx={{ gridColumn: "1 / -1", borderRadius: 4, py: 9, px: 3, textAlign: "center" }}>
                  <Inventory2RoundedIcon sx={{ fontSize: 58, color: "primary.main", opacity: .65 }} />
                  <Typography sx={{ mt: 2, fontWeight: 900 }}>محصولی با این مشخصات پیدا نشد</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, fontSize: ".82rem" }}>عبارت جستجو یا دسته‌بندی را تغییر دهید.</Typography>
                  <Button onClick={() => { setSearch(""); updateCategory(""); }} startIcon={<RestartAltRoundedIcon />} sx={{ mt: 2 }}>نمایش همه محصولات</Button>
                </LiquidGlass>
              )}
            </Box>

            {totalPages > 1 && (
              <Stack alignItems="center" sx={{ mt: 6 }}>
                <LiquidGlass intensity="subtle" sx={{ borderRadius: 999, px: { xs: 1, sm: 2 }, py: 1 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => { setPage(value); document.getElementById("product-catalogue")?.scrollIntoView({ behavior: "smooth" }); }}
                    color="primary"
                    siblingCount={0}
                    boundaryCount={1}
                    size="small"
                    aria-label="صفحه‌بندی محصولات"
                  />
                </LiquidGlass>
              </Stack>
            )}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 12 } }}>
        <LiquidGlass className="on-image-panel" intensity="strong" sx={{ position: "relative", minHeight: { xs: 390, md: 330 }, borderRadius: { xs: 4, md: 6 }, overflow: "hidden", display: "flex", alignItems: "center", p: { xs: 3, sm: 5, md: 7 } }}>
          <Box component="img" src="/images/products/overview/battery-system.png" alt="سامانه باتری و برق اضطراری" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 58%", opacity: .27 }} />
          <Box aria-hidden sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #09111b 8%, rgba(9,17,27,.92) 42%, rgba(9,17,27,.32))" }} />
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 650 }}>
            <Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".14em" }}>ENGINEERING SUPPORT</Typography>
            <Typography component="h2" sx={{ mt: 1.5, fontSize: { xs: "1.9rem", md: "2.8rem" }, fontWeight: 950, lineHeight: 1.45 }}>برای انتخاب ظرفیت دقیق، تنها نیستید</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 560, lineHeight: 2, fontSize: ".86rem" }}>کارشناسان کلینیک یو پی اس، بار مصرفی، زمان پشتیبانی و شرایط محیطی پروژه شما را بررسی می‌کنند تا راهکار درست را انتخاب کنید.</Typography>
            <Box sx={{ mt: 3 }}><MagneticButton href="/contact" variant="contained">دریافت مشاوره تخصصی</MagneticButton></Box>
          </Box>
        </LiquidGlass>
      </Container>

      <Drawer
        anchor="right"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        slotProps={{ paper: { sx: { width: "min(88vw, 360px)", bgcolor: "background.paper", backgroundImage: "none", borderLeft: "1px solid rgba(var(--landing-accent-rgb),.16)" } } }}
      >
        <FiltersPanel search={search} onSearchChange={setSearch} categories={categories} category={category} onCategoryChange={updateCategory} sort={sort} onSortChange={updateSort} onClose={() => setFiltersOpen(false)} />
      </Drawer>
    </Box>
  );
}
