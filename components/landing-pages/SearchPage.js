"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/app/actions/product";
import { getAllProjects } from "@/app/actions/project";
import { getAllBlogs } from "@/app/actions/blog";
import { Breadcrumbs, EmptyState, EntityCard, LandingSection, LoadingGrid, PageHero } from "./LandingPageElements";

export default function SearchPage({ initialSearch = "" }) {
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);
  const [loading, setLoading] = useState(Boolean(initialSearch));
  const [results, setResults] = useState({ products: [], projects: [], blogs: [] });

  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      setLoading(true);
      Promise.all([getAllProducts({ search: query, page_size: 12 }), getAllProjects({ search: query, page_size: 12 }), getAllBlogs({ search: query, page_size: 12 })]).then(([products, projects, blogs]) => {
        setResults({ products: products?.data?.products || [], projects: projects?.data?.projects || [], blogs: blogs?.data?.blogs || [] });
        setLoading(false);
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [query]);

  const submit = (event) => { event.preventDefault(); if (!search.trim()) { setResults({ products: [], projects: [], blogs: [] }); setLoading(false); } setQuery(search); };
  const count = results.products.length + results.projects.length + results.blogs.length;

  return <><PageHero title="جستجو" description="جستجو در محصولات، پروژه‌ها و مطالب تخصصی" image="/images/static/programming.webp" /><LandingSection><Breadcrumbs items={[{ label: "جستجو" }]} /><form onSubmit={submit} className="mb-10 flex gap-3"><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="عبارت مورد نظر را وارد کنید" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-cyan-300/60" /><button className="rounded-xl bg-cyan-300 px-6 font-bold text-slate-950">جستجو</button></form>{loading ? <LoadingGrid /> : !query ? <EmptyState message="برای شروع، یک عبارت جستجو وارد کنید." /> : !count ? <EmptyState message="نتیجه‌ای پیدا نشد." /> : <div className="space-y-12"><ResultGroup title="محصولات" entity="products" items={results.products} /><ResultGroup title="پروژه‌ها" entity="projects" items={results.projects} /><ResultGroup title="وبلاگ" entity="blogs" items={results.blogs} /></div>}</LandingSection></>;
}

function ResultGroup({ title, entity, items }) { if (!items.length) return null; return <section><h2 className="mb-5 text-2xl font-black text-white">{title}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <EntityCard key={item._id} item={item} entity={entity} />)}</div></section>; }
