"use client";

import { useEffect, useState } from "react";
import { getAllBlogs } from "@/app/actions/blog";
import { getAllCategories } from "@/app/actions/category";
import BlogCard from "./BlogCard";
import Breadcrumb from "../Breadcrumb";
import Container from "../Container";
import Filter from "../Filter";
import HeroBanner from "../HeroBanner";
import Pagination from "../Pagination";
import Sort from "../Sort";

export default function BlogOverviewWrapper({ initialCategory = "" }) {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const timer = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 350); return () => clearTimeout(timer); }, [search]);
  useEffect(() => { getAllCategories({ page_size: 100 }).then((response) => setCategories(response?.data?.categories || [])); }, []);
  useEffect(() => {
    let active = true;
    setTimeout(() => {
      setLoading(true);
      getAllBlogs({ search: debouncedSearch, page, page_size: 9, sort: [{ field: "createdAt", order: sort }], filters: category ? { categories: { type: "in", value: [category] } } : {} }).then((response) => {
        if (!active) return;
        setBlogs(response?.data?.blogs || []); setTotal(response?.data?.total || 0); setLoading(false);
      });
    }, 0);
    return () => { active = false; };
  }, [category, debouncedSearch, page, sort]);

  return <div><HeroBanner src="/images/static/laptop.webp" heading="یو‌پی‌اس بلاگ" subtext="مقالات تخصصی برق اضطراری، نگهداری و انتخاب تجهیزات" textPlacement="center" /><Container><Breadcrumb items={[{ label: "کلینیک یو پی اس", link: "/" }, { label: "یو‌پی‌اس بلاگ" }]} /><div className="mt-4 grid grid-cols-1 md:grid-cols-4 md:gap-8"><Filter search={search} onSearchChange={setSearch} categories={categories} category={category} onCategoryChange={(value) => { setCategory(value); setPage(1); }} /><div className="col-span-3"><div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"><div className="col-span-full mt-4 md:mt-0"><Sort value={sort} onChange={(value) => { setSort(value); setPage(1); }} /></div>{loading ? <p className="col-span-full py-20 text-center">در حال بارگذاری...</p> : blogs.length ? blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />) : <p className="col-span-full py-20 text-center">مطلبی یافت نشد.</p>}</div><Pagination currentPage={page} totalItems={total} onChange={setPage} /></div></div></Container></div>;
}
