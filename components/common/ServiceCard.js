"use client";

import { useLandingData } from "@/hooks/useLandingData";
import Link from "next/link";
import React from "react";

const ServiceCard = () => {
  const { services } = useLandingData();

  if (!services) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-8 gap-4 md:gap-8">
      <h2 className="text-primary text-xl col-span-full font-semibold">
        {" "}
        خدمات تشریفات رز{" "}
      </h2>

      {services.map((service, index) => (
        <Link
          href={`/services/${service.slug}`}
          key={index}
          className="flex flex-col items-center justify-center hover:shadow-md hover:scale-110 transition duration-700 p-4"
        >
          <div className="w-16 h-16 rounded-full">
            <img
              src={service.icon.path}
              alt={service.excerpt}
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>

          <h3 className="mt-2 text-sm md:text-md">{service.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ServiceCard;
