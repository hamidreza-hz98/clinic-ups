"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/actions/project";
import { getAllCategories } from "@/app/actions/category";
import Breadcrumb from "../Breadcrumb";
import Container from "../Container";
import Filter from "../Filter";
import HeroBanner from "../HeroBanner";
import NoProjectsFound from "../NoProjectsFound";
import Pagination from "../Pagination";
import ProjectCard from "../ProjectCard";
import Sort from "../Sort";

export default function ProjectsOverviewWrapper({ initialCategory = "" }) {
  const [projects, setProjects] = useState([]);
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
      getAllProjects({ search: debouncedSearch, page, page_size: 9, sort: [{ field: "createdAt", order: sort }], filters: category ? { categories: { type: "in", value: [category] } } : {} }).then((response) => {
        if (!active) return;
        setProjects(response?.data?.projects || []); setTotal(response?.data?.total || 0); setLoading(false);
      });
    }, 0);
    return () => { active = false; };
  }, [category, debouncedSearch, page, sort]);

  return <div><HeroBanner src="/images/static/datacenter_systems.webp" heading="پروژه‌ها" subtext="راهکارهای اجراشده کلینیک یو پی اس برای مراکز حساس و زیرساخت‌های حیاتی" textPlacement="center" /><Container><Breadcrumb items={[{ label: "کلینیک یو پی اس", link: "/" }, { label: "پروژه‌ها" }]} /><h1 className="text-2xl font-semibold">پروژه‌های انجام‌شده</h1><p className="mt-4">نمونه‌هایی از طراحی، تأمین، نصب و راه‌اندازی سامانه‌های برق اضطراری را مشاهده کنید.</p></Container><Container><div className="grid grid-cols-1 gap-8 px-8 py-12 md:grid-cols-4"><Filter search={search} onSearchChange={setSearch} categories={categories} category={category} onCategoryChange={(value) => { setCategory(value); setPage(1); }} /><div className="col-span-3"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><div className="col-span-full"><Sort value={sort} onChange={(value) => { setSort(value); setPage(1); }} /></div>{loading ? <p className="col-span-full py-20 text-center">در حال بارگذاری...</p> : projects.length ? projects.map((project) => <ProjectCard key={project._id} project={project} />) : <div className="col-span-full"><NoProjectsFound /></div>}</div><Pagination currentPage={page} totalItems={total} onChange={setPage} /></div></div></Container></div>;
}
