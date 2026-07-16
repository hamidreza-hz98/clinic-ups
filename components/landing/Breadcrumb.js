import Link from 'next/link';
import React from 'react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2">
      <div className="text-sm breadcrumbs">
        <ul className="flex space-x-2">
          {items.map((item, index) => (
            <li key={index}>
              {item.link ? (
                <Link href={item.link} className="text-gray-500 text-sm hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500 font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
