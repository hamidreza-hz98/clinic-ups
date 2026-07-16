"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getProductDetails } from "@/app/actions/product";
import { getProjectDetails } from "@/app/actions/project";
import { getBlogDetails } from "@/app/actions/blog";
import { Breadcrumbs, EmptyState, LandingSection, LoadingGrid, mediaPath, PageHero } from "./LandingPageElements";

const config = {
  products: { action: getProductDetails, indexTitle: "محصولات" },
  projects: { action: getProjectDetails, indexTitle: "پروژه‌ها" },
  blogs: { action: getBlogDetails, indexTitle: "وبلاگ" },
};

export default function EntityDetailsPage({ entity, slug }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const current = config[entity];

  useEffect(() => {
    let active = true;
    current.action({ slug }).then((response) => {
      if (!active) return;
      if (response?.status || !response?.data) setError(response?.message || "مورد درخواستی پیدا نشد.");
      else setItem(response.data);
      setLoading(false);
    });
    return () => { active = false; };
  }, [current, slug]);

  const images = useMemo(() => {
    if (!item) return [];
    return entity === "blogs" ? item.thumbnail || [] : item.media || [];
  }, [entity, item]);

  if (loading) return <><PageHero title="در حال بارگذاری" image="/images/static/electricity.webp" /><LandingSection><LoadingGrid /></LandingSection></>;
  if (error) return <><PageHero title="یافت نشد" image="/images/static/electricity.webp" /><LandingSection><EmptyState message={error} /></LandingSection></>;

  const title = entity === "blogs" ? item.title : item.name;
  const content = entity === "blogs" ? item.content : item.description;
  const heroImage = images[0]?.path || mediaPath(item, entity);

  return (
    <>
      <PageHero title={title} description={item.excerpt} image={heroImage} />
      <LandingSection>
        <Breadcrumbs items={[{ label: current.indexTitle, href: `/${entity}` }, { label: title }]} />
        {entity !== "blogs" && images.length ? (
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_120px]">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-900"><img src={images[activeImage]?.path} alt={title} className="h-full w-full object-contain" /></div>
            <div className="flex gap-3 overflow-auto md:flex-col">{images.map((image, index) => <button type="button" key={image._id || image.path || index} onClick={() => setActiveImage(index)} className={`h-24 min-w-24 overflow-hidden rounded-xl border ${activeImage === index ? "border-cyan-300" : "border-white/10"}`}><img src={image.path} alt="" className="h-full w-full object-cover" /></button>)}</div>
          </div>
        ) : null}

        {entity === "products" ? (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.brand?.name ? <Info label="برند" value={item.brand.name} /> : null}
            {item.category?.name ? <Info label="دسته‌بندی" value={item.category.name} /> : null}
            {item.price ? <Info label="قیمت" value={`${new Intl.NumberFormat("fa-IR").format(item.price)} تومان`} /> : null}
          </div>
        ) : null}
        {entity === "projects" ? (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="کارفرما" value={item.customer || "—"} />
            <Info label="محل اجرا" value={item.location || "—"} />
            <Info label="مدت تحویل" value={item.deliveryDate || "—"} />
            <Info label="تاریخ اجرا" value={item.date ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(item.date)) : "—"} />
          </div>
        ) : null}
        {entity === "products" && item.datasheet?.length ? <div className="mb-10 overflow-hidden rounded-2xl border border-white/10">{item.datasheet.map((row, index) => <div key={`${row.key}-${index}`} className="grid grid-cols-2 border-b border-white/10 px-5 py-4 last:border-0"><strong className="text-white">{row.key}</strong><span className="text-slate-300">{row.value}</span></div>)}</div> : null}
        {content ? <article className="landing-content rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-10" dangerouslySetInnerHTML={{ __html: content }} /> : <EmptyState message="توضیحاتی برای این مورد ثبت نشده است." />}

        {(item.relatedProducts?.length || item.relatedProjects?.length || item.relatedBlogs?.length) ? <Related item={item} /> : null}
      </LandingSection>
    </>
  );
}

function Info({ label, value }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><span className="text-xs text-cyan-300">{label}</span><p className="mt-2 font-bold text-white">{value}</p></div>;
}

function Related({ item }) {
  const groups = [{ title: "محصولات مرتبط", path: "products", items: item.relatedProducts }, { title: "پروژه‌های مرتبط", path: "projects", items: item.relatedProjects }, { title: "مطالب مرتبط", path: "blogs", items: item.relatedBlogs }].filter((group) => group.items?.length);
  return groups.map((group) => <div key={group.path} className="mt-12"><h2 className="mb-5 text-2xl font-black text-white">{group.title}</h2><div className="flex flex-wrap gap-3">{group.items.map((related) => <Link key={related._id} href={`/${group.path}/${related.slug}`} className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-cyan-100 transition hover:bg-cyan-300/10">{related.title || related.name}</Link>)}</div></div>);
}
