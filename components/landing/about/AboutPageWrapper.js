"use client";

import HeroBanner from "../HeroBanner";
import React from "react";
import Tabs from "../Tabs";
import { cooperating_brands } from "@/constants/landing/brands";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function AboutPageWrapper() {
  const t = text;
  

  const tabsData = () => {
    const final = [];

    cooperating_brands.map((item, index) => {
      const tab = {};

      tab.label = (
        <div key={index} className="flex items-center">
          {/* Ensure item.icon is a valid component */}
          {item.icon && <item.icon className="mx-2" size={24} />}

          <span>{faText(item.category)}</span>
        </div>
      );

      tab.content = (
        <ul className="flex flex-wrap gap-2 list-disc pl-5">
          {item.companies.map((company, idx) => (
            <li className="mx-4" key={idx}>{faText(company)}</li>
          ))}
        </ul>
      );

      final.push(tab)
    });

    return final
  };

  return (
    <div>
      <HeroBanner
        src="/images/static/office_in_night.webp"
        heading={t("about_banner_header")}
        subtext={t("about_banner_sub_text")}
        textPlacement="center"
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl shadow-[rgba(255,200,0,0.35)]">
          <div className="p-8 order-2 md:order-1">
            <h1 className="text-2xl font-semibold"> {t("about_heading")} </h1>

            <p className="mt-6 text-justify"> {t("about_description")} </p>
          </div>

          <div className="order-1 md:order-2">
            <img
              className="rounded-xl"
              alt="logo"
              src="/images/logo-black.png"
            />
          </div>
        </div>
      </Container>

      <Container>
        <h1 className="text-2xl font-semibold">
          {t("about_cooperating_brands_heading")}
        </h1>

        <p className="mt-6 text-justify">
          {t("about_cooperating_brands_description")}
        </p>

        <div className="mt-8">
          <Tabs tabs={tabsData()} orientation="vertical" />
        </div>
      </Container>
    </div>
  );
}

export default AboutPageWrapper;
