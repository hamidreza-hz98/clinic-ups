import Link from "next/link";
import React from "react";

const ServiceCard = ({ image, title, description, link, reverse = false }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 shadow-xl border-yellow-400 rounded-md ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-md shadow-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-start md:text-left p-4">
        <h3 className="text-start text-xl font-bold mb-4 text-yellow-600">{title}</h3>
        <p className="text-start text-gray-700 mb-4">{description}</p>
        <Link
          href={link}
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm bg-yellow-400 text-gray-600 rounded-md hover:bg-yellow-500"
        >
          بیشتر بدانید
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
