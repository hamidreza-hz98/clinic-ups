"use client"

import { CiClock2, CiPen } from "react-icons/ci";

import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import moment from "jalali-moment";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";

const BlogCard = ({ blog }) => {
  return (
    <div className="w-full">
      <Link
        href={`/blog/${blog?.slug}`}
        className="block rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform transition-shadow overflow-hidden duration-300"
      >
        <img
          src={setImagePath(blog?.thumbnail?.[0]?.path)}
          className="w-full h-48 object-cover"
          alt={blog?.title}
        />

        <div className="w-full p-4">
          <h2 className="m-0 font-semibold line-clamp-2 leading-snug">{blog?.title}</h2>

          <p className="text-gray-800 mt-2 text-sm flex items-center justify-start gap-2">
            <CiClock2  />

            زمان مطالعه:
            <span className="text-gray-600 whitespace-nowrap">
              {toPersianNumber(blog?.readTime)} دقیقه
            </span>
          </p>

          <p className="text-gray-800 mt-2 text-sm flex items-center justify-start gap-2">
            <CiPen  />
            زمان انتشار:
            <span className="text-gray-600 whitespace-nowrap">
              {moment(blog?.createdAt).locale("fa").format("jD jMMMM jYYYY")}
            </span>
          </p>

          <p className="text-gray-800 mt-2 text-sm flex items-center justify-start gap-2">
            <FaRegEye  />
            بازدید:
            <span className="text-gray-600 whitespace-nowrap">
               {toPersianNumber(blog?.visits)}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
