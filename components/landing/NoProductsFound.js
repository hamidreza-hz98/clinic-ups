"use client";

import { AiOutlineProduct } from "react-icons/ai";
import React from "react";

const NoProductsFound = () => {

  return (
    <div className="w-100 h-72 flex items-center justify-center">
      <div className="flex items-center">
        <AiOutlineProduct color="text-red-500" size={32} />

        <span className="ms-2 text-xl text-semibold">
          {" "}
          محصولی یافت نشد!
        </span>
      </div>
    </div>
  );
};

export default NoProductsFound;
