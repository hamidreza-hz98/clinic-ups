"use client"

import { useLandingData } from "@/hooks/useLandingData";
import Link from "next/link";
import React from "react";

const CategoryCard = () => {
  const { categories } = useLandingData()
  
  if(!categories) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-8 gap-4 md:gap-8">
      <h2 className="text-primary text-xl col-span-full font-semibold"> دسته بندی محصولات </h2>

      {categories.map((category, index) => (
        <Link
        href={`/products?categories=${category.slug}`}
          key={index}
          className="flex flex-col items-center justify-center hover:shadow-md hover:scale-110 transition duration-700 p-4"
        >
          <div className="w-16 h-16 rounded-full">
            <img
              src={category.image.path}
              alt={category.excerpt}
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>

          <h3 className="mt-2 text-sm md:text-md">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
