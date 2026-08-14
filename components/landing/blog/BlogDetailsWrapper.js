"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import moment from "jalali-moment";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { getBlogDetails } from "@/app/actions/blog";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";
import BlogCard from "./BlogCard";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

function ArticleMeta({ icon: Icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.1}>
      <Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 2, color: "primary.main", bgcolor: "rgba(0,219,231,.08)", border: "1px solid rgba(0,219,231,.16)" }}>
        <Icon sx={{ fontSize: 19 }} />
      </Box>
      <Box>
        <Typography sx={{ color: "text.secondary", fontSize: ".67rem", mb: .2 }}>{label}</Typography>
        <Typography sx={{ fontSize: ".82rem", fontWeight: 750 }}>{value || "—"}</Typography>
      </Box>
    </Stack>
  );
}

function RelatedProductCard({ product, index }) {
  return (
    <SpotlightGlass component={Link} href={`/products/${product.slug}`} interactive className="blog-page-reveal" sx={{ "--blog-card-delay": `${index * 75}ms`, minHeight: 360, borderRadius: 4.5, color: "inherit", display: "flex", alignItems: "flex-end" }}>
      <Box sx={{ display: "contents" }}>
        <Box component="img" src={setImagePath(product?.media?.[0]?.path)} alt={product?.media?.[0]?.mediaAlt || product.name} loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .55, filter: "brightness(.65) saturate(.75)", transition: "transform .7s ease, opacity .5s ease" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 25%, rgba(5,9,15,.98) 88%)" }} />
        <Box sx={{ position: "relative", zIndex: 2, p: 3, width: "100%" }}>
          <Typography component="h3" sx={{ fontSize: "1.25rem", fontWeight: 850, lineHeight: 1.65, mb: 1 }}>{product.name}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: ".8rem", lineHeight: 1.8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.excerpt || "مشاهده مشخصات و اطلاعات فنی محصول"}</Typography>
          <ArrowBackRoundedIcon sx={{ color: "primary.main", mt: 2 }} />
        </Box>
      </Box>
    </SpotlightGlass>
  );
}

export default function BlogDetailsWrapper({ slug }) {
  const rootRef = useRef(null);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => getBlogDetails({ slug }).then((response) => {
      if (!active) return;
      if (response?.status && response.status >= 400) {
        setError(response.message || "مقاله موردنظر پیدا نشد.");
        setBlog(null);
      } else {
        setBlog(response?.data || null);
      }
      setLoading(false);
    }), 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

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
    }, { threshold: .06, rootMargin: "0px 0px -4%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [blog, loading]);

  if (loading) {
    return <Box sx={{ minHeight: "75vh", bgcolor: "#070B12", display: "grid", placeItems: "center" }}><Stack alignItems="center" spacing={2}><CircularProgress size={40} thickness={2.4} /><Typography color="text.secondary">در حال آماده‌سازی مقاله</Typography></Stack></Box>;
  }

  if (error || !blog) {
    return <Box sx={{ minHeight: "75vh", bgcolor: "#070B12", display: "grid", placeItems: "center", px: 2 }}><LiquidGlass role="alert" sx={{ p: 5, borderRadius: 5, textAlign: "center", maxWidth: 560 }}><AutoStoriesRoundedIcon sx={{ color: "primary.main", fontSize: 52, mb: 2 }} /><Typography variant="h4" sx={{ mb: 1 }}>مقاله در دسترس نیست</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>{error || "اطلاعات این مقاله دریافت نشد."}</Typography><Button component={Link} href="/blog" variant="outlined">بازگشت به مجله</Button></LiquidGlass></Box>;
  }

  const publishedAt = moment(blog.createdAt).locale("fa").format("jD jMMMM jYYYY");
  const relatedBlogs = blog.relatedBlogs || [];
  const relatedProducts = blog.relatedProducts || [];

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "#070B12", color: "text.primary", minHeight: "100vh" }}>
      <Box aria-hidden sx={{ position: "fixed", top: 0, right: 0, zIndex: 1500, width: `${progress}%`, height: 3, bgcolor: "primary.main", boxShadow: "0 0 14px rgba(0,219,231,.8)", transition: "width .1s linear" }} />

      <Box component="section" sx={{ position: "relative", isolation: "isolate", pt: { xs: 14, md: 16 }, pb: { xs: 8, md: 12 }, minHeight: { md: 790 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 75% 42%, rgba(0,219,231,.1), transparent 31%), linear-gradient(180deg, transparent 52%, #070B12 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs sx={{ mb: { xs: 4, md: 6 }, color: "text.secondary", "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,.3)" } }}>
            <Link href="/">خانه</Link>
            <Link href="/blog">مجله تخصصی</Link>
            <Typography color="primary.main" noWrap sx={{ maxWidth: { xs: 180, md: 500 }, fontSize: ".78rem" }}>{blog.title}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
            <Box>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="hero-reveal hero-reveal-1" sx={{ mb: 2.5 }}>
                {(blog.categories || []).map((category) => <Chip key={category._id} component={Link} href={`/blog?category=${category._id}`} clickable label={category.name} size="small" variant="outlined" sx={{ color: "primary.light", borderColor: "rgba(0,219,231,.3)", bgcolor: "rgba(0,219,231,.06)" }} />)}
              </Stack>
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "2.55rem", sm: "3.4rem", md: "4.65rem" }, lineHeight: 1.27, mb: 2.4 }}>{blog.title}</Typography>
              {blog.excerpt && <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 810, fontSize: { xs: "1rem", md: "1.12rem" }, lineHeight: 2.05, mb: 3.5 }}>{blog.excerpt}</Typography>}
              <Stack direction="row" spacing={2.5} useFlexGap flexWrap="wrap" className="hero-reveal hero-reveal-3">
                <ArticleMeta icon={AccessTimeRoundedIcon} label="زمان مطالعه" value={blog.readTime ? `${toPersianNumber(blog.readTime)} دقیقه` : "—"} />
                <ArticleMeta icon={CalendarMonthRoundedIcon} label="تاریخ انتشار" value={publishedAt} />
                <ArticleMeta icon={VisibilityRoundedIcon} label="بازدید" value={toPersianNumber(blog.visits || 0)} />
                {blog.author?.name && <ArticleMeta icon={PersonOutlineRoundedIcon} label="نویسنده" value={blog.author.name} />}
              </Stack>
            </Box>

            <SpotlightGlass intensity="strong" className="hero-reveal hero-reveal-2" sx={{ minHeight: { xs: 390, md: 550 }, borderRadius: 6, p: 1.2 }}>
              <Box sx={{ display: "contents" }}>
                <Box component="img" src={setImagePath(blog.thumbnail?.[0]?.path)} alt={blog.thumbnail?.[0]?.mediaAlt || blog.title} sx={{ position: "absolute", inset: 9, width: "calc(100% - 18px)", height: "calc(100% - 18px)", objectFit: "cover", borderRadius: 5, filter: "saturate(.8) brightness(.75)" }} />
                <Box sx={{ position: "absolute", inset: 9, borderRadius: 5, background: "linear-gradient(180deg, transparent 55%, rgba(4,8,14,.9))" }} />
                <Typography sx={{ position: "absolute", left: 28, bottom: 24, direction: "ltr", color: "primary.main", fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".11em" }}>CLINIC UPS / FIELD NOTES</Typography>
              </Box>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 11, md: 16 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 245px" }, gap: { xs: 4, lg: 5 }, alignItems: "start" }}>
          <LiquidGlass component="article" intensity="strong" className="blog-page-reveal" sx={{ p: { xs: 2.6, sm: 4, md: 6 }, borderRadius: 6 }}>
            <Box sx={{ display: "contents" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, pb: 3, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".12em", direction: "ltr" }}>ARTICLE / INSIGHT</Typography><Typography component="h2" variant="h4" sx={{ mt: 1 }}>متن مقاله</Typography></Box>
                <AutoStoriesRoundedIcon sx={{ color: "primary.main", fontSize: 34, opacity: .75 }} />
              </Stack>
              <Box className="blog-rich-content" dangerouslySetInnerHTML={{ __html: blog.content || "" }} />

              {(blog.categories?.length > 0 || blog.tags?.length > 0) && (
                <Box sx={{ mt: 6, pt: 3.5, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  {blog.categories?.length > 0 && <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}><CategoryRoundedIcon sx={{ color: "primary.main" }} /><Typography color="text.secondary" sx={{ ml: 1 }}>دسته‌بندی:</Typography>{blog.categories.map((category) => <Chip key={category._id} component={Link} href={`/blog?category=${category._id}`} clickable label={category.name} size="small" variant="outlined" />)}</Stack>}
                  {blog.tags?.length > 0 && <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap"><LocalOfferRoundedIcon sx={{ color: "primary.main" }} /><Typography color="text.secondary" sx={{ ml: 1 }}>برچسب‌ها:</Typography>{blog.tags.map((tag) => <Chip key={tag._id} label={tag.name} size="small" />)}</Stack>}
                </Box>
              )}
            </Box>
          </LiquidGlass>

          <LiquidGlass component="aside" intensity="medium" className="blog-page-reveal" sx={{ p: 2.5, borderRadius: 4.5, position: { lg: "sticky" }, top: { lg: 118 } }}>
            <Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".12em", direction: "ltr", mb: 1 }}>READING STATUS</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>پیشرفت مطالعه</Typography>
            <Typography color="text.secondary" sx={{ fontSize: ".8rem", lineHeight: 1.8, mb: 2.5 }}>میزان پیمایش شما در این مقاله</Typography>
            <Box sx={{ height: 5, borderRadius: 99, bgcolor: "rgba(255,255,255,.08)", overflow: "hidden", mb: 1 }}><Box sx={{ height: "100%", width: `${progress}%`, bgcolor: "primary.main", boxShadow: "0 0 12px rgba(0,219,231,.7)", transition: "width .1s linear" }} /></Box>
            <Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", fontSize: ".75rem" }}>{Math.round(progress)}%</Typography>
          </LiquidGlass>
        </Box>

        {relatedBlogs.length > 0 && (
          <Box component="section" sx={{ mt: { xs: 9, md: 13 } }}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "end" }} spacing={2} className="blog-page-reveal" sx={{ mb: 4 }}><Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".7rem", letterSpacing: ".12em", direction: "ltr", mb: 1 }}>CONTINUE READING</Typography><Typography component="h2" variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" } }}>مقاله‌های مرتبط</Typography></Box><Button component={Link} href="/blog" endIcon={<ArrowBackRoundedIcon />}>مشاهده مجله</Button></Stack>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{relatedBlogs.slice(0, 3).map((item, index) => <BlogCard key={item._id} blog={item} index={index} compact />)}</Box>
          </Box>
        )}

        {relatedProducts.length > 0 && (
          <Box component="section" sx={{ mt: { xs: 9, md: 13 } }}>
            <Box className="blog-page-reveal" sx={{ mb: 4 }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: ".7rem", letterSpacing: ".12em", direction: "ltr", mb: 1 }}>RECOMMENDED HARDWARE</Typography><Typography component="h2" variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" } }}>محصولات مرتبط</Typography></Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{relatedProducts.slice(0, 3).map((product, index) => <RelatedProductCard key={product._id} product={product} index={index} />)}</Box>
          </Box>
        )}

        <LiquidGlass className="blog-page-reveal" intensity="strong" sx={{ mt: { xs: 9, md: 13 }, p: { xs: 3.5, md: 6 }, borderRadius: 6, textAlign: "center" }}>
          <Typography component="h2" variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 1.5 }}>برای انتخاب مطمئن‌تر، با متخصص گفتگو کنید</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto", lineHeight: 2, mb: 3.5 }}>اگر این مقاله به یک نیاز واقعی در مجموعه شما مربوط است، تیم فنی کلینیک یو پی اس آماده بررسی و ارائه راهکار است.</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" useFlexGap gap={2.5}><MagneticButton component={Link} href="/contact" variant="contained" size="large">دریافت مشاوره تخصصی</MagneticButton><Button component={Link} href="/blog" variant="outlined" size="large">بازگشت به مجله</Button></Stack>
        </LiquidGlass>
      </Container>
    </Box>
  );
}
