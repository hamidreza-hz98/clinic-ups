"use client";

import Link from "next/link";
import { toPersian } from "@/lib/number";

const fallbacks = {
  products: "/images/static/datacenter_systems.webp",
  projects: "/images/static/power_plant.webp",
  blogs: "/images/static/electricity.webp",
  categories: "/images/static/rounded_lamp.webp",
};

export function mediaPath(item, entity) {
  if (entity === "blogs") return item?.thumbnail?.[0]?.path || fallbacks.blogs;
  if (entity === "categories") return item?.icon?.path || fallbacks.categories;
  return item?.media?.[0]?.path || fallbacks[entity];
}

export function PageHero({ title, description, image }) {
  return (
    <section className="relative isolate min-h-[360px] overflow-hidden bg-slate-950 pt-28 md:pt-36">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070b12]/30 via-[#070b12]/70 to-[#070b12]" />
      <div className="mx-auto flex min-h-[230px] max-w-6xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-black text-white md:text-5xl">{title}</h1>
        {description ? <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 md:text-lg">{description}</p> : null}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400">
      <Link href="/" className="transition hover:text-cyan-300">صفحه اصلی</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          <span aria-hidden> / </span>
          {item.href ? <Link href={item.href} className="transition hover:text-cyan-300">{item.label}</Link> : <span className="text-slate-200">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function EntityCard({ item, entity }) {
  const title = entity === "blogs" ? item.title : item.name;
  const href = `/${entity}/${item.slug}`;
  const date = item.createdAt ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(item.createdAt)) : null;

  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.075]">
      <div className="aspect-[4/3] overflow-hidden bg-slate-900">
        <img src={mediaPath(item, entity)} alt={title || ""} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h2 className="line-clamp-2 text-lg font-bold leading-8 text-white">{title}</h2>
        {item.excerpt ? <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-400">{item.excerpt}</p> : null}
        {date ? <p className="mt-4 text-xs text-cyan-300">{date}</p> : null}
      </div>
    </Link>
  );
}

export function LoadingGrid() {
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-80 animate-pulse rounded-2xl bg-white/[0.06]" />)}</div>;
}

export function EmptyState({ message = "موردی برای نمایش پیدا نشد." }) {
  return <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center text-slate-300">{message}</div>;
}

export function Pagination({ page, total, pageSize, onChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  if (pageCount <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 disabled:opacity-30">قبلی</button>
      <span className="text-sm text-slate-400">صفحه {toPersian(page)} از {toPersian(pageCount)}</span>
      <button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)} className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 disabled:opacity-30">بعدی</button>
    </div>
  );
}

export function LandingSection({ children, className = "" }) {
  return <section className={`bg-[#070b12] px-4 py-12 text-slate-200 md:py-16 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}
