"use client";

const items = [
  { label: "جدیدترین", value: "desc" },
  { label: "قدیمی‌ترین", value: "asc" },
];

export default function Sort({ value, onChange }) {
  return (
    <div className="flex items-center">
      <div className="w-full md:hidden">
        <label htmlFor="sort-select" className="mb-2 block text-sm font-medium">مرتب‌سازی</label>
        <select id="sort-select" className="select select-bordered w-full" value={value} onChange={(event) => onChange(event.target.value)}>
          {items.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
      <div className="hidden items-center md:flex">
        <p className="mx-4 text-sm font-medium">مرتب‌سازی:</p>
        {items.map((item) => <button type="button" key={item.value} onClick={() => onChange(item.value)} className={`btn btn-xs btn-outline mx-1 hover:bg-yellow-400 hover:text-black ${value === item.value ? "bg-black text-white" : ""}`}>{item.label}</button>)}
      </div>
    </div>
  );
}
