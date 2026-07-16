"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/app/actions/product";
import { getAllCategories } from "@/app/actions/category";
import Breadcrumb from "../Breadcrumb";
import Container from "../Container";
import Filter from "../Filter";
import NoProductsFound from "../NoProductsFound";
import Pagination from "../Pagination";
import ProductCard from "../ProductCard";
import Sort from "../Sort";

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

  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => { getAllCategories({ page_size: 100 }).then((response) => setCategories(response?.data?.categories || [])); }, []);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      setLoading(true);
      getAllProducts({ search: debouncedSearch, page, page_size: 9, sort: [{ field: "createdAt", order: sort }], filters: category ? { category: { type: "eq", value: category } } : {} }).then((response) => {
        if (!active) return;
        setProducts(response?.data?.products || []);
        setTotal(response?.data?.total || 0);
        setLoading(false);
      });
    }, 0);
    return () => { active = false; };
  }, [category, debouncedSearch, page, sort]);

  return (
    <Container>
      <div>
        <Breadcrumb items={[{ label: "کلینیک یو پی اس", link: "/" }, { label: "فروشگاه" }]} />
        <h1 className="text-2xl font-semibold">محصولات کلینیک یو پی اس</h1>
        <p className="mt-4">انواع یو پی اس، باتری، استابیلایزر، موتور برق و دیزل ژنراتور را بر اساس نیاز فنی خود بررسی کنید.</p>
        <p className="mt-2">برای انتخاب ظرفیت و زمان پشتیبانی مناسب می‌توانید از مشاوره تخصصی ما استفاده کنید.</p>
        {category && <Link href="/generators-projects" className="mt-8 flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 md:text-base">مشاهده آخرین پروژه‌های موتور برق و ژنراتور</Link>}
      </div>
      <div className="grid grid-cols-1 py-8 md:grid-cols-4 md:gap-8">
        <Filter search={search} onSearchChange={setSearch} categories={categories} category={category} onCategoryChange={(value) => { setCategory(value); setPage(1); }} />
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full mt-4 md:mt-0"><Sort value={sort} onChange={(value) => { setSort(value); setPage(1); }} /></div>
            {loading ? <p className="col-span-full py-20 text-center">در حال بارگذاری...</p> : products.length ? products.map((product) => <ProductCard key={product._id} product={product} />) : <div className="col-span-full"><NoProductsFound /></div>}
          </div>
          <Pagination currentPage={page} totalItems={total} onChange={setPage} />
        </div>
      </div>
    </Container>
  );
}
