"use client";

import "swiper/css";
import "swiper/css/effect-cards";

import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCards } from "swiper/modules";

const CardsSlider = ({ options }) => {
  return (
    <>
      <Swiper
        className="cards-swiper mt-8"
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
      >
        {options.slides.map((slide, index) => (
          <SwiperSlide className="cards-swiper-slide" key={index}>
            <div className="w-100 h-100">{slide}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
        .cards-swiper {
  width: 240px;
  height: 320px;
}

.cards-swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
        `}
      </style>
    </>
  );
};

export default CardsSlider;
