"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCategories } from "@/app/actions/category";
import { setImagePath } from "@/lib/landing/general";

export default function CategoriesOverviewPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => { getAllCategories({ page_size: 100 }).then((response) => setCategories(response?.data?.categories || [])); }, []);

  return (
    <div className="relative min-h-[83vh] w-full overflow-hidden">
      <img className="absolute inset-0 h-full w-full object-cover blur-sm" src="/images/static/wrench_laptop.webp" alt="دسته‌بندی محصولات" />
      <div className="relative min-h-[83vh] w-full px-4 py-16 md:p-16">
        <div className="grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link href={`/products?category=${category._id}`} key={category._id} className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white p-4 shadow-md transition hover:scale-105 hover:shadow-xl md:h-48 md:w-48">
              <img src={setImagePath(category.icon?.path)} alt={category.name} className="mb-2 h-16 w-16 rounded-full object-cover md:h-24 md:w-24" />
              <p className="text-center text-sm md:text-base">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
