"use client";

import { FaShieldAlt, FaTelegram, FaWhatsapp, FaWrench } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import Breadcrumb from "../Breadcrumb";
import CatalogueThumbnail from "./components/CatalogueThumbnail";
import FullscreenImage from "../FullscreenImage";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Link from "next/link";
import Loading from "../Loading";
import Slider from "../Slider";
import Tabs from "../Tabs";
import TechnicalSpecifications from "../TechnicalSpecifications";
import { getProductDetails } from "@/app/actions/product";
import { setImagePath } from "@/lib/landing/general";
import Container from "../Container";

function ProductDetailsWrapper({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullscreenData, setFullscreenData] = useState({
    open: false,
    slides: [],
    initialIndex: 0,
  });

  const openFullscreen = (slides, index) => {
    setFullscreenData({ open: true, slides, initialIndex: index });
  };

  useEffect(() => {
    let active = true;
    getProductDetails({ slug }).then((response) => {
      if (active) {
        setProduct(response?.data || null);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [slug]);

  const catalogue = slug.includes("koop")
    ? {
        heading: "مشاهده کاتالوگ محصولات کوپ",
        downloadLink: "/images/products/generators/catalogue/koop.pdf",
        images: [
          "/images/products/generators/catalogue/koop01.webp",
          "/images/products/generators/catalogue/koop02.webp",
          "/images/products/generators/catalogue/koop03.webp",
          "/images/products/generators/catalogue/koop04.webp",
        ],
      }
    : slug.includes("loncin")
      ? {
        heading: "مشاهده کاتالوگ محصولات لانسین",
        downloadLink: "/images/products/generators/catalogue/loncin.pdf",
        images: [
          "/images/products/generators/catalogue/loncin01.webp",
          "/images/products/generators/catalogue/loncin02.webp",
          "/images/products/generators/catalogue/loncin03.webp",
          "/images/products/generators/catalogue/loncin04.webp",
        ],
      }
      : null;

  // Conditional rendering for product loading
  if (loading || !product) {
    return <Loading />;
  }

  const breadcrumbItems = [
    { label: "کلینیک یو پی اس", link: "/" },
    { label: "فروشگاه", link: "/categories" },
    { label: product?.name || "" },
  ];

  const productDetailsTabs = [
    {
      label: "مشخصات فنی",
      content: <TechnicalSpecifications specifications={product?.datasheet} />,
    },
    {
      label: "توضیحات",
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: product?.description || "",
          }}
        />
      ),
    },
  ];

  const productDetailsSliderOptions = {
    effect: "slide",
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    navigation: true,
    pagination: false,
    autoplay: true,
    thumbs: true,
    slides: product?.media?.map((image, index) => (
      <img
        key={index}
        src={setImagePath(image.path)}
        alt={image.path}
        className="w-full cursor-pointer h-auto rounded-lg"
        onClick={() =>
          openFullscreen(setFullscreenImages(product?.media), index)
        }
      />
    )),
  };

  const setFullscreenImages = (images) => {
    const final = [];

    images.map((image) => final.push(setImagePath(image.path)));

    return final;
  };

  return (
    <Container>
      <div className="w-full">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 mt-8 gap-8">
        <div className="col-span-3">
          <Slider options={productDetailsSliderOptions} />
        </div>

        <div className="col-span-4 mt-8">
          <h1 className="text-2xl font-bold">
            {product?.name || ""}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-8">
            <div className="flex flex-col text-gray-700 text-sm">
              <div className="flex">
                <FaShieldAlt className="mx-2" />
                <span>شش ماه گارانتی</span>
              </div>

              <div className="flex mt-2">
                <FaWrench className="mx-2" />
                <span>پنج سال خدمات پس از فروش</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p>روش‌های سفارش:</p>

            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-4">
              <a
                href="tel: +989122201160"
                className="flex items-center justify-center text-center border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white font-semibold py-2 px-4 rounded-md transition"
              >
                <IoPhonePortraitOutline size={20} className="mx-2" />
                تماس تلفنی
              </a>

              <a
                href="https://wa.me/+989122201160"
                target="_blank"
                className="flex items-center justify-center text-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold py-2 px-4 rounded-md transition"
              >
                <FaWhatsapp size={20} className="mx-2" />
                واتس‌اپ
              </a>

              <a
                href="https://t.me/+989122201160"
                target="_blank"
                className="flex items-center justify-center text-center border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 rounded-md transition"
              >
                <FaTelegram size={20} className="mx-2" />
                تلگرام
              </a>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4"></div>

          <div className="py-4">
            <span className="text-sm">دسته‌بندی: </span>

            {product?.category ? (
              <Link
                href={`/products?category=${product.category._id}`}
                className="text-xs text-gray-600"
              >
                {product.category.name}
              </Link>
            ) : null}
          </div>

          <div className="border-t border-gray-300"></div>

          {catalogue && (
            <CatalogueThumbnail
              heading={catalogue.heading}
              downloadLink={catalogue.downloadLink}
              images={catalogue.images}
            />
          )}
        </div>
      </div>

      <div className="w-full mt-8">
        <Tabs tabs={productDetailsTabs} />
      </div>

      {fullscreenData.open && (
        <FullscreenImage
          slides={fullscreenData.slides}
          initialSlide={fullscreenData.initialIndex}
          onClose={() =>
            setFullscreenData({ open: false, slides: [], initialIndex: 0 })
          }
        />
      )}
    </Container>
  );
}

export default ProductDetailsWrapper;
