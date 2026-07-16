"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "jalali-moment";
import { getProjectDetails } from "@/app/actions/project";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";
import Breadcrumb from "../Breadcrumb";
import Container from "../Container";
import FullscreenImage from "../FullscreenImage";
import Loading from "../Loading";
import Slider from "../Slider";

export default function ProjectDetailsWrapper({ slug }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenData, setFullscreenData] = useState({ open: false, slides: [], initialIndex: 0 });

  useEffect(() => {
    let active = true;
    getProjectDetails({ slug }).then((response) => { if (active) { setProject(response?.data || null); setLoading(false); } });
    return () => { active = false; };
  }, [slug]);

  if (loading || !project) return <Loading />;

  const fullscreenImages = (project.media || []).map((image) => setImagePath(image.path));
  const sliderOptions = {
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    navigation: true,
    pagination: false,
    slides: (project.media || []).map((image, index) => <img key={image._id || index} src={setImagePath(image.path)} alt={project.name} className="h-auto w-full cursor-pointer rounded-lg" onClick={() => setFullscreenData({ open: true, slides: fullscreenImages, initialIndex: index })} />),
  };

  return (
    <Container>
      <div className="grid grid-cols-12 md:gap-12">
        <div className="col-span-full"><Breadcrumb items={[{ label: "کلینیک یو پی اس", link: "/" }, { label: "پروژه‌ها", link: "/projects" }, { label: project.name }]} /></div>
        <div className="order-2 col-span-full mt-8 rounded-lg p-4 shadow-lg md:order-1 md:col-span-4">
          <h1 className="text-2xl font-bold text-yellow-500">{project.name}</h1>
          <p className="mt-4">{project.excerpt}</p>
          <div className="mt-4">
            <Detail label="مدت زمان تحویل" value={`${project.deliveryDate || "—"} روز`} />
            <Detail label="کارفرما" value={project.customer || "—"} />
            <Detail label="موقعیت" value={project.location || "—"} />
          </div>
          <div className="mt-8"><span className="text-sm font-semibold">تاریخ اجرا: </span><span className="text-sm">{project.date ? toPersianNumber(moment(project.date).locale("fa").format("jMMMM jYYYY")) : "—"}</span></div>
          <div className="mt-2"><span>دسته‌بندی: </span>{project.categories?.map((category, index) => <Link href={`/projects?category=${category._id}`} key={category._id} className="text-xs text-gray-600">{category.name}{project.categories.length !== index + 1 && " | "}</Link>)}</div>
        </div>
        <div className="order-1 col-span-full flex justify-end md:order-2 md:col-span-8"><Slider options={sliderOptions} /></div>
      </div>
      <div className="mt-8 rounded-lg p-8 shadow-lg"><h2 className="mb-2 text-xl font-semibold">جزئیات پروژه</h2><div className="content" dangerouslySetInnerHTML={{ __html: project.description || "" }} /></div>
      {fullscreenData.open && <FullscreenImage slides={fullscreenData.slides} initialSlide={fullscreenData.initialIndex} onClose={() => setFullscreenData({ open: false, slides: [], initialIndex: 0 })} />}
    </Container>
  );
}

function Detail({ label, value }) { return <div className="flex items-center justify-between border-b border-b-yellow-400 py-2"><span className="text-sm font-semibold">{label}:</span><span className="text-sm">{value}</span></div>; }
