"use client"

import React, { useState } from "react";

import Image from "next/image";
import Slider from "./Slider";

const FullscreenImage = ({ slides, initialSlide, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col justify-center items-center">
      <button
        className="absolute top-4 start-4 text-white hover:text-yellow-500"
        onClick={onClose}
      >
        <span className="text-2xl"> X </span>
      </button>

      <div className="w-full max-h-[95vh]">
        <Slider
          options={{
            slides: slides.map((img, index) => (
              <img
              key={index}
                src={img}
                alt="Slide"
                className="object-contain w-full max-h-[90vh]"
              />
            )),
            effect: "slide",
            spaceBetween: 10,
            slidesPerView: 1,
            loop: false,
            autoplay: false,
            navigation: true,
            pagination: false,
            thumbs: false,
            initialSlide,
          }}
        />
      </div>
    </div>
  );
};

export default FullscreenImage;
