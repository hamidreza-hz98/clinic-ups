"use client";

import React from "react";

const TechnicalSpecifications = ({ specifications }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <ul className="space-y-4">
        {specifications?.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2 text-gray-700"
          >
            <span className="font-medium text-gray-600">{item.key}:</span>
            <span className="text-gray-800">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnicalSpecifications;
