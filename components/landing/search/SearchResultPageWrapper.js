"use client";

import { useState } from "react";
import { getAllProducts } from "@/app/actions/product";
import { getAllProjects } from "@/app/actions/project";
import { getAllBlogs } from "@/app/actions/blog";
import Container from "../Container";
import ProductCard from "../ProductCard";
import ProjectCard from "../ProjectCard";
import BlogCard from "../blog/BlogCard";

export default function SearchResultPageWrapper() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ products: [], projects: [], blogs: [] });

  const submit = async (event) => {
    event.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    const [products, projects, blogs] = await Promise.all([getAllProducts({ search, page_size: 12 }), getAllProjects({ search, page_size: 12 }), getAllBlogs({ search, page_size: 12 })]);
    setResults({ products: products?.data?.products || [], projects: projects?.data?.projects || [], blogs: blogs?.data?.blogs || [] });
    setLoading(false);
  };

  return <div className="min-h-[70vh] bg-yellow-400 py-16"><Container><h1 className="text-3xl font-bold">جستجو در کلینیک یو پی اس</h1><form onSubmit={submit} className="mt-8 flex overflow-hidden rounded-lg bg-white shadow-lg"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="نام محصول، پروژه یا مقاله" className="min-w-0 flex-1 p-4 outline-none" /><button className="bg-black px-8 font-semibold text-white">جستجو</button></form>{loading ? <p className="py-20 text-center">در حال جستجو...</p> : <div className="mt-12 space-y-12"><Results title="محصولات" items={results.products} render={(item) => <ProductCard key={item._id} product={item} />} /><Results title="پروژه‌ها" items={results.projects} render={(item) => <ProjectCard key={item._id} project={item} />} /><Results title="مقالات" items={results.blogs} render={(item) => <BlogCard key={item._id} blog={item} />} /></div>}</Container></div>;
}

function Results({ title, items, render }) { if (!items.length) return null; return <section><h2 className="mb-5 text-2xl font-bold">{title}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(render)}</div></section>; }
