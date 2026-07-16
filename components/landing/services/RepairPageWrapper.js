"use client";

import { repairBenefits, repairSteps } from "@/constants/landing/general";

import Breadcrumb from "../Breadcrumb";
import HeroBanner from "../HeroBanner";
import React from "react";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function RepairPageWrapper() {
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
      label: t("repair_banner_header"),
    },
  ];

  return (
    <div>
      <HeroBanner
        src="/images/static/repairing_electricity.webp"
        heading={t("repair_banner_header")}
        subtext={t("repair_banner_sub_text")}
        textPlacement="center"
      />

      <div className="bg-black text-white">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            {t("repair_heading")}
          </h2>

          <p className="text-lg">{t("repair_description")}</p>
          <br />
          <p className="text-lg">{t("repair_description_2")}</p>
          <br />
          <p className="text-lg">{t("repair_description_3")}</p>
          <br />
          <p className="text-lg">{t("repair_description_4")}</p>
        </Container>
      </div>

      <div className="bg-yellow-400 text-black">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">{t("repair_steps")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {repairSteps.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-yellow-100 p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg"
              >
                <div className="flex items-center justify-start">
                  <item.icon className="mx-2" size={40} />

                  <h3 className="text-xl font-semibold">{faText(item.name)}</h3>
                </div>

                <p className="mt-4">{faText(item.description)}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-black text-white">
        <Container>
          <h2 className="text-3xl font-extrabold text-center mb-8 text-yellow-400">
            {t("repair_benefits")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {repairBenefits.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 shadow-xl shadow-[rgba(255,200,0,0.35)] hover:shadow-2xl hover:shadow-[rgba(255,200,0,0.35)] rounded-lg"
              >
                <div className="text-yellow-500 text-4xl mb-4">
                  <item.icon size={40} />
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {faText(item.description)}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default RepairPageWrapper;
