"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { getAllBlogs } from "@/app/actions/blog";
import { getAllCategories } from "@/app/actions/category";
import BlogCard from "./BlogCard";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import SpotlightGlass from "../ui/SpotlightGlass";

const pageSize = 9;

export default function BlogOverviewWrapper({ initialCategory = "" }) {
  const rootRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    getAllCategories({ page_size: 100 }).then((response) => {
      if (active) setCategories(response?.data?.categories || []);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      const response = await getAllBlogs({
        search: debouncedSearch,
        page,
        page_size: pageSize,
        sort: [{ field: "createdAt", order: sort }],
        filters: category ? { categories: { type: "in", value: [category] } } : {},
      });
      if (!active) return;
      if (response?.status && response.status >= 400) {
        setBlogs([]);
        setTotal(0);
        setError(response.message || "دریافت مقاله‌ها با خطا روبه‌رو شد.");
      } else {
        setBlogs(response?.data?.blogs || []);
        setTotal(response?.data?.total || 0);
      }
      setLoading(false);
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [category, debouncedSearch, page, sort]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || loading) return undefined;
    const items = root.querySelectorAll(".blog-page-reveal, .blog-editorial-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -4%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [blogs, loading]);

  const totalPages = Math.ceil(total / pageSize);
  const hasFilters = Boolean(search || category || sort !== "desc");
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setSort("desc");
    setPage(1);
  };

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 720, md: 760 }, pt: { xs: 15, md: 17 }, pb: { xs: 9, md: 12 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 24% 46%, rgba(var(--landing-accent-rgb),.12), transparent 30%), linear-gradient(180deg, transparent 48%, var(--landing-bg) 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: { xs: 6, md: 9 }, alignItems: "center" }}>
            <Box>
              <Chip icon={<AutoStoriesRoundedIcon />} label="CLINIC UPS / KNOWLEDGE JOURNAL" variant="outlined" className="hero-reveal hero-reveal-1" sx={{ mb: 3, direction: "ltr", color: "primary.light", borderColor: "rgba(var(--landing-accent-rgb),.28)", bgcolor: "rgba(var(--landing-accent-rgb),.055)", "& .MuiChip-icon": { color: "primary.main" } }} />
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "2.9rem", sm: "3.8rem", md: "5.5rem" }, lineHeight: 1.14, mb: 2.5 }}>
                دانش فنی برای
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>انرژی بدون وقفه</Box>
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 760, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 2.05 }}>
                راهنماهای تخصصی انتخاب، نگهداری و عیب‌یابی تجهیزات برق اضطراری؛ نوشته‌شده برای تصمیم‌های دقیق‌تر و زیرساخت‌های پایدارتر.
              </Typography>
            </Box>

            <SpotlightGlass intensity="strong" className="hero-reveal hero-reveal-2" sx={{ minHeight: { xs: 315, md: 470 }, borderRadius: 6, p: 1.3 }}>
              <Box sx={{ display: "contents" }}>
                <Box component="img" className="landing-top-banner-image" src="/images/static/laptop.webp" alt="مجله تخصصی برق اضطراری کلینیک یو پی اس" sx={{ position: "absolute", inset: 10, width: "calc(100% - 20px)", height: "calc(100% - 20px)", objectFit: "cover", borderRadius: 5 }} />
                <Box className="landing-top-banner-overlay" sx={{ position: "absolute", inset: 10, borderRadius: 5 }} />
                <Stack direction="row" alignItems="end" justifyContent="space-between" sx={{ position: "absolute", right: 28, left: 28, bottom: 26 }}>
                  <Box>
                    <Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "2.5rem", lineHeight: 1 }}>{loading ? "—" : total}</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: ".76rem", mt: .7 }}>مقاله در آرشیو</Typography>
                  </Box>
                  <Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".67rem", letterSpacing: ".11em", direction: "ltr" }}>READ. LEARN. PROTECT.</Typography>
                </Stack>
              </Box>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: { xs: 11, md: 16 } }}>
        <Box component="section" sx={{ pt: { xs: 6, md: 10 } }}>
          <LiquidGlass className="blog-page-reveal" intensity="strong" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5, mb: { xs: 5, md: 7 } }}>
            <Stack direction={{ xs: "column", lg: "row" }} spacing={2} alignItems={{ xs: "stretch", lg: "center" }}>
              <TextField type="search" label="جستجو در مقاله‌ها" value={search} onChange={(event) => setSearch(event.target.value)} sx={{ flex: 1, minWidth: { lg: 280 } }} slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon color="primary" /></InputAdornment> } }} />
              <FormControl sx={{ minWidth: { xs: "100%", lg: 230 } }}>
                <InputLabel id="blog-category-label">دسته‌بندی</InputLabel>
                <Select labelId="blog-category-label" label="دسته‌بندی" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }}>
                  <MenuItem value="">همه دسته‌بندی‌ها</MenuItem>
                  {categories.map((item) => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
              <ToggleButtonGroup exclusive value={sort} onChange={(_, value) => { if (value) { setSort(value); setPage(1); } }} aria-label="مرتب‌سازی مقاله‌ها" sx={{ alignSelf: { lg: "stretch" }, "& .MuiToggleButton-root": { px: 2.5, flex: { xs: 1, lg: "initial" }, color: "text.secondary", borderColor: "rgba(var(--landing-contrast-rgb),.12)", "&.Mui-selected": { color: "primary.main", bgcolor: "rgba(var(--landing-accent-rgb),.1)" } } }}>
                <ToggleButton value="desc">جدیدترین</ToggleButton>
                <ToggleButton value="asc">قدیمی‌ترین</ToggleButton>
              </ToggleButtonGroup>
              <Button startIcon={hasFilters ? <FilterAltOffRoundedIcon /> : <TuneRoundedIcon />} onClick={resetFilters} disabled={!hasFilters} sx={{ minHeight: 54, whiteSpace: "nowrap" }}>پاک‌کردن فیلترها</Button>
            </Stack>
          </LiquidGlass>

          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2} className="blog-page-reveal" sx={{ mb: 4 }}>
            <Box>
              <Typography component="h2" variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: .6 }}>آخرین بینش‌ها</Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>{loading ? "در حال دریافت مقاله‌ها" : `${total.toLocaleString("fa-IR")} مقاله مطابق انتخاب شما`}</Typography>
            </Box>
            <Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".72rem", letterSpacing: ".12em" }}>ISSUE {String(page).padStart(2, "0")}</Typography>
          </Stack>

          {loading ? (
            <Box sx={{ minHeight: 420, display: "grid", placeItems: "center" }}><Stack alignItems="center" spacing={2}><CircularProgress size={38} thickness={2.6} /><Typography color="text.secondary">در حال آماده‌سازی مجله</Typography></Stack></Box>
          ) : error ? (
            <LiquidGlass role="alert" intensity="medium" sx={{ p: 5, borderRadius: 5, textAlign: "center" }}><Typography variant="h5" sx={{ mb: 1 }}>بارگذاری مقاله‌ها ممکن نشد</Typography><Typography color="text.secondary">{error}</Typography></LiquidGlass>
          ) : blogs.length ? (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>
              {blogs.map((blog, index) => (
                <Box key={blog._id} sx={index === 0 ? { gridColumn: { md: "span 2", xl: "span 2" } } : undefined}>
                  <BlogCard blog={blog} index={index} featured={index === 0} />
                </Box>
              ))}
            </Box>
          ) : (
            <LiquidGlass className="blog-page-reveal" intensity="medium" sx={{ py: 9, px: 3, borderRadius: 5, textAlign: "center" }}><AutoStoriesRoundedIcon sx={{ color: "primary.main", fontSize: 58, opacity: .75, mb: 2 }} /><Typography variant="h5" sx={{ mb: 1 }}>مقاله‌ای با این مشخصات پیدا نشد</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>عبارت جستجو یا دسته‌بندی انتخاب‌شده را تغییر دهید.</Typography><Button variant="outlined" onClick={resetFilters}>نمایش همه مقاله‌ها</Button></LiquidGlass>
          )}

          {totalPages > 1 && !loading && (
            <Box className="blog-page-reveal" sx={{ display: "flex", justifyContent: "center", mt: 7 }}><LiquidGlass intensity="subtle" sx={{ p: 1.2, borderRadius: 99 }}><Pagination count={totalPages} page={page} onChange={(_, value) => { setPage(value); window.scrollTo({ top: 730, behavior: "smooth" }); }} color="primary" shape="rounded" /></LiquidGlass></Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
