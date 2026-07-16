"use client"

import {
  batteryBrandsSliderOptions,
  homepageSliderItems,
  upsBrandsSliderOptions,
} from "@/constants/landing/slider";
import { generatorProjects } from "@/constants/landing/projects";

import CardsSlider from "../CardsSlider";
import HeroBanner from "../HeroBanner";
import HeroSlider from "../HeroSlider";
import Link from "next/link";
import React from "react";
import Slider from "../Slider";
import { setSliderItems } from "@/lib/landing/slider";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function HomepageWrapper() {
  const t = text;
  

  const setProjectSliderOptions = (item) => {
    const options = {};

    options.slides = setSliderItems(item.images);

    return options;
  };

  const homepageProjects = generatorProjects.slice(0, 4);

  return (
    <div>
      <HeroSlider slides={homepageSliderItems} />

      <div className="bg-black text-white">
      <Container>

        <h1 className="font-bold text-xl">
          {t("homepage_cooperative_ups_brands_heading")}
        </h1>

        <p className="mt-2">
          {t("homepage_cooperative_ups_brands_description")}
        </p>

        <Slider options={upsBrandsSliderOptions} />
      </Container>
      </div>

      <div className="bg-yellow-400 text-black px-8 py-12">
      <Container>

        <h1 className="font-bold text-xl">
          {t("homepage_cooperative_battery_brands_heading")}
        </h1>

        <p className="mt-2">
          {t("homepage_cooperative_battery_brands_description")}
        </p>

        <Slider options={batteryBrandsSliderOptions} />
      </Container>
      </div>

      <div className="bg-black text-white px-8 py-12">
      <Container>

        <h1 className="font-bold text-xl">
          {t("homepage_some_delivered_projects_title")}
        </h1>

        <p className="mt-2">
          {t("homepage_some_delivered_projects_description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center justify-center overflow-hidden">
          {homepageProjects.map((project, index) => (
            <Link href={`/generators-projects`} className="p-8" key={index}>
              <p className="text-sm text-center">
                {faText(project.title)}
              </p>

              <CardsSlider options={setProjectSliderOptions(project)} />
            </Link>
          ))}
        </div>
      </Container>
      </div>

      <div className="bg-yellow-400 text-black px-8 py-12">
      <Container>

        <h1 className="font-bold text-xl">
          {t("homepage_cooperating_brands_heading")}
        </h1>

        <div className="w-100 mt-8 p-8 bg-black bg-opacity-10 backdrop-blur rounded-lg">
          <img
            className="w-full hidden md:block"
            alt={t("homepage_cooperating_brands_heading")}
            src="/images/brands/cooperating_brands.webp"
          />

          <img
            className="w-full block md:hidden"
            alt={t("homepage_cooperating_brands_heading")}
            src="/images/brands/cooperating_brands_mobile.webp"
          />
        </div>
      </Container>
      </div>
    </div>
  );
}

export default HomepageWrapper;
