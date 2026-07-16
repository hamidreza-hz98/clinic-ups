"use client"

import {
  afterSaleBenefits,
  afterSaleContracts,
  engineeringServices,
} from "@/constants/landing/general";

import Breadcrumb from "../Breadcrumb";
import HeroBanner from "../HeroBanner";
import React from "react";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function AfterSalesServicesWrapper() {
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
      label: t("after_sale_banner_header"),
    },
  ];

  return (
    <div>
      <HeroBanner
        src="/images/static/24hour_atm.webp"
        heading={t("after_sale_banner_header")}
        subtext={t("after_sale_banner_sub_text")}
        textPlacement="center"
      />

      <div className="bg-black text-white">
        <Container>

      <Breadcrumb items={breadcrumbItems} />

        <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
          {t("after_sale_heading")}
        </h2>

        <p className="text-lg leading-relaxed">{t("after_sale_description")}</p>
        </Container>
      </div>

      <div className="bg-yellow-400 text-black">
        <Container>

        <h2 className="text-3xl font-semibold mb-6">
          {t("after_sale_contracts_heading")}
        </h2>

        <p className="text-lg leading-relaxed">
          {t("after_sale_contracts_description")}
        </p>

        <ul className="mt-4 list-disc list-inside text-gray-900 space-y-2">
          {afterSaleContracts.map((item, index) => (
            <li key={index}> {faText(item.description)} </li>
          ))}
        </ul>
        </Container>
      </div>

      <div className="bg-black text-white">
        <Container>

        <h2 className="text-3xl font-semibold mb-8 text-yellow-400">
          {t("after_sale_benefits")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
          {afterSaleBenefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 shadow-xl shadow-[rgba(255,200,0,0.35)] hover:shadow-2xl hover:shadow-[rgba(255,200,0,0.35)] transition-shadow duration-300 rounded-lg"
            >
              <div className="flex items-center justify-start">
                <item.icon size={40} className="text-yellow-300 mb-4 mx-4" />
                <h3 className="text-xl font-semibold mb-4">
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

        <h2 className="text-3xl font-semibold mb-6">
          {t("after_sale_engineering")}
        </h2>

        <p className="text-lg leading-relaxed">
          {t("after_sale_engineering_description")}
        </p>

        <ul className="mt-4 list-disc list-inside text-gray-900 space-y-2">
          {engineeringServices.map((item, index) => (
            <li key={index}> {faText(item.description)} </li>
          ))}
        </ul>
        </Container>
      </div>
    </div>
  );
}

export default AfterSalesServicesWrapper;
