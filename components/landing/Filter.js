"use client";

import { CiSearch } from "react-icons/ci";

export default function Filter({ search, onSearchChange, categories = [], category, onCategoryChange }) {
  return (
    <div>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500"><CiSearch size={30} /></span>
        <input
          type="search"
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
          placeholder="جستجو"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      {categories.length > 0 && (
        <div className="mt-6">
          <label htmlFor="category-filter" className="mb-2 block font-semibold">دسته‌بندی</label>
          <select id="category-filter" value={category} onChange={(event) => onCategoryChange(event.target.value)} className="select select-bordered w-full">
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}
