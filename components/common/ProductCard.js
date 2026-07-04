import React from "react";
import { toPersian } from "@/lib/number";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="flex flex-col bg-surface rounded-2xl shadow-md hover:shadow-lg hover:scale-[101%] transition-all duration-300">
      <div className="rounded-2xl">
        <img className="rounded-t-2xl" src={product.media?.[0]?.path} alt={product?.media?.[0]?.toPersian} />
      </div>

      <div className="p-4">
        <h2 className="text-primary">{product.name}</h2>

        <p className="text-sm text-primaryLight">کد: {toPersian(product.code)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
