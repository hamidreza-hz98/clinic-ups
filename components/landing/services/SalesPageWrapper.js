"use client"

import {
  providedProducts,
  salesBenefits,
  salesProcess,
} from "@/constants/landing/general";

import Breadcrumb from "../Breadcrumb";
import { FaCheckCircle } from "react-icons/fa";
import HeroBanner from "../HeroBanner";
import React from "react";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function SalesPageWrapper() {
  const t = text;
  

  const breadcrumbItems = [
    {
      label: t("clinic_ups_cowatt"),
      link: "/",
    },
    {
      label: t("services_banner_header"),
      link: "/services",
    },
    {
      label: t("sales_banner_header"),
    },
  ];

  return (
    <div>
      <HeroBanner
        src="/images/static/airplanes_in_night.webp"
        heading={t("sales_banner_header")}
        subtext={t("sales_banner_sub_text")}
        textPlacement="center"
      />

      <div className="bg-black text-white">
        <Container>
        <Breadcrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
          {t("sales_heading")}
        </h2>
        <p className="text-lg leading-relaxed">{t("sales_description")}</p>
        </Container>
      </div>

      <div className="bg-yellow-400 text-black">
        <Container>

        <h2 className="text-3xl font-semibold mb-8 text-black">
          {t("sales_available_products")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {providedProducts.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-black mb-4">
                {faText(item.name)}
              </h3>
              <p className="text-gray-700">{faText(item.description)}</p>
            </div>
          ))}
        </div>
        </Container>
      </div>

      <div className="bg-black text-white">
      <Container>

        <h2 className="text-3xl font-semibold mb-8 text-yellow-400">
          {t("sales_purchase_benefits")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {salesBenefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 shadow-xl shadow-[rgba(255,200,0,0.35)] hover:shadow-2xl hover:shadow-[rgba(255,200,0,0.35)] transition-shadow duration-300 rounded-lg"
            >
              <div className="flex items-center justify-start">
                <FaCheckCircle
                  className="text-yellow-300 mb-4 mx-4"
                  size={40}
                />
                <h3 className="text-xl font-semibold  mb-4">
                  {faText(item.name)}
                </h3>
              </div>

              <p className="">{faText(item.description)}</p>
            </div>
          ))}
        </div>
      </Container>
      </div>

      <div className="bg-yellow-400 text-black">
        <Container>

        <h2 className="text-3xl font-semibold mb-8 text-black">
          {t("sales_process")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {salesProcess.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-start">
                <item.icon className="text-yellow-400 mb-4 mx-2" size={40} />
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {faText(item.name)}
                </h3>
              </div>
              <p className="text-gray-700">{faText(item.description)}</p>
            </div>
          ))}
        </div>
        </Container>
      </div>
    </div>
  );
}

export default SalesPageWrapper;
