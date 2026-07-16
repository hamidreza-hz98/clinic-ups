"use client"

import { chooseReasons, services } from "@/constants/landing/general";

import Breadcrumb from "../Breadcrumb";
import HeroBanner from "../HeroBanner";
import Link from "next/link";
import React from "react";
import ServiceCard from "./components/ServiceCard";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";

function ServicesOverviewPageWrapper() {
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
  ];

  return (
    <div>
      <HeroBanner
        src="/images/static/airplane_blackout.webp"
        heading={t("services_banner_header")}
        subtext={t("services_banner_sub_text")}
        textPlacement="center"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} />
        
        <h2 className="text-xl font-semibold">{t("services_heading")}</h2>

        <p>{t("services_description")}</p>
      </Container>

      <Container className="space-y-12">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            image={service.image}
            title={faText(service.title)}
            description={faText(service.description)}
            link={service.link}
            reverse={index % 2 === 1 && true}
            />
        ))}
            </Container>

      <section className="bg-black text-white">
        <Container>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-yellow-400">
          { t("services_why_choose_us") }
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chooseReasons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 shadow-2xl shadow-[rgba(255,200,0,0.35)] rounded-lg"
            >
              <div className="text-yellow-500 text-4xl mb-4">
                <item.icon />
              </div>

              <h3 className="text-xl font-bold mb-2">{faText(item.title)}</h3>

              <p> {faText(item.description)} </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4">
            {t("contact_banner_header")}
          </h3>

          <p className="mb-8">{t("services_contact")}</p>

          <Link
            href="/contact"
            className="px-6 py-3 bg-yellow-400 text-gray-600 rounded-lg shadow-md hover:bg-yellow-500"
          >
            {t("contact_call")}
          </Link>
        </div>
        </Container>
      </section>
    </div>
  );
}

export default ServicesOverviewPageWrapper;
