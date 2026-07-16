"use client"

import Link from "next/link";
import React from "react";
import { setImagePath } from "@/lib/landing/general";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full">
      <Link
        href={`/products/${product.slug}`}
        className="block rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform transition-shadow overflow-hidden duration-300"
      >
        <img
          src={setImagePath(product?.media?.[0]?.path)}
          alt="Product Image"
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="m-0">{product.name}</h3>

          <p className="mt-2 mb-4 text-gray-700 text-sm line-clamp-2 leading-snug">
            {product?.excerpt || ""}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
