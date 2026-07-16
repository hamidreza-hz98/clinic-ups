"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { getAllCategories } from "@/app/actions/category";
import { navLinks } from "@/constants/landing/routes";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarItems, setNavbarItems] = useState(navLinks);

  useEffect(() => {
    let active = true;
    getAllCategories({ page_size: 100 }).then((response) => {
      if (!active) return;
      const categories = response?.data?.categories || [];
      setNavbarItems(navLinks.map((link) => link.href === "/categories" ? {
        ...link,
        children: categories.map((category) => ({
          href: `/products?category=${category._id}`,
          title: category.name,
        })),
      } : link));
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full ${scrolled ? "fixed top-0 z-50 bg-black text-white" : ""}`}>
      {!scrolled && (
        <div className="flex w-full items-center justify-between bg-yellow-400 sm:gap-2 sm:px-8">
          {["general_electric.png", "chloride.png", "master_guard.png", "riello.png", "apc.png", "tescom.png", "astrid.webp"].map((img, index) => (
            <img key={img} src={`/images/brands/ups/${img}`} alt={`برند ${index + 1}`} className="max-h-12 max-w-10 object-contain sm:h-auto sm:max-w-16" />
          ))}
        </div>
      )}

      <div className={`${scrolled ? "py-2 shadow-lg" : "py-4"} bg-black text-white`}>
        <div className="hidden items-center justify-between px-8 lg:flex">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="کلینیک یو پی اس" className="h-12" />
            <span className="text-xl font-bold">کلینیک یو پی اس</span>
          </Link>

          <nav className="flex items-center gap-6">
            {navbarItems.map((item) => (
              <div key={item.href} className="group relative">
                <Link href={item.href} className="flex items-center gap-1 font-medium hover:text-yellow-400">
                  {item.children?.length > 0 && <FaChevronDown size={12} className="text-gray-400" />}
                  {item.title}
                </Link>
                {item.children?.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-10 mt-2 w-max rounded-lg bg-gray-800/30 text-yellow-400 opacity-0 shadow-lg backdrop-blur-[15px] transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <div key={child.href} className="group/item relative z-10">
                        <Link href={child.href} className="flex items-center justify-between px-4 py-2 hover:rounded-lg hover:text-white">
                          {child.title}
                          {child.children?.length > 0 && <FaChevronLeft size={12} />}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link aria-label="جستجو" href="/search" className="text-white hover:text-yellow-400"><CiSearch size={24} /></Link>
        </div>

        <div className="flex items-center justify-between px-4 lg:hidden">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} aria-label="باز کردن منو" className="text-white"><FiMenu size={24} /></button>
            <Link aria-label="جستجو" href="/search" className="text-white"><CiSearch size={24} /></Link>
          </div>
          <Link href="/"><img src="/images/logo.png" alt="کلینیک یو پی اس" className="h-12" /></Link>
        </div>

        <aside className={`fixed right-0 top-0 z-50 h-full w-56 overflow-hidden shadow-lg backdrop-blur-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="absolute inset-0 scale-110 bg-cover bg-center blur-lg" style={{ backgroundImage: "url('/images/static/workspace.webp')" }} />
          <div className="relative z-10 h-full bg-black/55">
            <div className="flex items-center justify-between border-b border-white/20 px-4 py-4">
              <h2 className="font-bold text-white">منوی صفحات</h2>
              <button onClick={() => setSidebarOpen(false)} aria-label="بستن منو" className="text-xl text-gray-100">×</button>
            </div>
            <nav className="flex flex-col gap-4 p-4">
              {navbarItems.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} onClick={() => setSidebarOpen(false)} className="flex items-center gap-1 font-medium text-white hover:text-yellow-500">
                    {item.children?.length > 0 && "+ "}{item.title}
                  </Link>
                  {item.children?.length > 0 && <div className="mt-2 ps-4">{item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setSidebarOpen(false)} className="block py-1 text-sm text-gray-200 hover:text-yellow-500">{child.title}</Link>)}</div>}
                </div>
              ))}
            </nav>
          </div>
        </aside>
        {sidebarOpen && <button aria-label="بستن منو" className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />}
      </div>
    </header>
  );
}
