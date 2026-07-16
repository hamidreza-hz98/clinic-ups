"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "jalali-moment";
import { BiCategoryAlt } from "react-icons/bi";
import { CiClock2, CiEdit, CiHashtag, CiPen } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { getBlogDetails } from "@/app/actions/blog";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";
import Breadcrumb from "../Breadcrumb";
import Container from "../Container";
import HeroBanner from "../HeroBanner";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import Slider from "../Slider";

export default function BlogDetailsWrapper({ slug }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getBlogDetails({ slug }).then((response) => { if (active) { setBlog(response?.data || null); setLoading(false); } });
    return () => { active = false; };
  }, [slug]);

  if (loading || !blog) return <Loading />;

  const relatedSlides = (blog.relatedProducts || []).map((product) => <ProductCard key={product._id} product={product} />);

  return (
    <div>
      <HeroBanner src={setImagePath(blog.thumbnail?.[0]?.path)} heading={blog.title} subtext={blog.excerpt} textPlacement="center" showConsult={false} />
      <Container>
        <Breadcrumb items={[{ label: "کلینیک یو پی اس", link: "/" }, { label: "یو‌پی‌اس بلاگ", link: "/blog" }, { label: blog.title }]} />
        <article className="rounded-lg bg-white p-4 shadow-lg md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-5 border-b pb-5 text-sm text-gray-600">
            <Meta icon={CiClock2} label="زمان مطالعه" value={`${toPersianNumber(blog.readTime)} دقیقه`} />
            <Meta icon={CiPen} label="تاریخ انتشار" value={moment(blog.createdAt).locale("fa").format("jD jMMMM jYYYY")} />
            <Meta icon={FaRegEye} label="بازدید" value={toPersianNumber(blog.visits)} />
            {blog.author?.name ? <Meta icon={CiEdit} label="نویسنده" value={blog.author.name} /> : null}
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
          <div className="mt-8 space-y-3 border-t pt-5 text-sm">
            {blog.categories?.length ? <div className="flex items-center gap-2"><BiCategoryAlt /><span>دسته‌بندی:</span>{blog.categories.map((category) => <Link key={category._id} href={`/blog?category=${category._id}`} className="text-yellow-600">{category.name}</Link>)}</div> : null}
            {blog.tags?.length ? <div className="flex items-center gap-2"><CiHashtag /><span>برچسب‌ها:</span>{blog.tags.map((tag) => <span key={tag._id} className="text-gray-600">{tag.name}</span>)}</div> : null}
          </div>
        </article>
        {relatedSlides.length ? <section className="mt-12"><h2 className="text-xl font-bold">محصولات مرتبط</h2><Slider options={{ slides: relatedSlides, slidesPerView: 1, spaceBetween: 12, navigation: true, loop: relatedSlides.length > 1, autoplay: true, breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } }} /></section> : null}
      </Container>
    </div>
  );
}

function Meta({ icon: Icon, label, value }) { return <span className="flex items-center gap-2"><Icon /><strong>{label}:</strong>{value}</span>; }
