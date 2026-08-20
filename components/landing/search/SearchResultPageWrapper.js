"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import { getAllProducts } from "@/app/actions/product";
import { getAllProjects } from "@/app/actions/project";
import { getAllBlogs } from "@/app/actions/blog";
import { setImagePath } from "@/lib/landing/general";
import BlogCard from "../blog/BlogCard";
import ProjectShowcaseCard from "../projects/ProjectShowcaseCard";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

const quickSearches = ["یو پی اس", "باتری", "ژنراتور", "استابلایزر"];
const emptyResults = { products: [], projects: [], blogs: [] };

function ProductSearchCard({ product, index }) {
  const image = setImagePath(product?.media?.[0]?.path);

  return (
    <SpotlightGlass
      component={Link}
      href={`/products/${product.slug}`}
      intensity="medium"
      interactive
      className="search-result-card search-page-reveal"
      sx={{ "--search-delay": `${index * 65}ms`, minHeight: 390, display: "flex", alignItems: "flex-end", borderRadius: 5, color: "inherit" }}
    >
      <Box sx={{ display: "contents" }}>
        <Box component="img" src={image} alt={product?.media?.[0]?.mediaAlt || product.name} loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Box className="search-result-card-overlay" />
        <Box className="search-result-card-grid" aria-hidden />
        <Box sx={{ position: "relative", zIndex: 2, width: "100%", p: 3 }}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            {product.category?.name && <Chip label={product.category.name} size="small" className="selected-project-chip" />}
            {product.brand?.name && <Chip label={product.brand.name} size="small" variant="outlined" />}
          </Stack>
          <Typography component="h3" sx={{ fontSize: "1.45rem", fontWeight: 900, lineHeight: 1.55 }}>{product.name}</Typography>
          {product.excerpt && <Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.9, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.excerpt}</Typography>}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2.5, pt: 2, borderTop: "1px solid rgba(var(--landing-contrast-rgb),.12)", color: "primary.main" }}>
            <Typography sx={{ fontSize: ".78rem", fontWeight: 850 }}>مشاهده محصول</Typography>
            <ArrowBackRoundedIcon className="search-result-arrow" fontSize="small" />
          </Stack>
        </Box>
      </Box>
    </SpotlightGlass>
  );
}

function ResultSection({ eyebrow, title, count, icon: Icon, href, children }) {
  return (
    <Box component="section" className="search-page-reveal" sx={{ mt: { xs: 8, md: 11 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "flex-end" }} justifyContent="space-between" useFlexGap gap={3} sx={{ mb: 4 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ color: "primary.main", mb: 1 }}><Icon fontSize="small" /><Typography sx={{ fontFamily: "monospace", direction: "ltr", letterSpacing: ".11em", fontSize: ".7rem" }}>{eyebrow}</Typography></Stack>
          <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>{title}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{count.toLocaleString("fa-IR")} نتیجه مرتبط پیدا شد</Typography>
        </Box>
        <Button component={Link} href={href} variant="outlined" endIcon={<ArrowBackRoundedIcon />}>مشاهده همه</Button>
      </Stack>
      {children}
    </Box>
  );
}

function ResultsSkeleton() {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 3, mt: 7 }}>{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} variant="rounded" height={330} sx={{ borderRadius: 5, bgcolor: "rgba(var(--landing-contrast-rgb),.055)" }} />)}</Box>;
}

export default function SearchResultPageWrapper({ initialQuery = "" }) {
  const router = useRouter();
  const rootRef = useRef(null);
  const requestRef = useRef(0);
  const [search, setSearch] = useState(initialQuery);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(emptyResults);

  const total = results.products.length + results.projects.length + results.blogs.length;
  const hasSearched = Boolean(searchedQuery);

  const runSearch = async (rawQuery, updateUrl = true) => {
    const query = rawQuery.trim();
    if (!query) return;
    const requestId = ++requestRef.current;
    setSearch(query);
    setSearchedQuery(query);
    setLoading(true);
    setError("");

    if (updateUrl) router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });

    try {
      const [products, projects, blogs] = await Promise.all([
        getAllProducts({ search: query, page_size: 9 }),
        getAllProjects({ search: query, page_size: 9 }),
        getAllBlogs({ search: query, page_size: 9 }),
      ]);
      if (requestId !== requestRef.current) return;
      setResults({
        products: products?.data?.products || [],
        projects: projects?.data?.projects || [],
        blogs: blogs?.data?.blogs || [],
      });
    } catch {
      if (requestId === requestRef.current) {
        setResults(emptyResults);
        setError("در دریافت نتایج مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      if (requestId === requestRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialQuery.trim()) return undefined;
    const timer = window.setTimeout(() => runSearch(initialQuery, false), 0);
    return () => window.clearTimeout(timer);
    // Search once from the server-provided URL value on first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const elements = root.querySelectorAll(".search-page-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [loading, results]);

  const submit = (event) => {
    event.preventDefault();
    runSearch(search);
  };

  const reset = () => {
    requestRef.current += 1;
    setSearch("");
    setSearchedQuery("");
    setResults(emptyResults);
    setError("");
    setLoading(false);
    router.replace("/search", { scroll: false });
  };

  return (
    <Box ref={rootRef} className="search-page" sx={{ minHeight: "100vh", overflow: "hidden", bgcolor: "background.default", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", minHeight: { xs: 680, md: 720 }, display: "flex", alignItems: "center", pt: { xs: 13, md: 15 }, pb: { xs: 8, md: 10 } }}>
        <EnergyShaderBackground />
        <Box className="search-radar" aria-hidden><span /><span /><span /></Box>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
            <LiquidGlass intensity="medium" className="hero-reveal" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2, py: 1, borderRadius: 99, mb: 2.5 }}><TravelExploreRoundedIcon sx={{ color: "primary.main", fontSize: 19 }} /><Typography sx={{ fontFamily: "monospace", direction: "ltr", letterSpacing: ".1em", fontSize: ".68rem" }}>CLINIC UPS / SMART SEARCH</Typography></LiquidGlass>
            <Typography component="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "2.65rem", sm: "4rem", md: "5.4rem" }, fontWeight: 950, lineHeight: 1.2, letterSpacing: "-.055em" }}>هر راهکار، پروژه و دانشی که <Box component="span" sx={{ color: "primary.main", textShadow: "0 0 34px rgba(var(--landing-accent-rgb),.28)" }}>نیاز دارید</Box></Typography>
            <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 670, mx: "auto", mt: 2.2, lineHeight: 2.05, fontSize: { xs: ".92rem", md: "1.05rem" } }}>نام محصول، نوع سیستم برق اضطراری، پروژه یا موضوع آموزشی را وارد کنید؛ جستجوی یکپارچه کلینیک یو پی اس همه بخش‌ها را هم‌زمان بررسی می‌کند.</Typography>

            <LiquidGlass component="form" onSubmit={submit} intensity="strong" className="hero-reveal hero-reveal-3 search-command" sx={{ mt: 4.5, p: { xs: 1.2, sm: 1.5 }, borderRadius: { xs: 4, sm: 99 }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "stretch", gap: 1.25 }}>
              <TextField
                autoFocus
                fullWidth
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="مثلاً یو پی اس آزمایشگاهی یا موتور برق"
                inputProps={{ "aria-label": "عبارت جستجو" }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "primary.main" }} /></InputAdornment> } }}
                sx={{ "& .MuiOutlinedInput-root": { minHeight: 58, borderRadius: 99, bgcolor: "rgba(4,10,17,.7)", "& fieldset": { borderColor: "transparent" }, "&:hover fieldset": { borderColor: "rgba(var(--landing-accent-rgb),.2)" }, "&.Mui-focused fieldset": { borderColor: "rgba(var(--landing-accent-rgb),.5)" } } }}
              />
              <Button type="submit" variant="contained" size="large" disabled={!search.trim() || loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SearchRoundedIcon />} sx={{ minWidth: { sm: 150 }, minHeight: 58, px: 3.5 }}>جستجو</Button>
            </LiquidGlass>

            <Stack direction="row" justifyContent="center" alignItems="center" useFlexGap flexWrap="wrap" gap={1.25} className="hero-reveal hero-reveal-3" sx={{ mt: 3 }}>
              <Typography color="text.secondary" sx={{ fontSize: ".75rem", ml: .5 }}>جستجوی سریع:</Typography>
              {quickSearches.map((item) => <Chip key={item} label={item} clickable onClick={() => runSearch(item)} variant="outlined" sx={{ borderColor: "rgba(var(--landing-contrast-rgb),.13)", bgcolor: "rgba(var(--landing-contrast-rgb),.025)", "&:hover": { borderColor: "primary.main", color: "primary.main" } }} />)}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, pb: { xs: 12, md: 16 } }}>
        {error && <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>}
        {loading && <ResultsSkeleton />}

        {!loading && hasSearched && total > 0 && (
          <>
            <LiquidGlass className="search-page-reveal search-summary" intensity="medium" sx={{ mt: { xs: -3, md: -4 }, p: { xs: 2.5, md: 3.5 }, borderRadius: 5, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2 }}>
              <Box><Typography color="text.secondary" sx={{ fontSize: ".75rem" }}>نتایج جستجو برای</Typography><Typography sx={{ mt: .5, fontSize: { xs: "1.4rem", md: "1.8rem" }, fontWeight: 900 }}>«{searchedQuery}» <Box component="span" sx={{ color: "primary.main" }}>— {total.toLocaleString("fa-IR")} نتیجه</Box></Typography></Box>
              <Button onClick={reset} startIcon={<RestartAltRoundedIcon />} color="inherit">جستجوی تازه</Button>
            </LiquidGlass>

            {results.products.length > 0 && <ResultSection eyebrow="PRODUCT MATCHES" title="محصولات" count={results.products.length} icon={Inventory2RoundedIcon} href={`/products?search=${encodeURIComponent(searchedQuery)}`}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{results.products.map((product, index) => <ProductSearchCard key={product._id} product={product} index={index} />)}</Box></ResultSection>}
            {results.projects.length > 0 && <ResultSection eyebrow="FIELD EXPERIENCE" title="پروژه‌ها" count={results.projects.length} icon={WorkspacesRoundedIcon} href={`/projects?search=${encodeURIComponent(searchedQuery)}`}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{results.projects.map((project, index) => <ProjectShowcaseCard key={project._id} project={project} index={index} compact forceVisible />)}</Box></ResultSection>}
            {results.blogs.length > 0 && <ResultSection eyebrow="KNOWLEDGE BASE" title="مقاله‌ها" count={results.blogs.length} icon={AutoStoriesRoundedIcon} href={`/blog?search=${encodeURIComponent(searchedQuery)}`}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{results.blogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} compact forceVisible />)}</Box></ResultSection>}
          </>
        )}

        {!loading && hasSearched && total === 0 && !error && (
          <LiquidGlass className="search-page-reveal is-visible" intensity="strong" sx={{ mt: { xs: -2, md: -3 }, py: { xs: 7, md: 10 }, px: 3, borderRadius: 6, textAlign: "center" }}>
            <BoltRoundedIcon sx={{ color: "primary.main", fontSize: 58, opacity: .8, mb: 2 }} />
            <Typography component="h2" variant="h3">نتیجه‌ای برای «{searchedQuery}» پیدا نشد</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3.5 }}>عبارت کوتاه‌تر یا یکی از دسته‌های اصلی تجهیزات را امتحان کنید.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" useFlexGap gap={2.5}><MagneticButton href="/categories" variant="contained">مشاهده دسته‌بندی‌ها</MagneticButton><Button onClick={reset} variant="outlined">تغییر عبارت جستجو</Button></Stack>
          </LiquidGlass>
        )}

        {!hasSearched && !loading && (
          <Box className="search-page-reveal is-visible" sx={{ mt: { xs: -2, md: -3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
            {[
              { icon: Inventory2RoundedIcon, title: "محصولات تخصصی", text: "مدل، ظرفیت، برند یا گروه تجهیزات را جستجو کنید.", href: "/products" },
              { icon: WorkspacesRoundedIcon, title: "پروژه‌های اجراشده", text: "تجربه‌های واقعی تیم در مراکز درمانی و صنعتی.", href: "/projects" },
              { icon: AutoStoriesRoundedIcon, title: "دانش تخصصی", text: "راهنماها و مقاله‌های فنی برای انتخاب مطمئن‌تر.", href: "/blog" },
            ].map(({ icon: Icon, title, text, href }) => <SpotlightGlass key={title} component={Link} href={href} interactive sx={{ p: 3.5, minHeight: 220, borderRadius: 5, color: "inherit" }}><Box sx={{ display: "contents" }}><Icon sx={{ color: "primary.main", fontSize: 34 }} /><Typography component="h2" variant="h5" sx={{ mt: 3 }}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.9 }}>{text}</Typography><ArrowBackRoundedIcon sx={{ color: "primary.main", mt: 2.5 }} /></Box></SpotlightGlass>)}
          </Box>
        )}
      </Container>
    </Box>
  );
}
