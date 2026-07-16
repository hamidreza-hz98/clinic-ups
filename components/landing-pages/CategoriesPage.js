"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCategories } from "@/app/actions/category";
import { Breadcrumbs, EmptyState, LandingSection, LoadingGrid, mediaPath, PageHero } from "./LandingPageElements";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCategories({ page_size: 100 }).then((response) => {
      if (response?.status) setError(response.message);
      else setCategories(response?.data?.categories || []);
      setLoading(false);
    });
  }, []);

  return <><PageHero title="دسته‌بندی محصولات" description="انتخاب سریع راهکار مناسب بر اساس نوع تجهیزات" image="/images/static/electricity.webp" /><LandingSection><Breadcrumbs items={[{ label: "دسته‌بندی‌ها" }]} />{loading ? <LoadingGrid /> : error ? <EmptyState message={error} /> : categories.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category._id} href={`/products?category=${category._id}`} className="group relative min-h-72 overflow-hidden rounded-2xl border border-white/10"><img src={mediaPath(category, "categories")} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><h2 className="text-2xl font-black text-white">{category.name}</h2><p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-300">{category.excerpt}</p></div></Link>)}</div> : <EmptyState />}</LandingSection></>;
}
