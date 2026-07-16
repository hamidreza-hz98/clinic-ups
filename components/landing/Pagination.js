"use client";

import { toPersianNumber } from "@/lib/landing/number";

export default function Pagination({ totalItems, currentPage = 1, pageSize = 9, onChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button type="button" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)} className="btn btn-sm disabled:hidden">صفحه قبل</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), Math.max(4, currentPage + 1)).map((page) => (
        <button type="button" key={page} onClick={() => onChange(page)} className={`btn btn-sm hover:bg-gray-800 hover:text-white ${currentPage === page ? "bg-yellow-400" : "btn-outline"}`}>{toPersianNumber(page)}</button>
      ))}
      <button type="button" disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)} className="btn btn-sm disabled:hidden">صفحه بعد</button>
    </div>
  );
}
