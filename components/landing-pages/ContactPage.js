"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { Breadcrumbs, LandingSection, PageHero } from "./LandingPageElements";

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", mobile: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const response = await submitContact(form);
    setResult({ error: Boolean(response?.status), message: response?.message || "پیام شما ثبت شد." });
    if (!response?.status) setForm({ fullName: "", mobile: "", message: "" });
    setLoading(false);
  };

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  return <><PageHero title="تماس با ما" description="برای مشاوره، برآورد پروژه یا درخواست خدمات فنی با ما در ارتباط باشید." image="/images/contact.webp" /><LandingSection><Breadcrumbs items={[{ label: "تماس با ما" }]} /><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"><h2 className="text-2xl font-black text-white">کلینیک یو پی اس</h2><p className="leading-8 text-slate-300">تیم فنی ما برای بررسی نیاز، انتخاب ظرفیت، نصب و پشتیبانی تجهیزات برق اضطراری در کنار شماست.</p><ContactInfo label="تلفن" value="۰۲۱-۸۸۸۸۸۸۸۸" /><ContactInfo label="ایمیل" value="info@clinicups.com" /><ContactInfo label="آدرس" value="تهران" /></div><form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"><h2 className="text-2xl font-black text-white">ارسال پیام</h2><input required value={form.fullName} onChange={update("fullName")} placeholder="نام و نام خانوادگی" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-300/60" /><input required value={form.mobile} onChange={update("mobile")} placeholder="شماره موبایل" inputMode="tel" dir="ltr" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-right text-white outline-none focus:border-cyan-300/60" /><textarea required value={form.message} onChange={update("message")} placeholder="متن پیام" rows={6} className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-300/60" />{result ? <p className={`rounded-xl px-4 py-3 text-sm ${result.error ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"}`}>{result.message}</p> : null}<button disabled={loading} className="rounded-xl bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50">{loading ? "در حال ارسال..." : "ارسال پیام"}</button></form></div></LandingSection></>;
}

function ContactInfo({ label, value }) { return <div className="rounded-xl border border-white/10 p-4"><span className="text-xs text-cyan-300">{label}</span><p className="mt-1 text-white">{value}</p></div>; }
