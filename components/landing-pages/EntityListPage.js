"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "@/app/actions/product";
import { getAllProjects } from "@/app/actions/project";
import { getAllBlogs } from "@/app/actions/blog";
import { getAllCategories } from "@/app/actions/category";
import { Breadcrumbs, EmptyState, EntityCard, LandingSection, LoadingGrid, PageHero, Pagination } from "./LandingPageElements";

const config = {
  products: { title: "محصولات", description: "راهکارهای تخصصی تأمین و حفاظت برق برای کاربردهای حساس", image: "/images/static/datacenter_systems.webp", action: getAllProducts, key: "products", categoryField: "category" },
  projects: { title: "پروژه‌ها", description: "بخشی از تجربه کلینیک یو پی اس در اجرای زیرساخت‌های برق پایدار", image: "/images/static/power_plant.webp", action: getAllProjects, key: "projects", categoryField: "categories" },
  blogs: { title: "وبلاگ", description: "مقاله‌ها و راهنماهای تخصصی حوزه برق اضطراری و نگهداری تجهیزات", image: "/images/static/programming.webp", action: getAllBlogs, key: "blogs", categoryField: "categories" },
};

export default function EntityListPage({ entity, initialSearch = "", initialCategory = "" }) {
  const current = config[entity];
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 9;

  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getAllCategories({ page_size: 100 }).then((response) => setCategories(response?.data?.categories || []));
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");
    const filters = category ? { [current.categoryField]: { type: entity === "products" ? "eq" : "in", value: entity === "products" ? category : [category] } } : {};
    const response = await current.action({ search: debouncedSearch, page, page_size: pageSize, filters, sort: [{ field: "createdAt", order: sort }] });
    if (response?.status) {
      setError(response.message || "دریافت اطلاعات با خطا روبه‌رو شد.");
      setItems([]);
      setTotal(0);
    } else {
      setItems(response?.data?.[current.key] || []);
      setTotal(response?.data?.total || 0);
    }
    setLoading(false);
  }, [category, current, debouncedSearch, entity, page, sort]);

  useEffect(() => {
    const timer = setTimeout(loadItems, 0);
    return () => clearTimeout(timer);
  }, [loadItems]);

  return (
    <>
      <PageHero title={current.title} description={current.description} image={current.image} />
      <LandingSection>
        <Breadcrumbs items={[{ label: current.title }]} />
        <div className="mb-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[1fr_220px_180px]">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`جستجو در ${current.title}`} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60" />
          <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="rounded-xl border border-white/10 bg-[#0d1420] px-4 py-3 text-white outline-none">
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
          <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="rounded-xl border border-white/10 bg-[#0d1420] px-4 py-3 text-white outline-none">
            <option value="desc">جدیدترین</option>
            <option value="asc">قدیمی‌ترین</option>
          </select>
        </div>
        {loading ? <LoadingGrid /> : error ? <EmptyState message={error} /> : items.length ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <EntityCard key={item._id} item={item} entity={entity} />)}</div> : <EmptyState />}
        <Pagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
      </LandingSection>
    </>
  );
}
