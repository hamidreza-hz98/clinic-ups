"use client";

import { contactItems, socialMediaItems } from "@/constants/landing/general";

import HeroBanner from "../HeroBanner";
import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { faText, text } from "@/lib/landing/copy";
import Container from "../Container";
import { submitContact } from "@/app/actions/contact";

function ContactPageWrapper() {
  const t = text;
  const [form, setForm] = useState({ fullName: "", mobile: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await submitContact(form);
    setStatus({ error: Boolean(response?.status), message: response?.message });
    if (!response?.status) setForm({ fullName: "", mobile: "", message: "" });
    setLoading(false);
  };

  return (
    <div>
      <HeroBanner
        src="/images/static/lamp_in_blackout.webp"
        heading={t("contact_banner_header")}
        subtext={t("contact_banner_sub_text")}
        textPlacement="center"
        showConsult={false}
      />

      <Container>
        <div className="mt-8">
          <p> {t("contact_description")} </p>
        </div>

        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row">
            {/* Social Network Column */}
            <div className="flex-1 text-start p-4">
              <h3 className="text-lg font-bold mb-2">
                {" "}
                {t("contact_social_networks")}{" "}
              </h3>
              <div className="flex flex-col justify-end">
                {socialMediaItems?.map((social, index) => (
                  <a
                    className="mt-4"
                    href={social.address}
                    key={index}
                    target="_blank"
                  >
                    <SocialIcon
                      network={social.id}
                      style={{ width: 32, height: 32 }}
                      as="span"
                    />
                    <span> {faText(social.name)} </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Numbers and Emails Column */}
            <div className="flex-1 text-start p-4">
              <h3 className="text-lg font-bold mb-2">
                {t("contact_contact_info")}
              </h3>
              <div className="flex flex-col justify-center md:justify-end mt-2">
                {contactItems.map((item, index) => (
                  <a
                    className="flex mt-2 hover:text-yellow-400"
                    key={index}
                    href={item.address}
                    target="_blank"
                  >
                    <item.icon />

                    <span className="mx-2"> {faText(item.name)} </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Location Column */}
            <div className="flex-1 text-start p-4">
              <h3 className="text-lg font-bold mb-2">
                {t("contact_company_location")}
              </h3>
              <span> {t("contact_address")} </span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d340.4804773317585!2d51.35200330507165!3d35.7209441133774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1734849777861!5m2!1sde!2sde"
                title="Company Location"
                allowFullScreen=""
                className="mt-4 mx-auto w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <form onSubmit={submit} className="mx-auto mt-8 max-w-2xl rounded-lg border border-yellow-400 p-6 shadow-xl">
            <h2 className="mb-5 text-xl font-bold">ارسال پیام</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="نام و نام خانوادگی" className="rounded-lg border p-3 focus:border-yellow-400 focus:outline-none" />
              <input required value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} placeholder="شماره موبایل" className="rounded-lg border p-3 text-right focus:border-yellow-400 focus:outline-none" />
              <textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="پیام شما" rows={5} className="rounded-lg border p-3 focus:border-yellow-400 focus:outline-none sm:col-span-2" />
            </div>
            {status?.message ? <p className={`mt-4 ${status.error ? "text-red-600" : "text-green-600"}`}>{status.message}</p> : null}
            <button disabled={loading} className="mt-5 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50">{loading ? "در حال ارسال..." : "ارسال پیام"}</button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ContactPageWrapper;
