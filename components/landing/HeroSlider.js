"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import Link from "next/link";
import React from "react";
import { faText } from "@/lib/landing/copy";

const HeroSlider = ({ slides = [] }) => {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[83vh]">
              <img
                src={slide.image}
                alt={faText(slide.title)}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg max-w-[90%]">
                  <h2 className="text-4xl font-bold text-yellow-400">
                    {faText(slide.title)}
                  </h2>
                  <p className="text-lg mt-2">{faText(slide.description)}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col items-center justify-center bg-yellow-400 text-center py-8 px-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          نیاز به مشاوره دارید؟
        </h2>
        <Link
          href="/contact"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          مشاوره رایگان
        </Link>

        <Link
          href="/generators-projects"
          className="px-6 py-3 mt-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          مشاهده آخرین پروژه‌های موتور برق و ژنراتور
        </Link>
      </div>
    </>
  );
};

export default HeroSlider;
